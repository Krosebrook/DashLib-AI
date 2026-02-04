# System Architecture

## 1. Data Layer (`data.ts`)
The "Source of Truth" for the library. It acts as a registry that the AI models ingest to understand the scope and capabilities of each dashboard.

## 2. AI Service Layer (`geminiService.ts`)
This layer handles all communication with the @google/genai SDK.

### Code Generation Pipeline:
1. **Context Extraction**: The service pulls the `Template` object.
2. **Prompt Injection**: Metadata is injected into a "Base Architectural Prompt" that contains rules for Tailwind, Recharts, and Accessibility.
3. **Streaming Response**: The UI utilizes `generateContentStream` to provide real-time visual feedback as the model constructs the component.

## 3. UI Layer (React Components)
- **Layout**: Persistent header and footer.
- **Modals**: Handle heavy state (Code generation, Sandboxes).
- **Sandboxes**: Encapsulated interactive demos that mimic the logic the AI will generate in the final code.

## 4. State Management
The app uses local React `useState` and `useMemo` for performance.
- `useMemo` is critical for filtering the 50+ templates during search.
- `useEffect` manages the scroll-to-bottom logic for streaming text in the Magic Generator.
