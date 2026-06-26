# Faizan-s-Portfolio

Premium developer portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Animation:** Framer Motion, GSAP, Lenis
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** If `npm install` hangs or fails with SSL errors, the project includes a `.npmrc` with `strict-ssl=false` to work around certificate issues on some networks.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
/app              # Next.js app router pages & API routes
/components       # Reusable UI and section components
/hooks            # Custom React hooks
/lib              # Utility functions
/data             # Site content and configuration
/types            # TypeScript type definitions
/styles           # Global CSS
/public           # Static assets
```

## Customization

- Update personal info in `data/site-data.ts`
- Modify colors in `tailwind.config.ts`
- Add resume PDF to `public/resume.pdf`

## Contact Form

The contact form API route is at `/api/contact`. Integrate with an email service (Resend, SendGrid, etc.) for production use.

## License

Private — All rights reserved.
