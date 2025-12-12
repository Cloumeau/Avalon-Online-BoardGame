const fs = require('fs');

const store = `import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameState, GamePhase, Player, Quest, Role, ROLE_CONFIGS, Alignment } from "@/types/game";
import { nanoid } from "nanoid";

interface GameStore extends GameState {
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;
  createGame: (hostName: string) => string;
  joinGame: (gameId: string, playerName: string) => boolean;
  leaveGame: () => void;
  toggleReady: () => void;
  startGame: () => void;
  setPhase: (phase: GamePhase) => void;
  acknowledgeRole: () => void;
  selectPlayer: (playerId: string) => void;
  confirmTeam: () => void;
  submitTeamVote: (approve: boolean) => void;
  submitQuestVote: (success: boolean) => void;
  selectAssassinTarget: (playerId: string) => void;
  confirmAssassination: () => void;
  resetGame: () => void;
}

const initialQuests: Quest[] = [
  { questNumber: 1, requiredPlayers: 2, status: "pending", failsRequired: 1 },
  { questNumber: 2, requiredPlayers: 3, status: "pending", failsRequired: 1 },
  { questNumber: 3, requiredPlayers: 2, status: "pending", failsRequired: 1 },
  { questNumber: 4, requiredPlayers: 3, status: "pending", failsRequired: 1 },
  { questNumber: 5, requiredPlayers: 3, status: "pending", failsRequired: 1 },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameId: "",
      phase: "lobby",
      players: [],
      currentLeaderIndex: 0,
      quests: initialQuests,
      currentQuestIndex: 0,
      voteTrack: 0,
      selectedTeam: [],
      currentPlayer: null,

      setCurrentPlayer: (player) => set({ currentPlayer: player }),

      createGame: (hostName) => {
        const gameId = nanoid(6).toUpperCase();
        const host: Player = {
          id: nanoid(),
          name: hostName,
          isHost: true,
          isReady: false,
          isOnQuest: false,
          hasVoted: false,
        };
        set({
          gameId,
          phase: "lobby",
          players: [host],
          currentPlayer: host,
          quests: initialQuests,
          currentQuestIndex: 0,
          voteTrack: 0,
          selectedTeam: [],
          currentLeaderIndex: 0,
        });
        return gameId;
      },

      joinGame: (gameId, playerName) => {
        const newPlayer: Player = {
          id: nanoid(),
          name: playerName,
          isHost: false,
          isReady: false,
          isOnQuest: false,
          hasVoted: false,
        };
        set((state) => ({
          players: [...state.players, newPlayer],
          currentPlayer: newPlayer,
        }));
        return true;
      },

      leaveGame: () => {
        const { currentPlayer, players } = get();
        if (!currentPlayer) return;
        set({
          players: players.filter((p) => p.id !== currentPlayer.id),
          currentPlayer: null,
        });
      },

      toggleReady: () => {
        const { currentPlayer, players } = get();
        if (!currentPlayer) return;
        set({
          players: players.map((p) =>
            p.id === currentPlayer.id ? { ...p, isReady: !p.isReady } : p
          ),
          currentPlayer: { ...currentPlayer, isReady: !currentPlayer.isReady },
        });
      },

      startGame: () => {
        const { players } = get();
        const playerCount = players.length;
        if (playerCount < 5 || playerCount > 10) return;
        
        const config = ROLE_CONFIGS[playerCount];
        const shuffledRoles = shuffleArray(config.roles);
        const shuffledPlayers = shuffleArray(players);
        
        const playersWithRoles = shuffledPlayers.map((player, index) => ({
          ...player,
          role: shuffledRoles[index],
          isReady: false,
        }));
        
        const quests: Quest[] = config.questSizes.map((size, index) => ({
          questNumber: index + 1,
          requiredPlayers: size,
          status: index === 0 ? "current" : "pending",
          failsRequired: config.failsRequired[index],
        }));
        
        const currentPlayer = get().currentPlayer;
        const updatedCurrentPlayer = playersWithRoles.find((p) => p.id === currentPlayer?.id);
        
        set({
          phase: "role_reveal",
          players: playersWithRoles,
          quests,
          currentLeaderIndex: 0,
          currentQuestIndex: 0,
          voteTrack: 0,
          selectedTeam: [],
          currentPlayer: updatedCurrentPlayer || null,
        });
      },

      setPhase: (phase) => set({ phase }),

      acknowledgeRole: () => {
        const { currentPlayer, players } = get();
        if (!currentPlayer) return;
        const updatedPlayers = players.map((p) =>
          p.id === currentPlayer.id ? { ...p, isReady: true } : p
        );
        const allReady = updatedPlayers.every((p) => p.isReady);
        set({
          players: updatedPlayers,
          currentPlayer: { ...currentPlayer, isReady: true },
          phase: allReady ? "team_selection" : "role_reveal",
        });
      },

      selectPlayer: (playerId) => {
        const { selectedTeam, quests, currentQuestIndex, currentPlayer, players } = get();
        const currentQuest = quests[currentQuestIndex];
        const leader = players[get().currentLeaderIndex];
        if (currentPlayer?.id !== leader.id) return;
        
        if (selectedTeam.includes(playerId)) {
          set({ selectedTeam: selectedTeam.filter((id) => id !== playerId) });
        } else if (selectedTeam.length < currentQuest.requiredPlayers) {
          set({ selectedTeam: [...selectedTeam, playerId] });
        }
      },

      confirmTeam: () => {
        const { selectedTeam, quests, currentQuestIndex, players } = get();
        const currentQuest = quests[currentQuestIndex];
        if (selectedTeam.length !== currentQuest.requiredPlayers) return;
        
        const updatedPlayers = players.map((p) => ({
          ...p,
          isOnQuest: selectedTeam.includes(p.id),
          hasVoted: false,
          vote: undefined,
        }));
        set({ players: updatedPlayers, phase: "team_vote" });
      },

      submitTeamVote: (approve) => {
        const { currentPlayer, players, voteTrack, currentLeaderIndex } = get();
        if (!currentPlayer || currentPlayer.hasVoted) return;
        
        const updatedPlayers = players.map((p) =>
          p.id === currentPlayer.id ? { ...p, hasVoted: true, vote: approve } : p
        );
        const allVoted = updatedPlayers.every((p) => p.hasVoted);
        
        if (allVoted) {
          const approvals = updatedPlayers.filter((p) => p.vote).length;
          const approved = approvals > updatedPlayers.length / 2;
          
          if (approved) {
            set({
              players: updatedPlayers.map((p) => ({ ...p, hasVoted: false, vote: undefined })),
              phase: "quest_vote",
              voteTrack: 0,
              currentPlayer: { ...currentPlayer, hasVoted: true, vote: approve },
            });
          } else {
            const newVoteTrack = voteTrack + 1;
            if (newVoteTrack >= 5) {
              set({ players: updatedPlayers, winner: "evil", phase: "game_over", currentPlayer: { ...currentPlayer, hasVoted: true, vote: approve } });
            } else {
              const nextLeader = (currentLeaderIndex + 1) % updatedPlayers.length;
              set({
                players: updatedPlayers.map((p) => ({ ...p, hasVoted: false, vote: undefined })),
                voteTrack: newVoteTrack,
                currentLeaderIndex: nextLeader,
                selectedTeam: [],
                phase: "team_selection",
                currentPlayer: { ...currentPlayer, hasVoted: false, vote: undefined },
              });
            }
          }
        } else {
          set({ players: updatedPlayers, currentPlayer: { ...currentPlayer, hasVoted: true, vote: approve } });
        }
      },

      submitQuestVote: (success) => {
        const { currentPlayer, players, quests, currentQuestIndex, currentLeaderIndex } = get();
        if (!currentPlayer || !currentPlayer.isOnQuest || currentPlayer.questVote !== undefined) return;
        
        const updatedPlayers = players.map((p) =>
          p.id === currentPlayer.id ? { ...p, questVote: success } : p
        );
        const questMembers = updatedPlayers.filter((p) => p.isOnQuest);
        const allVoted = questMembers.every((p) => p.questVote !== undefined);
        
        if (allVoted) {
          const fails = questMembers.filter((p) => p.questVote === false).length;
          const currentQuest = quests[currentQuestIndex];
          const questFailed = fails >= currentQuest.failsRequired;
          
          const updatedQuests = quests.map((q, i) =>
            i === currentQuestIndex
              ? { ...q, status: questFailed ? "fail" : "success", votes: questMembers.map((p) => p.questVote!) }
              : i === currentQuestIndex + 1 ? { ...q, status: "current" } : q
          );
          
          const successCount = updatedQuests.filter((q) => q.status === "success").length;
          const failCount = updatedQuests.filter((q) => q.status === "fail").length;
          
          let nextPhase: GamePhase = "quest_result";
          let winner: Alignment | undefined;
          
          if (successCount >= 3) nextPhase = "assassination";
          else if (failCount >= 3) { winner = "evil"; nextPhase = "game_over"; }
          
          const nextLeader = (currentLeaderIndex + 1) % updatedPlayers.length;
          
          set({
            players: updatedPlayers.map((p) => ({ ...p, isOnQuest: false, questVote: undefined, hasVoted: false })),
            quests: updatedQuests,
            currentQuestIndex: currentQuestIndex + 1,
            currentLeaderIndex: nextLeader,
            selectedTeam: [],
            phase: nextPhase,
            winner,
            currentPlayer: { ...currentPlayer, questVote: success },
          });
        } else {
          set({ players: updatedPlayers, currentPlayer: { ...currentPlayer, questVote: success } });
        }
      },

      selectAssassinTarget: (playerId) => set({ assassinTarget: playerId }),

      confirmAssassination: () => {
        const { assassinTarget, players } = get();
        if (!assassinTarget) return;
        const target = players.find((p) => p.id === assassinTarget);
        const merlinKilled = target?.role === "merlin";
        set({ winner: merlinKilled ? "evil" : "good", phase: "game_over" });
      },

      resetGame: () => {
        set({
          phase: "lobby",
          players: get().players.map((p) => ({
            ...p,
            role: undefined,
            isReady: false,
            isOnQuest: false,
            hasVoted: false,
            vote: undefined,
            questVote: undefined,
          })),
          quests: initialQuests,
          currentQuestIndex: 0,
          voteTrack: 0,
          selectedTeam: [],
          currentLeaderIndex: 0,
          winner: undefined,
          assassinTarget: undefined,
        });
      },
    }),
    { name: "avalon-game-storage", partialize: (state) => ({ gameId: state.gameId, currentPlayer: state.currentPlayer }) }
  )
);
`;

fs.writeFileSync('src/store/gameStore.ts', store);
console.log('Created: src/store/gameStore.ts');
