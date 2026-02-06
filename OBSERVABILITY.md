
# Observability & Metrics Strategy

## 1. System Health & PWA Lifecycle
- **Service Worker Activation**: Monitor console for `[SW] Active` logs to verify successful registration.
- **Cache Integrity**: Use DevTools to ensure `dashlib-ai-v3.2` is serving static assets (Status 200 (from service worker)).
- **Cache Quota**: Monitor `navigator.storage.estimate()` to ensure the app stays within browser limits (typically < 50MB for this app).
- **Audio Context**: Track `AudioContext` state (`running` vs `closed`) to prevent memory leaks during voice sessions.

## 2. AI Performance Metrics

### A. Inference Latency
- **Time to First Token (TTFT)**: Tracked in `geminiService.ts` stream loop. Target: < 1.5s.
- **Total Generation Time**: Duration from request start to final code block closure. Target: < 15s.

### B. Live API Metrics
- **Connection Stability**: Monitor WebSocket `onclose` events that occur without user initiation (indicates network jitter).
- **Transcription Lag**: Perceived delay between user speech and text appearance.
- **PCM Buffer Health**: Ensure audio chunks are sent at 16kHz without underruns.

## 3. Alerting Observability
- **Triggered Alerts**: Displayed in the `AlertBanner`. 
- **Traceability**: Every alert includes a `templateId` deep-link.

## 4. Usage Analytics (Client-Side)
- **Feature Adoption**: Track clicks on "Vision Tab" vs "Text Prompt" (using local analytics counters).
- **Export Rate**: Percentage of generations that result in a "Copy to Clipboard" or "StackBlitz" action.
