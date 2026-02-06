
# Verification & Testing Protocols (v3.6)

## 1. Zero-Install PMA Validation
- **Step 1**: Open any template (e.g., "MRR Growth").
- **Step 2**: Generate Code.
- **Step 3**: Click **"Download Portable App"**.
- **Step 4**: Open the resulting `.html` file in a clean browser profile.
- **Verify**: Component renders correctly with charts and icons.
- **Verify**: No console errors related to missing dependencies.

## 2. PWA Offline Deep-Linking
- **Step 1**: Ensure Service Worker `v3.6` is active.
- **Step 2**: Navigate to `/?template=security-compliance`.
- **Step 3**: Toggle "Offline" in Chrome DevTools.
- **Step 4**: Refresh the page.
- **Verify**: The App Shell and specific template workbench load instantly via navigation fallback.

## 3. Governance Sandbox Verification
- **Step 1**: Add a rule for "Failed Login Attempts" > 5.
- **Verify**: The rule appears in "Active Policy Inventory".
- **Step 2**: Toggle rule off/on. Verify UI state updates.
- **Step 3**: Refresh page. Verify rule persistence in `localStorage`.

## 4. A/B Testing Verification
- **Step 1**: Select "GPT-4o" and "Gemini 3 Pro".
- **Step 2**: Run Parallel Test.
- **Verify**: Results appear side-by-side with distinct Latency/Cost metrics.
- **Verify**: Comparative bar chart renders in the visualization matrix.

---
© 2025 DashLib AI QA Hub.
