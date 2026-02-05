
# Security Guidelines

## API Key Safety
- The `process.env.API_KEY` is injected at build/runtime. 
- **Never** hardcode this key in public repositories.
- For production, ensure your Gemini API key is restricted to specific referrers or IP ranges via the Google Cloud Console.

## Content Security Policy (CSP)
If implementing a CSP, ensure the following domains are whitelisted:
- `connect-src`: `https://generativelanguage.googleapis.com`, `https://esm.sh`
- `script-src`: `https://cdn.tailwindcss.com`, `https://esm.sh`
- `style-src`: `https://fonts.googleapis.com`, `https://cdn.tailwindcss.com`
- `font-src`: `https://fonts.gstatic.com`

## Data Privacy
- DashLib AI does not store user prompts on its own backend. 
- Data is sent directly to Google's Gemini API endpoints. 
- Sensitive information in prompts should be anonymized by the user.
