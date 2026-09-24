// lib/competitive-intel/migration-playbooks.ts
export interface MigrationPlaybook {
  from_platform: string;
  to_platform: string;
  steps: string[];
  data_mapping: Record<string, string>;
  incentives: string[];
  support_resources: string[];
}

export const MIGRATION_PLAYBOOKS = {
  // Real estate: Fundrise → A11
  fundrise_to_a11: {
    from_platform: "Fundrise",
    to_platform: "A11",
    steps: [
      "1. Create A11 account (2 min)",
      "2. Complete optional KYC upgrade (5 min)",
      "3. Port existing portfolio (instant)",
      "4. Set up tokenized liquidity (2 min)",
      "5. Claim 1% match bonus",
    ],
    data_mapping: {
      "Fundrise portfolio": "A11 property holdings",
      "DRIP earnings": "A11 reinvestment pool",
      "Account balance": "A11 cash reserve",
    },
    incentives: [
      "1% portfolio match bonus",
      "Free AI property analysis for new investments",
      "Priority access to high-yield deals",
    ],
    support_resources: [
      "/guides/migrate-from-fundrise",
      "/faq/fundrise-vs-a11",
      "Email: migration@a11.com",
    ],
  },
  
  // Gaming: DraftKings → NOVA
  draftkings_to_nova: {
    from_platform: "DraftKings",
    to_platform: "NOVA Gaming",
    steps: [
      "1. Verify account on NOVA (2 min)",
      "2. Request balance transfer from DraftKings (instant API)",
      "3. Confirm UK/Bulgaria compliance (automated)",
      "4. Claim welcome bonus ($100+)",
      "5. Play with your full balance",
    ],
    data_mapping: {
      "DK account balance": "NOVA wallet",
      "Betting history": "NOVA playbook analytics",
      "VIP tier": "NOVA loyalty rewards",
    },
    incentives: [
      "$100 balance match + $50 free play",
      "2x loyalty points for first week",
      "Exclusive live dealer access",
    ],
    support_resources: [
      "/guides/switch-from-draftkings",
      "/faq/gaming-comparison",
      "Live chat: support@nova.gaming",
    ],
  },
  
  // Reseller: Paddle → ResellerPro
  paddle_to_reseller: {
    from_platform: "Paddle",
    to_platform: "ResellerPro",
    steps: [
      "1. Register ResellerPro account",
      "2. Connect your products (CSV import)",
      "3. Auto-port Paddle earnings",
      "4. Set up payouts",
      "5. Enable AI reseller matching",
    ],
    data_mapping: {
      "Paddle products": "ResellerPro catalog",
      "Customer list": "ResellerPro audience",
      "Commission payouts": "ResellerPro earnings",
    },
    incentives: [
      "Commission-free first $10k",
      "Free reseller recruitment (AI-powered)",
      "Advanced analytics + A/B testing",
    ],
    support_resources: [
      "/guides/migrate-from-paddle",
      "/pricing-comparison",
      "Slack: partner-support",
    ],
  },
};
