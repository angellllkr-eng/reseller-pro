// lib/competitive-intel/playbook-generator.ts
export interface CapturePlaybook {
  competitor: string;
  playbook: string;
  pages: string[];
  campaigns: string[];
  incentives: string[];
  timeline: string;
}

export async function generateCapturePlaybook(
  competitor: string,
  weakness: string[],
  captureOpportunity: number
): Promise<CapturePlaybook> {
  const playbooks: Record<string, CapturePlaybook> = {
    regulatory_arbitrage: {
      competitor: "DraftKings",
      playbook: "Regulatory Arbitrage",
      pages: [
        "/vs-draftkings",
        "/uk-gaming-license",
        "/eu-expansion",
        "/responsible-gaming",
      ],
      campaigns: [
        "UK players: NOVA licensed, DK not",
        "EU expansion: Play from Bulgaria, Portugal, Greece",
        "Responsible gaming: Better limits",
      ],
      incentives: ["$100 balance match", "2x points first week", "Free live dealer"],
      timeline: "2 weeks",
    },
    instant_liquidity: {
      competitor: "Fundrise",
      playbook: "Instant Liquidity",
      pages: [
        "/vs-fundrise",
        "/tokenized-real-estate",
        "/instant-exit",
        "/ai-pricing",
      ],
      campaigns: [
        "Fundrise locked 7-10 years; A11 instant",
        "Real estate without lockup risk",
        "AI-powered valuations, instant liquidity",
      ],
      incentives: ["1% portfolio match", "Free AI analysis", "Priority deals"],
      timeline: "1 week",
    },
    lower_commission: {
      competitor: "Paddle",
      playbook: "Commission Undercut",
      pages: [
        "/vs-paddle",
        "/commission-comparison",
        "/api-docs",
        "/reseller-program",
      ],
      campaigns: [
        "Paddle 20-30%; ResellerPro 8%",
        "Better API, AI reseller matching",
        "Keep 92% of every sale",
      ],
      incentives: ["Commission-free $10k", "Free reseller recruitment", "Advanced analytics"],
      timeline: "1 week",
    },
  };

  return playbooks[playbook] || playbooks.regulatory_arbitrage;
}

export async function generateAllPlaybooks(competitors: string[]): Promise<CapturePlaybook[]> {
  return Promise.all(
    competitors.map(c => generateCapturePlaybook(c, [], 80))
  );
}
