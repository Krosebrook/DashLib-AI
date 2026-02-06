
# Verification & Testing Protocols

## 1. PWA & Offline Resilience
- **Tool**: Chrome DevTools > Application > Service Workers.
- **Procedure**:
    1. Load the application to trigger SW install.
    2. **Check Cache**: Verify `dashlib-ai-v3.2` exists and contains `index.html`, `cdn.tailwindcss.com`, and `material-design-icons` (PNGs).
    3. **Go Offline**: Toggle "Offline" mode in DevTools Network tab.
    4. **Reload**: 
       - Verify the App Shell loads immediately.
       - Verify the "Splash Screen" (if simulated by browser) uses the correct cached icon.
    5. **Inventory Check**: Ensure templates render from the cached JS bundle.
    6. **AI Failure State**: Verify that attempting to generate code results in a graceful "Network Disconnected" error, not a crash.

## 2. Multimodal Feature Testing

### A. Vision-to-Code
1. **Input**: Drag and drop a PNG/JPG screenshot of a dashboard (< 4MB).
2. **Expected Behavior**: The "Vision" tab displays a preview. The prompt automatically references the image.
3. **Output**: The generated React code should reflect the *layout* (e.g., sidebar vs top nav) and *color scheme* of the input image.

### B. Live Voice Architect
1. **Permissions**: Click "Dictate". Browser should request Microphone permission.
2. **Streaming**: Speak a sentence. The "Prompt" textarea should update with real-time transcription within 500ms.
3. **Session Management**: Close the modal. The browser recording indicator (red dot) must turn off immediately.

### C. Context Injection
1. **Input**: Paste a raw SQL schema (`CREATE TABLE users...`).
2. **Generation**: Ask to "Generate a user table".
3. **Verification**: The resulting React table columns must match the SQL fields exactly (e.g., `user_id`, `created_at`).

## 3. Sandbox Functional Testing
1. **Security Rule Builder**: Ensure rules can be toggled, deleted, and that state persists correctly.
2. **A/B Workbench**: Verify parallel model result rendering and metric normalization.

## 4. AI Synthesis Benchmarking
- **Magic Generator**: Verify that generated code contains all required imports (`recharts`, `lucide-react`) and compiles without Tailwind JIT errors.
- **Constraint Check**: Ensure no forbidden libraries (e.g., Material UI, Styled Components) are hallucinated.
