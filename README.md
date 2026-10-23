# AI-Driven Market Linkage and Smart Cataloging

An end-to-end platform empowering rural and traditional artisans with smart AI cataloging, market linkage, multilingual conversational assistance, image enhancement, and automated enquiry management.

## Project Structure

```
AI-Driven-Market-Linkage-and-Smart-Cataloging/
├── README.md
├── .gitignore
│
├── frontend/                            # React + Vite (the user interface)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example                     # VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                      # Routes only
│       ├── styles.css
│       ├── i18n/
│       │   ├── index.js
│       │   ├── en.js
│       │   ├── hi.js
│       │   ├── kn.js
│       │   ├── ta.js
│       │   └── bn.js
│       ├── lib/
│       │   └── supabaseClient.js        # createClient with the anon key (login, image upload)
│       ├── services/
│       │   └── api.js                   # Calls to the backend
│       ├── hooks/
│       │   └── useVoiceInput.js
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── LanguageSwitcher.jsx
│       │   ├── ProductCard.jsx
│       │   ├── Badge.jsx
│       │   └── BeforeAfterSlider.jsx
│       └── pages/
│           ├── Marketplace.jsx
│           ├── ProductDetail.jsx
│           ├── AddProduct.jsx
│           ├── ImageEnhancer.jsx
│           ├── Assistant.jsx
│           ├── MarketInsights.jsx
│           ├── Enquiries.jsx
│           ├── ArtisanProfile.jsx
│           └── Login.jsx
│
├── backend/                             # Node.js + Express (the API)
│   ├── package.json
│   ├── .env.example                     # PORT, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, AI_API_KEY
│   └── src/
│       ├── index.js                     # App setup only
│       ├── config/
│       │   └── supabase.js              # createClient with the service role key
│       ├── routes/
│       │   ├── products.js
│       │   ├── artisans.js
│       │   ├── enquiries.js
│       │   ├── market.js
│       │   └── ai.js                    # /catalog, /chat, /enhance-image
│       ├── controllers/
│       ├── services/
│       │   ├── catalogService.js        # LLM call for titles and descriptions
│       │   ├── chatService.js           # Multilingual assistant
│       │   ├── imageService.js          # Image enhancement
│       │   └── marketService.js         # Trend and price analysis
│       └── middleware/
│           ├── auth.js                  # Verifies the Supabase JWT
│           ├── upload.js
│           └── errorHandler.js
│
└── supabase/                            # Database, auth rules and storage
    ├── config.toml                      # Local Supabase settings
    ├── seed.sql                         # Sample artisans, products and enquiries
    ├── migrations/
    │   ├── 001_create_tables.sql        # artisans, products, enquiries
    │   ├── 002_rls_policies.sql         # Row Level Security rules
    │   └── 003_storage_buckets.sql      # product-images bucket
    └── functions/                       # Optional Edge Functions
        ├── ai-catalog/
        │   └── index.ts
        └── ai-chat/
            └── index.ts
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Supabase Setup
- Configure your Supabase project credentials in frontend and backend `.env` files.
- Apply database migrations from `supabase/migrations/` and seed data from `supabase/seed.sql`.
