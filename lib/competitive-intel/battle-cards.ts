// lib/competitive-intel/battle-cards.ts
export interface CompetitorBattleCard {
  competitor: string;
  weakness: string;
  ourAdvantage: string;
  captureMessage: string;
  migrationIncentive: string;
  urlPath: string;
}

export async function generateBattleCard(
  competitor: string,
  weaknesses: string[],
  advantages: string[],
  platform: string
): Promise<CompetitorBattleCard> {
  return {
    competitor,
    weakness: weaknesses.join(", "),
    ourAdvantage: advantages.join(", "),
    captureMessage: `Switch from ${competitor} to ${platform} — ${advantages[0]}`,
    migrationIncentive: `Free data migration + 30% discount for first year`,
    urlPath: `/competitors/${competitor.toLowerCase().replace(/\s+/g, '-')}/`,
  };
}

export const BATTLE_CARDS = {
  nova: [
    {
      competitor: "DraftKings",
      weakness: "High CAC, poor UK retention, regulatory complexity",
      ourAdvantage: "Lower cost, UKGC + Bulgarian licensing, real-money liquidity",
      captureMessage: "NOVA Gaming: Better odds, faster payouts, full compliance",
      migrationIncentive: "Port your wallet balance + $100 bonus",
      urlPath: "/switch-from-draftkings",
    },
    {
      competitor: "FanDuel",
      weakness: "Limited international markets, high commission",
      ourAdvantage: "EU + Bulgaria expansion, lower house edge",
      captureMessage: "NOVA: Play globally, win more",
      migrationIncentive: "Match your account balance + free spins",
      urlPath: "/switch-from-fanduel",
    },
  ],
  mreply: [
    {
      competitor: "Character.AI",
      weakness: "No monetization, hobby platform, weak enterprise",
      ourAdvantage: "Enterprise API, revenue sharing, MCP orchestration",
      captureMessage: "MindReply: Build AI products that make money",
      migrationIncentive: "Free tier upgrade + $500 API credits",
      urlPath: "/switch-from-character-ai",
    },
  ],
  reseller_pro: [
    {
      competitor: "Paddle",
      weakness: "20-30% commission, limited API, no AI matching",
      ourAdvantage: "8% commission, full API, AI-powered reseller matching",
      captureMessage: "ResellerPro: Keep 92% of every sale",
      migrationIncentive: "Commission-free month + free reseller training",
      urlPath: "/switch-from-paddle",
    },
  ],
  a11: [
    {
      competitor: "Fundrise",
      weakness: "7-10 year lockup, illiquid, high minimums",
      ourAdvantage: "Instant liquidity via tokenization, AI underwriting, $100 minimum",
      captureMessage: "A11: Real estate investing without the lockup",
      migrationIncentive: "Port portfolio + 1% match bonus",
      urlPath: "/switch-from-fundrise",
    },
  ],
};
