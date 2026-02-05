
# Observability & Monitoring

## Error Reporting
- **Gemini API**: Failures are logged to the console with specific error categories (4xx/5xx).
- **Service Worker**: Cache failures and fetch errors are logged in the SW console.

## Release Tracking
- Every Service Worker version update increments `CACHE_NAME`.
- The footer displays the library version and runtime environment.

## Suggested Third-Party Tools
- **Sentry**: For tracking runtime React errors.
- **LogRocket**: For session replay to understand how users interact with the Magic Generator prompts.
- **Google Search Console**: To monitor PWA indexing and performance.
