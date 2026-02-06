
# 🛡️ Security Policy & Threat Model

DashLib AI is designed with a "Zero-Trust" and "Privacy-First" architecture. This document outlines our security posture.

## 1. Threat Model

### A. API Key Exposure
- **Risk**: API Keys stored in client-side code can be scraped.
- **Mitigation**: 
  - Keys are injected via `process.env`.
  - In production, keys must be restricted to specific **HTTP Referrers** (domain locking) via the Google Cloud Console.
  - Rate limiting is enforced by the upstream provider (Google).

### B. Prompt Injection / Jailbreaking
- **Risk**: Users attempting to force the AI to generate malicious code or reveal system instructions.
- **Mitigation**: 
  - Strict system prompt encapsulation.
  - Output sanitization (stripping Markdown, validating structure).
  - Client-side execution sandbox (generated code runs in the browser context, isolated from a backend).

### C. Cross-Site Scripting (XSS)
- **Risk**: AI generating code with `dangerouslySetInnerHTML`.
- **Mitigation**: 
  - The Magic Generator output is text-only. 
  - We do not automatically render the generated code into the DOM. Users must manually copy or export to StackBlitz, placing the burden of review on the developer.

## 2. Data Privacy & Compliance

### GDPR / CCPA
- **Data Residency**: DashLib AI has **no backend database**. All user preferences (Favorites, Brand Config) are stored in `localStorage` on the user's device.
- **AI Processing**: Prompts are sent to Google Gemini APIs. Google states that API data is not used to train their models (check current Google Cloud Terms for enterprise specifics).

### SOC2 Readiness
- **Audit Logs**: DashLib generates code but does not execute business transactions. It fits into a SOC2 compliant workflow by generating *auditable* code, but the tool itself is a development utility.

## 3. Reporting Vulnerabilities

If you discover a security vulnerability within DashLib AI, please create a GitHub Issue with the label `security` or email the maintainers directly.

**Do not publicly disclose exploits until a patch has been released.**
