const fs = require('fs');
const path = require('path');

// Helper to ensure directory exists
function ensureDir(filepath) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Types
const gameTypes = `export type Role = "merlin" | "percival" | "loyal_servant" | "mordred" | "morgana" | "assassin" | "minion" | "oberon";
export type Alignment = "good" | "evil";

export interface RoleInfo {
  id: Role;
  name: string;
  alignment: Alignment;
  description: string;
  ability: string;
}

export interface Player {
  id: string;
  name: string;
  role?: Role;
  isHost: boolean;
  isReady: boolean;
  isOnQuest: boolean;
  hasVoted: boolean;
  vote?: boolean;
  questVote?: boolean;
}

export type QuestStatus = "pending" | "success" | "fail" | "current";

export interface Quest {
  questNumber: number;
  requiredPlayers: number;
  status: QuestStatus;
  failsRequired: number;
  votes?: boolean[];
  team?: string[];
}

export type GamePhase = "lobby" | "role_reveal" | "team_selection" | "team_vote" | "quest_vote" | "quest_result" | "assassination" | "game_over";

export interface GameState {
  gameId: string;
  phase: GamePhase;
  players: Player[];
  currentLeaderIndex: number;
  quests: Quest[];
  currentQuestIndex: number;
  voteTrack: number;
  selectedTeam: string[];
  winner?: Alignment;
  assassinTarget?: string;
}

export interface GameConfig {
  playerCount: number;
  roles: Role[];
  questSizes: number[];
  failsRequired: number[];
  goodCount: number;
  evilCount: number;
}

export const ROLE_CONFIGS: Record<number, GameConfig> = {
  5: { playerCount: 5, roles: ["merlin", "percival", "loyal_servant", "mordred", "morgana"], questSizes: [2, 3, 2, 3, 3], failsRequired: [1, 1, 1, 1, 1], goodCount: 3, evilCount: 2 },
  6: { playerCount: 6, roles: ["merlin", "percival", "loyal_servant", "loyal_servant", "mordred", "morgana"], questSizes: [2, 3, 4, 3, 4], failsRequired: [1, 1, 1, 1, 1], goodCount: 4, evilCount: 2 },
  7: { playerCount: 7, roles: ["merlin", "percival", "loyal_servant", "loyal_servant", "mordred", "morgana", "minion"], questSizes: [2, 3, 3, 4, 4], failsRequired: [1, 1, 1, 2, 1], goodCount: 4, evilCount: 3 },
  8: { playerCount: 8, roles: ["merlin", "percival", "loyal_servant", "loyal_servant", "loyal_servant", "mordred", "morgana", "minion"], questSizes: [3, 4, 4, 5, 5], failsRequired: [1, 1, 1, 2, 1], goodCount: 5, evilCount: 3 },
  9: { playerCount: 9, roles: ["merlin", "percival", "loyal_servant", "loyal_servant", "loyal_servant", "loyal_servant", "mordred", "morgana", "assassin"], questSizes: [3, 4, 4, 5, 5], failsRequired: [1, 1, 1, 2, 1], goodCount: 6, evilCount: 3 },
  10: { playerCount: 10, roles: ["merlin", "percival", "loyal_servant", "loyal_servant", "loyal_servant", "loyal_servant", "mordred", "morgana", "assassin", "minion"], questSizes: [3, 4, 4, 5, 5], failsRequired: [1, 1, 1, 2, 1], goodCount: 6, evilCount: 4 },
};

export const ROLES_INFO: Record<Role, RoleInfo> = {
  merlin: { id: "merlin", name: "Merlin", alignment: "good", description: "The wise wizard", ability: "Knows all evil except Mordred" },
  percival: { id: "percival", name: "Percival", alignment: "good", description: "The noble knight", ability: "Knows Merlin (and Morgana)" },
  loyal_servant: { id: "loyal_servant", name: "Loyal Servant", alignment: "good", description: "A faithful servant", ability: "No special abilities" },
  mordred: { id: "mordred", name: "Mordred", alignment: "evil", description: "Hidden from Merlin", ability: "Unknown to Merlin" },
  morgana: { id: "morgana", name: "Morgana", alignment: "evil", description: "The enchantress", ability: "Appears as Merlin to Percival" },
  assassin: { id: "assassin", name: "Assassin", alignment: "evil", description: "The deadly agent", ability: "Can assassinate Merlin" },
  minion: { id: "minion", name: "Minion of Mordred", alignment: "evil", description: "Servant of darkness", ability: "Knows other evil" },
  oberon: { id: "oberon", name: "Oberon", alignment: "evil", description: "The isolated evil", ability: "Unknown to other evil" },
};
`;

ensureDir('src/types/game.ts');
fs.writeFileSync('src/types/game.ts', gameTypes);
console.log('Created: src/types/game.ts');

// Layout
const layout = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avalon - The Resistance",
  description: "Play the classic social deduction game Avalon online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-midnight-900">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-royal/10 rounded-full blur-[100px]" />
          </div>
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.tsx', layout);
console.log('Created: src/app/layout.tsx');

console.log('Done creating initial files!');
