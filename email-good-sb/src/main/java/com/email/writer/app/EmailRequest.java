package com.email.writer.app;

import lombok.Data;

@Data  
public class EmailRequest {
    private String emailContent;
    private String tone;
    public String getSubject() {
        return emailContent;
    }

    public void setSubject(String subject) {
        this.emailContent = subject;
    }

    public String getBody() {
        return emailContent;
    }

    public void setBody(String body) {
        this.emailContent = body;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}
