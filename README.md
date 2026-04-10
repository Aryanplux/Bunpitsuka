# Bunpitsuka

Bunpitsuka is an AI-powered email assistant designed to help developers and professionals write and respond to emails efficiently. By integrating locally-hosted Large Language Models (LLMs) with a robust Spring Boot backend and a Google Chrome Extension, Bunpitsuka ensures privacy, fast response times, and customizable correspondence tones.

## Repository Structure

The project is divided into two primary services:

1. **Spring Boot Backend (`email-good-sb/`)**: 
   A robust REST API built in Java 21 using Spring WebFlux. It manages the communication layer between the front-end extension and the locally hosted Ollama AI instance.

2. **Chrome Extension (`email-writer-ext/`)**:
   A streamlined, modern web extension that injects an "AI Reply" capability directly into the Gmail compose interface. It supports dynamic tone settings to generate context-aware replies.

## Prerequisites

To run this application locally, you will need:
- **Java 21** or later
- **Maven**
- **Ollama** installed on your operating system

## Getting Started

### 1. Start the Local AI
Ensure that Ollama is installed and the base model is running on your system. By default, the backend is configured to use the `llama3.2:1b` model for optimal performance.

Run the following command in your terminal:
```bash
ollama run llama3.2:1b
```

### 2. Run the Backend Server
Navigate into the backend directory and run the Spring Boot application using the Maven wrapper.

```bash
cd email-good-sb
./mvnw spring-boot:run
```

The server will automatically start on `http://localhost:8081`.

### 3. Load the Chrome Extension
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Ensure **Developer Mode** is enabled (top right toggle).
3. Click **Load unpacked**.
4. Select the `email-writer-ext` folder from this repository.
5. The extension will now be active in your toolbar and Gmail interface.

## Usage

1. Click on the Bunpitsuka Chrome Extension icon in your browser toolbar to select your preferred email tone (e.g., Professional, Casual, Direct).
2. Open any email within Gmail and click "Reply".
3. A custom "AI Reply" button will appear alongside the standard Gmail compose formatting bar.
4. Click "AI Reply", and the extension will parse the contents of the thread, communicate with your local backend, and instantly inject a drafted response into the text box.

## Architecture Highlights
- Fully Local Execution: Because the extension communicates with Ollama, no private data is sent to external or paid corporate NLP APIs.
- Modular Design: The Spring API interface abstracts model logic, enabling seamless horizontal scale to newer LLM infrastructures if needed.
