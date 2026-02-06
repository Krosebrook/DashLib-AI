
import sdk from '@stackblitz/sdk';

/**
 * Generates a complete, standalone HTML string for a portable micro-app.
 * This file is "Zero-Install" - it runs in any browser with no local setup.
 */
export const generateStandaloneHTML = (title: string, code: string): string => {
  // We need to transform the "export default function Dashboard" into a mountable component
  const componentBody = code
    .replace(/export default function \w+/, 'function Dashboard')
    .replace(/import .* from .*/g, ''); // Remove existing imports as they are handled by importmap

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DashLib PMA - ${title}</title>
    <!-- Zero-Install Dependencies via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
        #root { min-height: 100vh; display: flex; flex-direction: column; }
        /* Prevent layout shift during JS load */
        #root:empty { display: flex; align-items: center; justify-content: center; }
        #root:empty::after { content: 'Initializing Micro-App...'; font-size: 14px; font-weight: 600; color: #64748b; }
    </style>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@^19.2.3",
        "react-dom/client": "https://esm.sh/react-dom@^19.2.3/client",
        "lucide-react": "https://esm.sh/lucide-react@^0.563.0",
        "recharts": "https://esm.sh/recharts@^3.7.0",
        "clsx": "https://esm.sh/clsx@2.1.1",
        "tailwind-merge": "https://esm.sh/tailwind-merge@2.5.2"
      }
    }
    </script>
</head>
<body>
    <div id="root"></div>
    <script type="module">
        import React, { useState, useMemo, useEffect } from 'react';
        import ReactDOM from 'react-dom/client';
        import * as Lucide from 'lucide-react';
        import * as Recharts from 'recharts';
        import { clsx } from 'clsx';
        import { twMerge } from 'tailwind-merge';

        // Helper for Tailwind class merging often used in AI generated code
        window.cn = (...inputs) => twMerge(clsx(inputs));

        // Inject the dashboard component
        ${componentBody}

        // Mount the application
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Dashboard));
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
  link.download = `pma-${title.toLowerCase().replace(/\s+/g, '-')}.html`;
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
          "react": "^18.2.0",
          "react-dom": "^18.2.0",
          "lucide-react": "latest",
          "recharts": "latest",
          "clsx": "latest",
          "tailwind-merge": "latest"
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
