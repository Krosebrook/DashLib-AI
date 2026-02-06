
# Observability & Metrics Strategy (v3.6)

## 1. Export Observability
- **PMA Download Volume**: Tracking frequency of standalone HTML exports.
- **StackBlitz Conversion**: Monitoring developer transition from preview to IDE.
- **Code Generation Success Rate**: Ratio of valid vs malformed React component outputs from the Gemini 3 engine.

## 2. PWA & Caching Health
- **Cache Hit Ratio (v3.6)**: Percentage of asset requests served from `CACHE_NAME`.
- **Installation Rate**: Users opting to "Install App" to desktop/mobile.
- **SW Lifecycle Events**: Monitoring frequency of `install`/`activate` errors in production environments.

## 3. Governance Rule Analytics
- **Rule Cardinality**: Average number of custom policies per user session.
- **Alert Trigger Frequency**: Monitoring simulated alert violations to optimize threshold UX.

## 4. Model Benchmarking Performance
- **Inference Latency**: p95 timing for A/B testing runs.
- **Drift Detection**: Rate of "Performance Drift" alerts triggered during model comparisons.

---
© 2025 DashLib AI Observability Hub.
