
# PWA Implementation Details

## Installability
- **Manifest**: Located at `/manifest.json`.
- **Display Mode**: `standalone` for a native-app feel.
- **Start URL**: `./index.html`.
- **Icons**: Utilizes high-resolution Material Design dashboard icons.

## Caching Strategy (sw.js)
We employ a **Stale-While-Revalidate** strategy:
1. **Static Assets**: HTML, TSX, and Manifest are cached on install.
2. **External Dependencies**: Imports from `esm.sh` and Google Fonts are cached dynamically upon first fetch.
3. **Gemini API**: Explicitly excluded from caching to ensure fresh AI responses and security.

## Offline Behavior
- The template library remains browsable offline.
- AI features (Magic Generator, Advisor) require an active internet connection.
- Components previously generated are accessible if they were rendered during the session.

## Update Strategy
The Service Worker uses `skipWaiting()` and `clients.claim()` to ensure that updates are applied as soon as a new version of the app is detected.
