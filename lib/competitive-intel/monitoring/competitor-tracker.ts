// lib/competitive-intel/monitoring/competitor-tracker.ts
export interface CompetitorHealth {
  name: string;
  market: string;
  healthScore: number; // 0-100
  signals: {
    userGrowth: number; // negative = declining
    fundingStatus: 'funded' | 'struggling' | 'raising' | 'acquired' | 'defunct';
    regulatoryRisk: 'high' | 'medium' | 'low';
    userSentiment: number; // -100 to 100
    techDebt: number; // 0-100
    customerChurn: number; // percentage
  };
  captureOpportunity: number; // 0-100
  playbooks: string[];
}

export async function monitorCompetitorHealth(): Promise<CompetitorHealth[]> {
  // Pull from: Crunchbase API, Twitter sentiment, Reddit, App Store reviews, news APIs
  return [
    {
      name: "DraftKings",
      market: "gaming",
      healthScore: 62,
      signals: {
        userGrowth: -8, // declining 8%
        fundingStatus: "struggling",
        regulatoryRisk: "high",
        userSentiment: -35, // negative
        techDebt: 72,
        customerChurn: 12,
      },
      captureOpportunity: 85,
      playbooks: ["regulatory_arbitrage", "better_ux", "lower_fees"],
    },
    {
      name: "Fundrise",
      market: "realestate",
      healthScore: 58,
      signals: {
        userGrowth: -5,
        fundingStatus: "struggling",
        regulatoryRisk: "medium",
        userSentiment: -22,
        techDebt: 65,
        customerChurn: 18,
      },
      captureOpportunity: 92,
      playbooks: ["instant_liquidity", "lower_minimums", "ai_underwriting"],
    },
    {
      name: "Paddle",
      market: "commerce",
      healthScore: 71,
      signals: {
        userGrowth: -2,
        fundingStatus: "raising",
        regulatoryRisk: "low",
        userSentiment: -15,
        techDebt: 58,
        customerChurn: 8,
      },
      captureOpportunity: 78,
      playbooks: ["lower_commission", "better_api", "ai_matching"],
    },
    {
      name: "Character.AI",
      market: "ai",
      healthScore: 55,
      signals: {
        userGrowth: -22,
        fundingStatus: "struggling",
        regulatoryRisk: "high",
        userSentiment: -45,
        techDebt: 82,
        customerChurn: 35,
      },
      captureOpportunity: 95,
      playbooks: ["monetization", "enterprise_api", "data_ownership"],
    },
  ];
}

export async function rankCaptureOpportunities(): Promise<CompetitorHealth[]> {
  const competitors = await monitorCompetitorHealth();
  return competitors.sort((a, b) => b.captureOpportunity - a.captureOpportunity);
}
