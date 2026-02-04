# Contributing to DashLib AI

We welcome contributions! To maintain the high quality of the library, please follow these standards.

## 🛠 Adding a New Template

1. **Define the Metadata**: Add an entry to `src/data.ts`.
2. **Metadata Requirements**:
   - `id`: Unique kebab-case string.
   - `category`: Must use a value from `DashboardCategory`.
   - `purpose`: One sentence explaining the "Why".
   - `metrics`: Array of at least 4 specific business KPIs.
   - `notes`: Instructions for the AI code generator (e.g., "Must include a dark mode toggle").

## 🎨 Design Standards

- **Color Palette**: Stick to the `Slate` and `Indigo` Tailwind scales for consistency.
- **Icons**: Use `Lucide-React`.
- **Charts**: Use `Recharts`. Avoid adding external dependencies.

## 🧪 Interactive Sandboxes

If a template has a unique interactive logic (like a custom rule builder), set `hasInteractiveSandbox: true` and create a dedicated component in `src/components/`. 

- **Template**: Use `SecuritySandbox.tsx` or `ModelSandbox.tsx` as a blueprint.
- **Integration**: Register the sandbox in `TemplateModal.tsx`'s `renderSandbox` method.

## 📝 Pull Request Checklist

- [ ] Metadata added to `data.ts`.
- [ ] TypeScript interfaces updated in `types.ts` if necessary.
- [ ] JSDoc comments added to new components.
- [ ] Responsive design verified.
