
# Testing Strategy

## PWA Validation
Run Lighthouse in Chrome DevTools:
- Check "PWA" category.
- Verify manifest is detected.
- Verify Service Worker registers and caches.

## Manual Smoke Tests
1. **Offline Mode**: Toggle "Offline" in DevTools Network tab. The template list should still render.
2. **Installability**: Verify the "Install" prompt appears in the URL bar.
3. **Gemini Integration**: Trigger "Magic Generator" and ensure streaming works under a valid `API_KEY`.

## QualityScore Formula
Our CI process calculates a `QualityScore` (0-100):
`QualityScore = (LighthousePWA * 0.4) + (OfflineReliability * 0.3) + (A11yScore * 0.2) + (PerfScore * 0.1)`
Target Score: **> 90**.
