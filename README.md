# Brijblash — Botanical Cosmetics Frontend

Clean Next.js App Router static frontend for **Brijblash Botanical Cosmetics**, styled with Modern Neo-Brutalism and Indian Heritage Minimalism, ready for one-click deployment on **Netlify** and future Firebase Auth/Firestore integration.

## Netlify Deployment

1. Connect this repository (`omanpce/brijblush`) to Netlify.
2. Netlify reads `netlify.toml` automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. No backend environment variables are required for the frontend preview.

## Local Development

```bash
npm install
npm run dev
```

## Firebase Integration Placeholder

Client Firebase configuration hooks are prepared in `src/lib/firebase/config.ts` using `NEXT_PUBLIC_FIREBASE_*` environment variables when you connect Firebase Authentication, Firestore, and Storage.
