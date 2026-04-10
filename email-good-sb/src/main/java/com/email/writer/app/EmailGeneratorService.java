package com.email.writer.app;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String GeminiApiUrl;

    @Value("${gemini.api.key}")
    private String GeminiApiKey;

    @Value("${ollama.api.url}")
    private String ollamaApiUrl;

    @Value("${ollama.model}")
    private String ollamaModel;

    @Value("${ai.provider:ollama}")
    private String aiProvider;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }


    public String generateEmailReply(EmailRequest emailRequest) {
        // Build the prompt for the LLM based on the emailRequest
        String prompt = buildPrompt(emailRequest);

        if ("gemini".equalsIgnoreCase(aiProvider)) {
            return callGeminiApi(prompt);
        } else {
            return callOllamaApi(prompt);
        }
    }

    private String callOllamaApi(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "model", ollamaModel,
            "prompt", prompt,
            "stream", false
        );

        try {
            String response = webClient.post()
                .uri(ollamaApiUrl)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

            return extractOllamaResponse(response);
        } catch (WebClientResponseException ex) {
            return "Ollama API error (" + ex.getRawStatusCode() + "): " + ex.getResponseBodyAsString();
        } catch (Exception ex) {
            return "Failed to call Ollama API. Make sure Ollama is running locally: " + ex.getMessage();
        }
    }

    private String extractOllamaResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("response").asText();
        } catch (Exception e) {
            return "Error processing Ollama response: " + e.getMessage();
        }
    }

    private String callGeminiApi(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "contents", new Object[]{
                Map.of("parts", new Object[]{
                    Map.of("text", prompt)
                })
            }
        );

        String geminiUrl = UriComponentsBuilder
            .fromHttpUrl(GeminiApiUrl)
            .queryParam("key", GeminiApiKey)
            .toUriString();

        try {
            String response = webClient.post()
                .uri(geminiUrl)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

            return extractResponseContent(response);
        } catch (WebClientResponseException ex) {
            return "Gemini API error (" + ex.getRawStatusCode() + "): " + ex.getResponseBodyAsString();
        } catch (Exception ex) {
            return "Failed to call Gemini API: " + ex.getMessage();
        }
    }
    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

        } catch(Exception e) {

            // Handle parsing exceptions
            
            return "Error processing response: " + e.getMessage();
        }
    }


    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate an professional email with the following details. Please don't generate the subject line\n");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a: ").append(emailRequest.getTone()).append("Tone\n");
        }
        prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
