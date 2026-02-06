
# Verification & Testing Protocols

## 1. PWA & Offline Resilience
- **Tool**: Chrome DevTools > Application > Service Workers.
- **Procedure**:
    1. Load the application to trigger SW install.
    2. **Check Cache**: Verify `dashlib-ai-v3.3` exists and contains `index.html`, `cdn.tailwindcss.com`, and `material-design-icons` (PNGs).
    3. **Go Offline**: Toggle "Offline" mode in DevTools Network tab.
    4. **Reload**: 
       - Verify the App Shell loads immediately.
       - Verify the "Splash Screen" (if simulated by browser) uses the correct cached icon.
    5. **Inventory Check**: Ensure templates render from the cached JS bundle.
    6. **AI Failure State**: Verify that attempting to generate code results in a graceful "Network Disconnected" error, not a crash.

## 2. Sandbox Feature Testing (New)

### A. A/B Testing Workbench
1. **Model Selection**: 
   - Open the "Model Performance" template workbench.
   - Click the "Parallel Run" sandbox tab.
   - **Action**: Toggle "Claude 3.5" OFF.
   - **Action**: Click "Run Models".
   - **Verify**: Only GPT-4o and Llama 3 results appear in the results grid. Claude should be absent.
2. **Metric Calculation**:
   - **Verify**: Llama 3 should consistently show lower cost ($0.0002) than GPT-4o ($0.0042).
   - **Verify**: The "Analytics Matrix" bars reflect these values relative to the max scale.

### B. Security Policy Builder
1. **Rule Creation**:
   - Open "Security & Compliance" template workbench.
   - Enter: Metric="Failed Logins", Condition=">", Value="5".
   - Click "Commit Rule".
   - **Verify**: A new card appears in the "Active Governance Rules" list.
2. **Persistence**:
   - Refresh the page.
   - Return to the sandbox.
   - **Verify**: The "Failed Logins > 5" rule is still present (loaded from LocalStorage).
3. **Deletion**:
   - Click the Trash icon on the rule.
   - **Verify**: The rule disappears immediately.

## 3. Multimodal Feature Testing

### A. Vision-to-Code
1. **Input**: Drag and drop a PNG/JPG screenshot of a dashboard (< 4MB).
2. **Expected Behavior**: The "Vision" tab displays a preview. The prompt automatically references the image.
3. **Output**: The generated React code should reflect the *layout* (e.g., sidebar vs top nav) and *color scheme* of the input image.

### B. Live Voice Architect
1. **Permissions**: Click "Dictate". Browser should request Microphone permission.
2. **Streaming**: Speak a sentence. The "Prompt" textarea should update with real-time transcription within 500ms.
3. **Session Management**: Close the modal. The browser recording indicator (red dot) must turn off immediately.

## 4. AI Synthesis Benchmarking
- **Magic Generator**: Verify that generated code contains all required imports (`recharts`, `lucide-react`) and compiles without Tailwind JIT errors.
- **Constraint Check**: Ensure no forbidden libraries (e.g., Material UI, Styled Components) are hallucinated.
