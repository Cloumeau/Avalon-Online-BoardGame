# 🏰 Avalon Online Board Game

A real-time multiplayer web implementation of **The Resistance: Avalon** - the classic social deduction board game of hidden identities, deception, and deduction.

## 🎮 About the Game

Avalon is a game of hidden loyalty. Players are secretly divided into two teams:
- **Loyal Servants of Arthur** - working to complete quests for the good of Camelot
- **Minions of Mordred** - sabotaging missions from within

## 🚀 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Runtime:** React 19

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Cloumeau/Avalon-Online-BoardGame.git
cd Avalon-Online-BoardGame

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── game/      # Game session pages
│   └── lobby/     # Game lobby pages
├── components/    # Reusable React components
├── lib/           # Utility functions
├── store/         # Zustand state management
└── types/         # TypeScript type definitions
```

## 📄 License

MIT

