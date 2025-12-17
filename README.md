# athameUI

A sharp React component library that's a cut above the rest. Framework-agnostic, style-flexible, and built for modern React applications.

## Installation

```bash
npm install athameui
# or
pnpm add athameui
# or
yarn add athameui
```

## Features

- **Framework Agnostic**: Works with Next.js, React Router, or vanilla React
- **Style Flexible**: CSS Modules for defaults, easily overridden with Tailwind, CSS-in-JS, or plain CSS
- **TypeScript First**: Full type safety out of the box
- **React 19 Ready**: Built with the latest React features and optimizations
- **Accessible**: ARIA-compliant components with keyboard navigation support

## Quick Start

### Basic Usage

```tsx
import { Button, Header } from "athameui";

function App() {
  return (
    <>
      <Header>
        <h1>My App</h1>
      </Header>
      <Button variant="primary" size="medium">
        Click me
      </Button>
    </>
  );
}
```

### With Tailwind CSS

Override default styles by passing Tailwind classes:

```tsx
import { Button } from "athameui";

function App() {
  return (
    <Button
      variant="primary"
      className={{ button: "bg-gradient-to-r from-purple-500 to-pink-500" }}
    >
      Custom Styled
    </Button>
  );
}
```

<!-- ### With Router Integration

Configure routing for framework-specific Link components:

```tsx
import { AthameRouterProvider } from "athameui";
import Link from "next/link"; // or from react-router-dom

function App() {
  return (
    <AthameRouterProvider routerType="next" LinkComponent={Link}>
      <YourApp />
    </AthameRouterProvider>
  );
}
``` -->

## Components

- **Button**: Flexible button with multiple variants and sizes
- **ButtonGroup**: Group related buttons together
- **Header**: Application header/navbar component
<!-- - **AthLink**: Framework-agnostic link component
- **AthameRouterProvider**: Router context for navigation -->

## Styling Philosophy

athameUI provides sensible defaults through CSS Modules while making it easy to customize:

1. **Default Styles**: Every component includes baseline styles that work out of the box
2. **Override Options**: Pass custom classes via `className` prop
3. **No Lock-in**: Use any CSS framework or methodology you prefer

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18+
- TypeScript 5+

## License

MIT

## Contributing

Issues? Visit our [GitHub repository](https://github.com/collinlucke/athameui) to get started.
