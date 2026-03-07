
import sdk from '@stackblitz/sdk';

/**
 * Generates a complete, standalone HTML string for a portable micro-app.
 * This file is "Zero-Install" - it runs in any browser with no local setup.
 * Uses Babel Standalone to compile JSX/TSX at runtime.
 */
export const generateStandaloneHTML = (title: string, code: string): string => {
  // 1. Identify the component name or force it to Dashboard
  // We look for 'export default function Name' or 'export default Name'
  let processedCode = code;
  let componentName = 'Dashboard';

  const functionMatch = code.match(/export default function (\w+)/);
  const constMatch = code.match(/export default (\w+)/);

  if (functionMatch) {
    componentName = functionMatch[1];
    processedCode = processedCode.replace(/export default function \w+/, `function ${componentName}`);
  } else if (constMatch) {
    componentName = constMatch[1];
    processedCode = processedCode.replace(/export default \w+;?/, '');
  } else {
    // Fallback: try to find any function that looks like a component if no export default
    processedCode = processedCode.replace(/export default function/, 'function Dashboard');
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - DashLib Portable App</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Babel Standalone for Runtime JSX/TSX Compilation -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        body { 
          font-family: 'Inter', sans-serif; 
          background-color: #f8fafc; 
          margin: 0; 
          padding: 0; 
          overflow-x: hidden;
        }
        #root { min-height: 100vh; display: flex; flex-direction: column; }
        #root:empty { display: flex; align-items: center; justify-content: center; }
        #root:empty::after { 
          content: 'Synthesizing Dashboard...'; 
          font-size: 14px; 
          font-weight: 600; 
          color: #6366f1;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
    </style>

    <!-- Import Map for ESM Dependencies via esm.sh -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@19.0.0",
        "react-dom": "https://esm.sh/react-dom@19.0.0",
        "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.475.0",
        "recharts": "https://esm.sh/recharts@2.15.0?external=react,react-dom",
        "clsx": "https://esm.sh/clsx@2.1.1",
        "tailwind-merge": "https://esm.sh/tailwind-merge@2.6.0"
      }
    }
    </script>
</head>
<body>
    <div id="root"></div>

    <!-- Application Script -->
    <script type="text/babel" data-type="module" data-presets="react,typescript">
        import React, { useState, useEffect, useMemo, useRef } from 'react';
        import { createRoot } from 'react-dom/client';
        import * as Lucide from 'lucide-react';
        import * as Recharts from 'recharts';
        import { clsx } from 'clsx';
        import { twMerge } from 'tailwind-merge';

        // Helper for Tailwind class merging (standard in our templates)
        const cn = (...inputs) => twMerge(clsx(inputs));

        // --- Generated Component Start ---
        ${processedCode}
        // --- Generated Component End ---

        // Mount the application
        const root = createRoot(document.getElementById('root'));
        root.render(<${componentName} />);
    </script>
</body>
</html>`;
};

/**
 * Triggers a browser download for the standalone HTML file.
 */
export const downloadStandaloneHTML = (title: string, code: string) => {
  const htmlContent = generateStandaloneHTML(title, code);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dashlib-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Opens the generated React code in a new StackBlitz project for advanced editing.
 */
export const openInStackBlitz = (title: string, code: string) => {
  const projectTitle = `DashLib AI - ${title}`;
  
  sdk.openProject({
    title: projectTitle,
    description: 'Synthesized by DashLib AI Gemini 3 Engine',
    template: 'create-react-app',
    files: {
      'public/index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${projectTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }</style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
      `,
      'src/index.js': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
      `,
      'src/App.js': code,
      'package.json': JSON.stringify({
        name: "dashlib-generated-app",
        version: "1.0.0",
        private: true,
        dependencies: {
          "react": "^19.2.3",
          "react-dom": "^19.2.3",
          "lucide-react": "^0.563.0",
          "recharts": "^3.7.0",
          "clsx": "^2.1.1",
          "tailwind-merge": "^2.5.2"
        },
        scripts: {
          "start": "react-scripts start",
          "build": "react-scripts build"
        }
      }, null, 2)
    },
    settings: {
      compile: {
        trigger: 'auto',
        clearConsole: false,
      },
    },
  }, {
    openFile: 'src/App.js',
    newWindow: true
  });
};
