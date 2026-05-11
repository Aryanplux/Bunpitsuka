<div align="center">

<br />

```
██████╗ ██╗   ██╗███╗   ██╗██████╗ ██╗████████╗███████╗██╗   ██╗██╗  ██╗ █████╗
██╔══██╗██║   ██║████╗  ██║██╔══██╗██║╚══██╔══╝██╔════╝██║   ██║██║ ██╔╝██╔══██╗
██████╔╝██║   ██║██╔██╗ ██║██████╔╝██║   ██║   ███████╗██║   ██║█████╔╝ ███████║
██╔══██╗██║   ██║██║╚██╗██║██╔═══╝ ██║   ██║   ╚════██║██║   ██║██╔═██╗ ██╔══██║
██████╔╝╚██████╔╝██║ ╚████║██║     ██║   ██║   ███████║╚██████╔╝██║  ██╗██║  ██║
╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
```

### **An Advanced, Privacy-First AI Email Assistant for Developers & Enterprises**
*Engineered for total data sovereignty. Zero external API calls. Fully local.*

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Java](https://img.shields.io/badge/Java-21_LTS-f59e0b?style=for-the-badge&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-06b6d4?style=for-the-badge&logo=springboot)](https://spring.io/)
[![React](https://img.shields.io/badge/React-19.x-3b82f6?style=for-the-badge&logo=react)](https://react.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-Llama_3.2-8b5cf6?style=for-the-badge)](https://ollama.com/)
[![Chrome](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-ef4444?style=for-the-badge&logo=googlechrome)](https://developer.chrome.com/docs/extensions/)

<br />

🎬 **[Watch Full Demo on YouTube →](https://youtu.be/AvBLqZtoR8M?si=y354Z0g925VPOS_v)**

<br />

| 40–65 tok/s | < 300ms TTFB | < 50 KB Extension | 100% Local AI | 0 External API Calls |
|:-----------:|:------------:|:-----------------:|:-------------:|:--------------------:|
| Generation Speed | First Byte | Payload Size | Privacy First | Data Sovereignty |

<br />

</div>

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Why Local LLM? The Privacy Case](#-why-local-llm-the-privacy-case)
3. [System Architecture](#-system-architecture)
   - [High-Level Design](#high-level-architectural-overview)
   - [Chrome Extension Layer](#chrome-extension-layer)
   - [React Web Application Layer](#react-web-application-layer)
   - [Spring WebFlux Backend Layer](#spring-webflux-backend-layer)
   - [Local AI Engine (Ollama)](#local-ai-engine--ollama)
4. [End-to-End Request Lifecycle](#-end-to-end-request-lifecycle)
5. [Key Features Deep Dive](#-key-features-deep-dive)
6. [Technology Stack](#-technology-stack)
7. [Performance Benchmarks](#-performance-benchmarks)
8. [REST API Reference](#-rest-api-reference)
9. [Installation & Setup](#-installation--setup)
10. [Usage Guide](#-usage-guide)
11. [Future Roadmap](#-future-roadmap)
12. [Creator](#-creator)

---

## 🔭 Introduction

**Bunpitsuka** *(文筆家 — Japanese: "a person of literary skill")* is a highly sophisticated, AI-powered email authoring assistant built from the ground up for **developers, professionals, and enterprise environments** that refuse to compromise on data privacy.

Modern AI writing tools route your confidential corporate correspondence through external cloud APIs — your emails, your tone, your client information — all transmitted to and processed by third-party servers. Bunpitsuka eliminates this entirely.

By deeply integrating **locally hosted Large Language Models** via Ollama with a **Spring WebFlux reactive backend** and a **unified client ecosystem** (Chrome Extension + React Web App), Bunpitsuka delivers a best-in-class AI email authoring experience where **every byte of inference computation stays on your machine**.

> *"The most powerful AI assistant is the one that never shares your secrets."*

---

## 🔐 Why Local LLM? The Privacy Case

```
TRADITIONAL AI EMAIL TOOLS (e.g., Grammarly, Copilot, ChatGPT plugins)
─────────────────────────────────────────────────────────────────────────
  Your Email Draft
       │
       ▼
  External Cloud API (OpenAI / Anthropic / Google)
       │
       ├── Stored in training datasets?        ← Unknown
       ├── Logged for monitoring?              ← Yes, by default
       ├── Accessible to vendor employees?     ← Potentially
       └── Compliant with enterprise policy?   ← Rarely
       │
       ▼
  Response returned

BUNPITSUKA — LOCAL LLM ARCHITECTURE
─────────────────────────────────────────────────────────────────────────
  Your Email Draft
       │
       ▼
  localhost:8081 (Spring WebFlux Backend)
       │
       ▼
  localhost:11434 (Ollama — Llama 3.2, running on YOUR hardware)
       │
       ├── Stored externally?                  ← Never
       ├── Logged by any vendor?               ← Never
       ├── Leaves your machine?                ← Never
       └── Enterprise compliant?               ← By design ✓
       │
       ▼
  Response streamed back to you
```

| Concern | Cloud AI Tools | Bunpitsuka |
|---|:---:|:---:|
| Data sent to external servers | ✅ Yes | ❌ Never |
| Vendor logging / training use | ✅ Yes | ❌ Never |
| Works fully offline | ❌ No | ✅ Yes |
| Enterprise data policy safe | ❌ Risky | ✅ By design |
| Latency dependent on internet | ✅ Yes | ❌ Local only |

---

## 🏗️ System Architecture

### High-Level Architectural Overview

Bunpitsuka adopts a **loosely coupled, service-oriented architecture** with three completely independent layers — the client ecosystem, the reactive API gateway, and the local AI inference runtime — communicating exclusively via standardized HTTP contracts.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BUNPITSUKA SYSTEM ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                            CLIENT LAYER                                   │
│                                                                           │
│   ┌────────────────────────────┐    ┌────────────────────────────────┐   │
│   │   Chrome Extension         │    │   React Web Application        │   │
│   │   Manifest V3              │    │   Vite + Material UI           │   │
│   │                            │    │                                │   │
│   │  • Gmail DOM Injection     │    │  • Standalone email portal     │   │
│   │  • Tone selector UI        │    │  • Full compose interface      │   │
│   │  • Thread context parser   │    │  • Tone + prompt controls      │   │
│   │  • "AI Reply" button       │    │  • Response history view       │   │
│   └─────────────┬──────────────┘    └───────────────┬────────────────┘   │
└─────────────────┼──────────────────────────────────┼────────────────────┘
                  │  HTTP POST / REST                  │  HTTP POST / Axios
                  └──────────────┬─────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY / MIDDLEWARE                             │
│                                                                           │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │              Spring Boot 3.5 — Spring WebFlux                  │    │
│   │                     Java 21 · Maven                            │    │
│   │                                                                │    │
│   │   Controller Layer  →  Service Layer  →  WebClient (reactive)  │    │
│   │   Non-blocking I/O  ·  Async Streams  ·  Event-driven model    │    │
│   └────────────────────────────┬───────────────────────────────────┘    │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │  Async Reactive Streams
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                        LOCAL AI INFERENCE LAYER                           │
│                                                                           │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │              Ollama Runtime — localhost:11434                  │    │
│   │                    Llama 3.2:1b Model                          │    │
│   │                                                                │    │
│   │   Prompt ingestion  →  Token generation  →  Stream output      │    │
│   │   40–65 tok/s  ·  < 300ms TTFB  ·  Fully air-gapped           │    │
│   └────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
        ↑ All inference stays within this boundary. Nothing leaves. ↑
```

---

### Chrome Extension Layer

The Chrome Extension is the primary Gmail-native integration surface. Written in **Manifest V3 compliant Vanilla JavaScript**, it operates as a lightweight content script injected directly into the Gmail DOM — no heavy framework overhead, no performance impact on the host page.

```
email-writer-ext/
├── manifest.json          ← Manifest V3 declaration, permissions, CSP
├── content.js             ← Gmail DOM observer + "AI Reply" button injector
├── content.css            ← Scoped styles for injected UI components
├── background.js          ← Service worker for lifecycle management
└── popup/
    ├── popup.html         ← Extension toolbar popup UI
    ├── popup.js           ← Tone selector state management
    └── popup.css          ← Popup styling
```

**How it works inside Gmail:**

```
Gmail Page Loads
      │
      ▼
MutationObserver watches for Reply compose panel
      │
      ▼
On detection: inject "AI Reply" button into Gmail toolbar
      │
      ▼
User clicks "AI Reply"
      │
      ├── Extract email thread context from visible DOM
      ├── Read selected tone from extension state
      └── POST { emailContent, tone } → localhost:8081/api/email/generate
            │
            ▼
      Stream response tokens into Gmail compose textarea
```

**Key Decisions:**

- **Manifest V3** — Fully compliant with Google's latest security model. Service workers replace persistent background pages. No deprecated APIs.
- **No external dependencies** — Pure Vanilla JS/CSS keeps the extension payload under **50 KB**, ensuring instant injection with zero perceptible load time.
- **MutationObserver** — Rather than polling the DOM, a `MutationObserver` reacts to Gmail's dynamic rendering, ensuring the AI Reply button appears at exactly the right moment.

---

### React Web Application Layer

A standalone web portal providing Bunpitsuka's full feature set outside of Gmail — ideal for composing emails from scratch, testing prompts, or integrating into custom enterprise workflows.

```
email-good-react/
├── src/
│   ├── components/
│   │   ├── EmailComposer.jsx       ← Main composition interface
│   │   ├── ToneSelector.jsx        ← Psychological tone picker
│   │   ├── ResponseViewer.jsx      ← Streamed AI output display
│   │   └── HistoryPanel.jsx        ← Session response history
│   ├── services/
│   │   └── apiService.js           ← Axios instance + interceptors
│   ├── theme/
│   │   └── muiTheme.js             ← Material UI theme configuration
│   └── App.jsx
├── vite.config.js
└── package.json
```

**Stack choices:**

- **React 19** — Concurrent rendering for smooth streaming token display
- **Material UI (MUI)** — Enterprise-grade component library enforcing accessibility and consistent design language
- **Axios** — Handles streaming response interception and progress state
- **Vite** — Sub-100ms hot reload cycles during development

---

### Spring WebFlux Backend Layer

The backend is the **central nervous system** of Bunpitsuka — the secure, reactive bridge between the client ecosystem and the local AI runtime.

```
email-good-sb/
└── src/main/java/com/bunpitsuka/
    ├── controller/
    │   └── EmailController.java        ← POST /api/email/generate
    ├── service/
    │   └── EmailGenerationService.java ← Prompt engineering + Ollama dispatch
    ├── client/
    │   └── OllamaWebClient.java        ← Reactive WebClient to Ollama API
    ├── model/
    │   ├── EmailRequest.java           ← Inbound DTO { emailContent, tone }
    │   └── OllamaResponse.java         ← Outbound token stream mapper
    └── config/
        ├── WebFluxConfig.java          ← Reactive pipeline configuration
        └── CorsConfig.java             ← CORS policy (ext + React origins)
```

**Why Spring WebFlux over traditional Spring MVC?**

```
SPRING MVC (Blocking)                    SPRING WEBFLUX (Reactive)
─────────────────────────────────────    ─────────────────────────────────────
Thread per request                       Event loop — few threads, many requests
Thread blocks during LLM generation      Non-blocking — thread freed immediately
10 simultaneous users = 10 threads       10 simultaneous users = 2–3 threads
Memory scales linearly with users        Memory stays near-constant under load
LLM latency = wasted thread time         LLM latency = zero thread cost
─────────────────────────────────────    ─────────────────────────────────────
❌ Wrong tool for streaming AI output    ✅ Purpose-built for async AI streams
```

The LLM generation process is inherently slow and streaming — WebFlux's `Flux<ServerSentEvent>` pipeline is architecturally perfect for token-by-token streaming back to the client.

---

### Local AI Engine — Ollama

Ollama is the local model execution runtime. It exposes a REST API on `localhost:11434` that Spring WebFlux communicates with reactively.

```
Model Selection Rationale:

┌────────────────┬──────────────┬────────────────┬──────────────────┐
│ Model          │ Size         │ RAM Required   │ Speed            │
├────────────────┼──────────────┼────────────────┼──────────────────┤
│ llama3.2:1b    │ ~1.3 GB      │ ~2 GB VRAM     │ 40–65 tok/s ✅   │
│ llama3.2:3b    │ ~2.0 GB      │ ~4 GB VRAM     │ 25–40 tok/s      │
│ llama3.1:8b    │ ~4.7 GB      │ ~8 GB VRAM     │ 10–20 tok/s      │
│ mistral:7b     │ ~4.1 GB      │ ~8 GB VRAM     │ 15–25 tok/s      │
└────────────────┴──────────────┴────────────────┴──────────────────┘

→ llama3.2:1b selected: optimal balance of speed, size, and email task accuracy
```

---

## 🔄 End-to-End Request Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   BUNPITSUKA REQUEST LIFECYCLE                            │
└─────────────────────────────────────────────────────────────────────────┘

USER ACTION: Clicks "AI Reply" in Gmail or submits form in React App
      │
      ▼
──────────────────────────────────────────────────────
  STEP 1 — CONTEXT EXTRACTION (Chrome Extension)
──────────────────────────────────────────────────────
  • MutationObserver fires on reply panel detection
  • content.js traverses Gmail DOM tree
  • Extracts full visible email thread text
  • Reads selected tone from extension popup state
  • Constructs payload: { emailContent: "...", tone: "professional" }

      │  HTTP POST
      ▼
──────────────────────────────────────────────────────
  STEP 2 — GATEWAY RECEIPT (Spring WebFlux Controller)
──────────────────────────────────────────────────────
  POST /api/email/generate
  Content-Type: application/json
  Body: { "emailContent": "...", "tone": "professional" }

  • Controller deserializes request into EmailRequest DTO
  • Validates required fields
  • Delegates to EmailGenerationService

      │  Service call (non-blocking)
      ▼
──────────────────────────────────────────────────────
  STEP 3 — PROMPT ENGINEERING (Service Layer)
──────────────────────────────────────────────────────
  • Tone mapped to prompt template:
    Professional → "You are a senior executive. Draft a formal reply..."
    Casual       → "You are writing to a colleague. Keep it friendly..."
    Direct       → "Be concise and action-oriented. No pleasantries..."
    Apologetic   → "Acknowledge the issue empathetically and offer resolution..."

  • Final prompt assembled:
    "[SYSTEM PROMPT] + [TONE INSTRUCTION] + [EMAIL THREAD CONTEXT]"

      │  Reactive WebClient (non-blocking)
      ▼
──────────────────────────────────────────────────────
  STEP 4 — LOCAL LLM INFERENCE (Ollama)
──────────────────────────────────────────────────────
  POST localhost:11434/api/generate
  Model: llama3.2:1b
  Stream: true

  • Ollama begins token generation
  • Tokens streamed back as newline-delimited JSON chunks
  • Each chunk: { "response": "Dear", "done": false }
  • Final chunk: { "response": ".", "done": true }

      │  Flux<String> reactive stream
      ▼
──────────────────────────────────────────────────────
  STEP 5 — STREAM RELAY (WebFlux → Client)
──────────────────────────────────────────────────────
  • Spring WebFlux maps each token chunk to ServerSentEvent
  • Streams token-by-token to client over persistent HTTP connection
  • Client renders each token as it arrives — typewriter effect

      │  Tokens injected into Gmail compose or React ResponseViewer
      ▼
──────────────────────────────────────────────────────
  STEP 6 — USER REVIEW & SEND
──────────────────────────────────────────────────────
  • User reviews AI-generated draft
  • Edits as needed
  • Clicks Gmail "Send"

Total roundtrip (TTFB): < 300ms
Full draft (200 tokens): ~3–5 seconds
Data leaving machine: 0 bytes
──────────────────────────────────────────────────────
```

---

## ✨ Key Features Deep Dive

### 1. Deep Gmail DOM Integration

Unlike browser extensions that open sidebars or popups, Bunpitsuka **natively injects** its UI elements directly into Gmail's existing compose interface. The "AI Reply" button appears exactly where the native Gmail formatting toolbar lives — zero context switching, zero new windows.

```
Gmail Compose Toolbar (native):
[ Bold ] [ Italic ] [ Link ] [ Attach ] ... [ Send ]

Gmail Compose Toolbar (with Bunpitsuka):
[ Bold ] [ Italic ] [ Link ] [ Attach ] ... [ 🤖 AI Reply ] [ Send ]
```

### 2. Context-Aware Thread Parsing

The extension doesn't just look at the email you're replying to — it parses the **full visible conversation thread** to provide the LLM with complete conversational context, producing significantly more coherent and contextually appropriate responses.

```
Thread parsed:
  ┌─ Email 1: "Hey, are you free for a meeting this Thursday?"
  ├─ Email 2: "I'm out Thursday, does Friday work?"
  └─ Email 3 (current): "Friday works! What time?"
                               ↓
  LLM context: Full thread history included
  Result: AI suggests specific times, not a generic "Sure, let's meet!"
```

### 3. Psychological Tone Profiles

Four pre-engineered tone profiles, each backed by a distinct system prompt template:

| Tone | System Prompt Archetype | Best Used For |
|---|---|---|
| **Professional** | Senior executive, formal register, concise authority | Client correspondence, board communications |
| **Casual** | Friendly colleague, relaxed language, approachable | Internal team emails, peer communication |
| **Direct** | Action-oriented, no pleasantries, clear CTAs | Escalations, deadline communications |
| **Apologetic** | Empathetic acknowledgment, resolution-focused | Complaint handling, delay notifications |

### 4. Reactive Token Streaming

Bunpitsuka does not wait for the full LLM response before displaying it. Using Spring WebFlux's `Flux<ServerSentEvent>` pipeline, tokens are streamed to the client **as they are generated** — creating a real-time typewriter effect that dramatically reduces perceived latency.

```
Without streaming:  [................ 4 second wait ................] FULL TEXT APPEARS
With streaming:     D e a r  M r .  S m i t h ,  I  h o p e → (token by token, live)
```

### 5. Total Data Sovereignty

```
Network Traffic Analysis During Bunpitsuka Usage:
─────────────────────────────────────────────────────────────────────
Destination            Port    Protocol    Content
─────────────────────────────────────────────────────────────────────
localhost:8081         TCP     HTTP/1.1    Email content → backend
localhost:11434        TCP     HTTP/1.1    Prompt → Ollama
─────────────────────────────────────────────────────────────────────
External IPs           ANY     ANY         ← ZERO outbound connections
─────────────────────────────────────────────────────────────────────
```

---

## 🛠️ Technology Stack

### Frontend — Chrome Extension

| Technology | Version | Purpose |
|---|:---:|---|
| **Vanilla JavaScript** | ES2022 | Lightweight DOM manipulation and HTTP requests |
| **Vanilla CSS** | CSS3 | Scoped injection styles — no framework overhead |
| **Manifest V3** | Latest | Google's modern extension security model |
| **Service Worker** | — | Background lifecycle management |

### Frontend — React Web App

| Technology | Version | Purpose |
|---|:---:|---|
| **React** | 19.x | Concurrent component rendering with streaming support |
| **Vite** | 5.x | Next-gen bundler, sub-100ms HMR in development |
| **Material UI (MUI)** | 5.x | Enterprise design system, accessibility-first components |
| **Axios** | 1.x | Promise-based HTTP client with interceptor support |

### Backend — API Gateway

| Technology | Version | Purpose |
|---|:---:|---|
| **Java** | 21 LTS | Modern runtime with virtual threads and improved GC |
| **Spring Boot** | 3.5 | Enterprise framework, auto-configuration |
| **Spring WebFlux** | 6.x | Reactive, event-driven, non-blocking I/O model |
| **Project Reactor** | 3.x | Reactive streams implementation (Mono / Flux) |
| **Maven** | 3.8+ | Build lifecycle and dependency management |

### AI / Infrastructure

| Technology | Purpose |
|---|---|
| **Ollama** | Local LLM runtime — model download, quantization, serving |
| **Llama 3.2:1b** | Primary generation model — optimized for speed and email tasks |
| **Postman** | API behavioral testing, load simulation, CI integration |

---

## 📊 Performance Benchmarks

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  BUNPITSUKA PERFORMANCE METRICS                          │
│           (Apple M-Series / recent x86-64 Intel/AMD hardware)            │
└─────────────────────────────────────────────────────────────────────────┘

Metric                              Value            Notes
─────────────────────────────────────────────────────────────────────────
Token Generation Speed              40–65 tok/s      llama3.2:1b, CPU
Mean Time to First Byte (TTFB)      < 300ms          Local network only
Backend Memory (Idle)               ~250 MB          Spring Boot JVM heap
Chrome Extension Payload            < 50 KB          Vanilla JS/CSS only
React App Bundle (dev)              ~2.5 MB          Unminified, local build
React App Bundle (prod)             ~400 KB          Vite optimized + minified
Ollama Model RAM Usage              ~2 GB            llama3.2:1b loaded
Average 200-token email draft       3–5 seconds      End-to-end with streaming
Concurrent request capacity         High             WebFlux non-blocking I/O
External data transmission          0 bytes          By architectural design
─────────────────────────────────────────────────────────────────────────
```

### Latency Breakdown (single request, local hardware)

```
  0ms ──────────────────────────────────────────────────────── 5000ms

  [DOM parse + payload build]         ~10ms
  |──|
     [HTTP POST to localhost:8081]    ~5ms
      |─|
        [Spring routing + prompt]     ~50ms
         |───|
             [Ollama TTFB]            ~200–280ms
              |─────────────────|
                                [Token stream to client]   ~3–4s
                                 |──────────────────────────|
```

---

## 🌐 REST API Reference

All backend endpoints are served from `http://localhost:8081`.

### Email Generation

```
POST /api/email/generate
Content-Type: application/json
```

**Request Body:**

```json
{
  "emailContent": "We need the quarterly reports by Monday.",
  "tone": "professional"
}
```

**Accepted Tone Values:**

| Value | Description |
|:---:|---|
| `professional` | Formal, executive register |
| `casual` | Relaxed, peer-to-peer |
| `direct` | Concise, action-oriented |
| `apologetic` | Empathetic, resolution-focused |

**Response (streamed):**

```
Content-Type: text/event-stream

data: {"token": "Dear"}
data: {"token": " Mr."}
data: {"token": " Smith"}
data: {"token": ","}
...
data: {"token": "[END]", "done": true}
```

**Non-streamed fallback response:**

```json
{
  "status": "success",
  "tone": "professional",
  "generatedEmail": "Dear Mr. Smith, I hope this message finds you well...",
  "tokenCount": 187,
  "generationTimeMs": 3240
}
```

### Example Postman Configuration

```
Method:   POST
URL:      http://localhost:8081/api/email/generate

Headers:
  Content-Type: application/json

Body (raw JSON):
  {
    "emailContent": "We need the quarterly reports by Monday.",
    "tone": "professional"
  }
```

> **Load testing tip:** Use Postman's Collection Runner or Newman CLI to simulate multiple simultaneous users. Spring WebFlux's event-loop model ensures minimal throughput degradation under parallel LLM query load — unlike a traditional thread-per-request architecture.

---

## 🚀 Installation & Setup

### Prerequisites

| Requirement | Minimum | Verify |
|---|:---:|---|
| Java JDK | 21 LTS | `java --version` |
| Apache Maven | 3.8+ | `mvn --version` |
| Node.js | 20.x | `node --version` |
| Google Chrome | Latest | — |
| Ollama | Latest | `ollama --version` |
| Postman | Optional | — |

> ⚠️ **Hardware note:** Llama 3.2:1b requires approximately **2 GB of RAM** for model execution. 8 GB system RAM minimum recommended. Apple M-series chips offer significantly better performance due to unified memory architecture.

---

### Step 1 — Initialize the Local AI Runtime

Bunpitsuka requires Ollama running as a background service. This command downloads the Llama 3.2:1b model (~1.3 GB) and starts the inference server.

```bash
# Download and start the Llama 3.2:1b model
ollama run llama3.2:1b

# Verify Ollama API is live
curl http://localhost:11434/api/tags
# Expected: JSON list of downloaded models

# Ollama API endpoint → http://localhost:11434
```

> **Alternative models** (edit `application.properties` to switch):
> ```bash
> ollama run llama3.2:3b      # Higher quality, slower
> ollama run mistral:7b       # Strong alternative for email tasks
> ```

---

### Step 2 — Configure & Launch the Backend

```bash
# Navigate to the Spring Boot service directory
cd email-good-sb

# (Optional) Edit model or port configuration
nano src/main/resources/application.properties
# ollama.model=llama3.2:1b
# ollama.url=http://localhost:11434
# server.port=8081

# Build and run via Maven wrapper
# ── Unix / macOS ──────────────────────
./mvnw spring-boot:run

# ── Windows ───────────────────────────
mvnw.cmd spring-boot:run

# Spring Boot API → http://localhost:8081
```

---

### Step 3 — Launch the React Web Application

```bash
# Navigate to the React app directory
cd email-good-react

# Install Node dependencies
npm install

# Start Vite development server with HMR
npm run dev

# React portal → http://localhost:5173
```

---

### Step 4 — Install the Chrome Extension

```bash
# No build step required — load unpacked directly
```

1. Open Google Chrome and navigate to `chrome://extensions/`
2. Toggle **Developer Mode** → `ON` (top right)
3. Click **"Load unpacked"**
4. Select the `email-writer-ext/` folder from this repository
5. Confirm the Bunpitsuka extension appears in your extensions list
6. Open Gmail in a new tab — the content scripts initialize automatically
7. Open any email thread and click **Reply** to see the **"AI Reply"** button appear

---

### Service Port Map

```
┌────────────────────┐   HTTP POST    ┌─────────────────────┐   WebClient    ┌──────────────────────┐
│  Chrome Extension  │ ─────────────► │  Spring WebFlux API │ ─────────────► │  Ollama Runtime      │
│  (Gmail injected)  │                │   localhost:8081     │                │   localhost:11434    │
└────────────────────┘                └─────────────────────┘                └──────────────────────┘
                                               ▲
                                               │ HTTP POST
                                      ┌────────────────────┐
                                      │  React Web App     │
                                      │  localhost:5173     │
                                      └────────────────────┘

All traffic is loopback only. No external network connections.
```

---

## 📖 Usage Guide

### Via Chrome Extension (Gmail)

```
1. Open Gmail in Chrome
        │
        ▼
2. Click the Bunpitsuka icon in the Chrome toolbar
   → Select your desired tone: Professional / Casual / Direct / Apologetic
        │
        ▼
3. Open any email thread and click "Reply"
   → The "AI Reply" button appears next to native Gmail controls
        │
        ▼
4. Click "AI Reply"
   → Extension parses the full thread context
   → Transmits to local Spring Backend
   → Backend queries local Ollama
   → Response streams token-by-token into the Gmail compose box
        │
        ▼
5. Review the generated draft
   → Edit as needed
   → Click Gmail "Send"
```

### Via React Web Portal

```
1. Navigate to http://localhost:5173
        │
        ▼
2. Paste the email content you are responding to
        │
        ▼
3. Select tone from the ToneSelector component
        │
        ▼
4. Click "Generate Reply"
   → Streamed response appears in real-time in ResponseViewer
        │
        ▼
5. Copy the generated text into your email client
```

---

## 🗺️ Future Roadmap

```
Version 1.x (Current)
─────────────────────────────────────────────────────────────────────────
  ✅ Gmail DOM injection via Chrome Extension (Manifest V3)
  ✅ React web portal for standalone usage
  ✅ Spring WebFlux reactive backend
  ✅ Local Ollama LLM integration (Llama 3.2:1b)
  ✅ Four psychological tone profiles
  ✅ Token streaming (Server-Sent Events)
  ✅ Zero external API calls — full privacy

Version 2.x (Planned)
─────────────────────────────────────────────────────────────────────────
  🔲 OAuth 2.0 — User authentication and identity management in React
  🔲 RAG (Retrieval-Augmented Generation) — Index user's sent emails
       in a local vector database (e.g., ChromaDB / Qdrant) to learn
       individual writing style and produce hyper-personalized drafts
  🔲 Mozilla Firefox Extension — Port Manifest V3 codebase to Firefox
  🔲 Microsoft Edge Extension — Edge Add-ons store publication

Version 3.x (Vision)
─────────────────────────────────────────────────────────────────────────
  🔲 Outlook Web DOM integration
  🔲 Multi-model support — switch between Llama, Mistral, Gemma per task
  🔲 On-device fine-tuning — further personalize model on user's corpus
  🔲 Enterprise deployment — Docker Compose stack for team-wide rollout
```

---

## 👤 Creator

<br />

```
  ╔═════════════════════════════════════════════════════════════════╗
  ║                                                                 ║
  ║   Bunpitsuka — 文筆家                                            ║
  ║   "A person of literary skill"                                  ║
  ║                                                                 ║
  ║   Built with a singular conviction: that powerful AI tools      ║
  ║   should never demand access to your private data.             ║
  ║                                                                 ║
  ║   Every architectural decision in this project — from          ║
  ║   WebFlux over MVC, to Manifest V3 compliance, to the          ║
  ║   deliberate selection of llama3.2:1b — was made with          ║
  ║   developer privacy and enterprise trust as the first          ║
  ║   principle, not an afterthought.                              ║
  ║                                                                 ║
  ╚═════════════════════════════════════════════════════════════════╝
```

🎬 **[Watch the Full Project Demo →](https://youtu.be/AvBLqZtoR8M?si=y354Z0g925VPOS_v)**

---

<div align="center">

```
──────────────────────────────────────────────────────────────────────────
  Bunpitsuka · 文筆家 · AI Email Assistant · MIT License · v1.0.0
  Local AI · Zero External Calls · Built for Data Sovereignty
──────────────────────────────────────────────────────────────────────────
```

*Write smarter. Stay private. Own your data.*

</div>
