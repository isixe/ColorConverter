# ColorConverter

A powerful color conversion tool that supports converting colors between RGB, HEX, HSL, HWB, and CMYK color formats with real-time preview and clipboard support.

## Features

- **Multiple Color Formats**: Convert between RGB, HEX, HSL, HWB, and CMYK
- **Named Colors**: Support for all CSS named colors
- **Clipboard Support**: One-click copy to clipboard for any format
- **Dark Mode**: Built-in dark/light theme support
- **Real-time Conversion**: Instant conversion as you type

## Installation

Clone the repository:

```bash
git clone https://github.com/isixe/ColorConverter.git
```

Navigate to the project directory:

```bash
cd ColorConverter
```

Install dependencies:

```bash
pnpm install
```

## Usage

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Supported Color Formats

| Format   | Description                | Example                   |
| -------- | -------------------------- | ------------------------- |
| **Name** | CSS named colors           | `royalblue`, `crimson`    |
| **HEX**  | Hexadecimal color          | `#4169e1`, `#fff`         |
| **RGB**  | Red, Green, Blue           | `rgb(65, 105, 225)`       |
| **HSL**  | Hue, Saturation, Lightness | `hsl(225, 74%, 57%)`      |
| **HWB**  | Hue, Whiteness, Blackness  | `hwb(225, 0%, 17%)`       |
| **CMYK** | Cyan, Magenta, Yellow, Key | `cmyk(74%, 53%, 0%, 12%)` |

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16
- **UI Library**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
ColorConverter/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main converter page
├── components/            # React components
│   ├── icons/             # Icon components
│   ├── layout/            # Layout components (header, footer)
│   └── ui/                # UI components (button, card, input, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.