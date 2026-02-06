
# 🤝 Engineering & Contribution Guidelines

Welcome to the DashLib AI engineering team. We adhere to strict quality standards to ensure the library remains production-grade.

## 1. Development Lifecycle

### Prerequisites
- Node.js v18+
- A valid Google Gemini API Key
- VS Code (recommended) with ESLint & Prettier extensions.

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-org/dashlib-ai.git

# Install dependencies
npm install

# Set up Environment
export API_KEY="your_gemini_key"

# Start Development Server
npx serve .
```

## 2. Code Standards

### TypeScript
- **Strict Mode**: Enabled. No `any` types allowed unless explicitly justified in comments.
- **Interfaces**: Prefer `interface` over `type` for object definitions.
- **Naming**: PascalCase for Components, camelCase for functions/hooks.

### React / JSX
- **Functional Components**: Use `React.FC` typing.
- **Hooks**: Custom hooks must live in `src/hooks/` and start with `use`.
- **Accessibility**: All interactive elements must have `aria-label` or visible labels. `<img>` tags must have `alt` text.

### CSS / Tailwind
- **Ordering**: Use a consistent class ordering (Layout -> Box Model -> Typography -> Visuals).
- **Tokens**: Use semantic color names (`indigo-600`) over arbitrary values.

## 3. Pull Request Protocol

1. **Branching**: Use feature branches (`feature/my-new-template`) off `main`.
2. **Commit Messages**: Follow Conventional Commits.
   - `feat: add new saas template`
   - `fix: resolve mobile layout overflow`
   - `docs: update architecture diagram`
3. **PR Description**: Must include:
   - "Why" (Business Value)
   - "How" (Technical Implementation)
   - Screenshots / GIFs of the change.
4. **Review**: Requires 1 approval from a Senior Maintainer.

## 4. Architectural Governance

- **No New Dependencies**: Do not add npm packages without an ADR (Architectural Decision Record). We aim to keep the bundle size minimal.
- **AI Consistency**: If modifying `geminiService.ts`, you must verify that prompts are deterministic enough for stable output.
- **Mobile First**: All UI components must be responsive down to 320px width.

## 5. Adding Templates

To add a new dashboard template:
1. Add metadata to `src/data.ts` adhering to the `Template` interface.
2. If it requires custom logic, build a Sandbox component in `src/components/`.
3. Register the sandbox in `TemplateModal.tsx`.
4. Run the **Magic Generator** with your template description to verify the AI understands the context.

---
**Happy Coding.**
