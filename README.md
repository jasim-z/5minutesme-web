# 5MinutesMe Web

The official website for the 5MinutesMe app - a mindful 5-minute habit companion.

## Features

- 🎨 **Dark Mode by Default** - Matches the app's design with dark theme as default
- 🌓 **Theme Toggle** - Switch between light and dark modes
- 📱 **Responsive Design** - Beautiful on all devices
- ⚡ **Next.js 16** - Built with the latest Next.js and React 19
- 🎯 **TypeScript** - Fully typed for better developer experience
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS
- 🧩 **shadcn/ui** - Beautiful, accessible components

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
5minutesme-web/
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles with theme colors
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx     # Theme toggle component
└── lib/
    └── utils.ts         # Utility functions
```

## Color Palette

The website uses the same color palette as the 5MinutesMe app:

### Dark Theme (Default)
- Background: `#2D3E3F` (Dark Forest)
- Card: `#3D4F52` (Deep Teal)
- Primary: `#7A9B8E` (Sage Green)
- Accent: `#B5D4C8` (Mint Green)
- Text: `#FFFFFF` (Pure White)

### Light Theme
- Background: `#E4EBE8` (Sage Green at 20% opacity)
- Card: `#F5F8F6` (Very light sage/mint tint)
- Primary: `#3D4F52` (Deep Teal)
- Text: `#2D3E3F` (Dark Forest)

## Admin: send push notifications

Internal ops UI (not linked from the marketing site):

- URL: `/admin/push`
- Auth: Supabase **Google** (primary) or email/password
- Access: emails listed in `ADMIN_EMAILS`
- Send path: Next.js API route → Supabase `send-push` Edge Function (uses server-only `PUSH_ADMIN_SECRET`)

Copy `.env.example` values into `.env` / Vercel env:

```bash
PUSH_ADMIN_SECRET=...   # same as Supabase function secret
ADMIN_EMAILS=you@example.com
```

In **Supabase Auth → URL configuration**, allow redirect:

- `http://localhost:3000/admin/push` (local)
- `https://YOUR_PRODUCTION_DOMAIN/admin/push`

`robots` is set to noindex for `/admin/*`. Do not add this route to public navigation.

## Building for Production

```bash
npm run build
```

The production build will be in the `.next` folder.

## Deployment

The site can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your repository
- **Other platforms**: Follow Next.js deployment guides

## License

Private project - All rights reserved.
