# 🔌 RESELLERPRO — WIRE & INTEGRATE

**Status:** 🔴 LIVE INTEGRATION IN PROGRESS  
**Target:** Connect existing repo → Apply branding → Activate payments → Deploy  
**Time Estimate:** 4 hours (compress to 2 with parallel execution)  

---

## STEP 1: CLONE & INSPECT EXISTING REPO

```bash
# Clone the existing ResellerPro platform repo
git clone https://github.com/angellllkr-eng/resellerpro-platform.git resellerpro-live
cd resellerpro-live

# Check current state
git log --oneline -5
git branch -a
ls -la

# Install & test locally
npm install
npm run dev

# Open http://localhost:3000 (test landing page)
```

**What we expect to find:**
- ✅ Next.js app structure
- ✅ Stripe test mode setup
- ✅ Basic landing page (may be minimal)
- ✅ Vercel deployment config
- ✅ Environment variables template

---

## STEP 2: WIRE NEW BRANDING

Replace/Update these files with professional gradient UI:

### Main Pages
```bash
# 1. Root layout (add gradient background + logo)
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ResellerPro | Professional E-Commerce",
  description: "Sell more, manage less.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        {children}
      </body>
    </html>
  )
}
EOF

# 2. Landing page (hero + features + pricing)
# (Copy from resellerpro/app/page.tsx we created earlier)

# 3. Dashboard page
# (Copy from resellerpro/app/dashboard/page.tsx)
```

### Global Styles
```bash
# Update Tailwind colors
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'amber': {
          '400': '#F59E0B',
          '500': '#F7A51A',
        },
        'orange': {
          '400': '#FB923C',
          '500': '#FB923C',
          '600': '#EA580C',
        },
        'slate': {
          '100': '#F3F4F6',
          '400': '#9CA3AF',
          '600': '#374151',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
      },
    },
  },
  plugins: [],
}
export default config
EOF
```

### Logo & Favicon
```bash
# Create gradient logo (SVG)
cat > public/logo.svg << 'EOF'
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FB923C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#grad)" rx="12"/>
  <text x="50" y="65" font-size="60" font-weight="bold" text-anchor="middle" fill="#111827" font-family="Arial, sans-serif">RP</text>
</svg>
EOF

# Update favicon in public/favicon.ico (use same RP gradient)
```

---

## STEP 3: WIRE STRIPE INTEGRATION

### Enable Live Payments
```bash
# 1. Create checkout route
cat > app/api/checkout/route.ts << 'EOF'
import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  try {
    const { price, product_name } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product_name,
              images: ['https://resellerpro.app/logo.svg'],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
EOF

# 2. Create webhook handler
cat > app/api/webhooks/stripe/route.ts << 'EOF'
import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('✅ Payment successful:', session.id)
      // TODO: Create order in database
      // TODO: Send confirmation email
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 400 })
  }
}
EOF
```

### Update Environment
```bash
# Add to .env.local (test mode first)
STRIPE_PUBLIC_KEY=pk_test_51JjZ...
STRIPE_SECRET_KEY=sk_test_51JjZ...
STRIPE_WEBHOOK_SECRET=whsec_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production:
# - Switch to live keys (pk_live_, sk_live_)
# - Update NEXT_PUBLIC_APP_URL=https://resellerpro.app
# - Add to Vercel secrets
```

---

## STEP 4: WIRE DATABASE SCHEMA

```bash
# Create order schema (Supabase SQL)
cat > db/schema.sql << 'EOF'
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  tier VARCHAR(50) DEFAULT 'starter',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10, 2),
  inventory INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  stripe_session_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY users_own_data ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY products_own_data ON products
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM auth.users WHERE id = auth.uid()
  ));

CREATE POLICY orders_own_data ON orders
  FOR SELECT USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM auth.users WHERE id = auth.uid()
  ));
EOF
```

---

## STEP 5: WIRE DEPLOYMENT CONFIG

```bash
# Update vercel.json (multi-domain routing)
cat > vercel.json << 'EOF'
{
  "env": {
    "NEXT_PUBLIC_APP_URL": "@next_public_app_url",
    "STRIPE_PUBLIC_KEY": "@stripe_public_key",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook_secret",
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "https://resellerpro.app",
      "permanent": false
    }
  ]
}
EOF

# Update next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
EOF
```

---

## STEP 6: BUILD & TEST LOCALLY

```bash
# Install dependencies with new config
npm install

# Build locally
npm run build

# Test production build
npm run start

# Open http://localhost:3000
# Test:
# - Landing page loads with gradient
# - Logo displays (RP gradient)
# - Checkout button clickable
# - Stripe test mode works
```

---

## STEP 7: DEPLOY TO PRODUCTION

```bash
# 1. Commit all changes
git add .
git commit -m "feat: apply professional branding + activate live payments"

# 2. Push to main
git push origin main

# 3. Vercel auto-deploys (via webhook)
# Monitor: https://vercel.com/dashboard

# 4. Configure DNS
# Add CNAME records:
#   resellerpro.app → cname.vercel-dns.com
#   app.resellerpro.app → cname.vercel-dns.com
#   admin.resellerpro.app → cname.vercel-dns.com

# 5. Verify SSL (automatic via Vercel)
curl -I https://resellerpro.app

# 6. Test checkout
# - Go to https://resellerpro.app
# - Click pricing CTA
# - Test payment with Stripe test card

# 7. Verify webhook
# - Complete test payment
# - Check webhook delivery in Stripe dashboard
# - Verify order appears in database
```

---

## STEP 8: ENABLE LIVE PAYMENTS (When Ready)

```bash
# 1. Generate live Stripe API keys
# https://dashboard.stripe.com/apikeys

# 2. Add to Vercel secrets
vercel env add STRIPE_PUBLIC_KEY pk_live_...
vercel env add STRIPE_SECRET_KEY sk_live_...
vercel env add STRIPE_WEBHOOK_SECRET whsec_live_...

# 3. Redeploy with live keys
vercel deploy --prod

# 4. Test with small amount
# - Go to https://resellerpro.app/pricing
# - Click "Get Started" (Starter plan)
# - Complete test transaction
# - Verify in Stripe dashboard

# 5. Monitor first 24 hours
# - Check error logs (Sentry)
# - Verify payments processing
# - Confirm emails sending
# - Track conversion rate
```

---

## ✅ WIRE CHECKLIST

- [ ] Clone existing repo
- [ ] Install dependencies
- [ ] Apply gradient branding (layout, logo, colors)
- [ ] Update all pages (landing, dashboard, admin)
- [ ] Wire Stripe checkout API
- [ ] Wire Stripe webhook handler
- [ ] Create database schema (orders, products, users)
- [ ] Update environment variables (.env.local)
- [ ] Update Vercel config (vercel.json, next.config.js)
- [ ] Build & test locally
- [ ] Commit changes
- [ ] Deploy to Vercel
- [ ] Configure DNS
- [ ] Test checkout (test mode)
- [ ] Enable live payments (when ready)
- [ ] Monitor 24h

---

## 🚀 EXPECTED RESULT

```
✅ https://resellerpro.app — Landing page (gradient UI)
✅ https://app.resellerpro.app — Reseller dashboard
✅ Full payment processing (Stripe)
✅ Professional branding (Amber/Orange)
✅ Live on production
✅ 24/7 monitoring active
```

---

**Ready to wire? Execute above commands in order. Each step builds on the previous.**
