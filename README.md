# Avalon Board Game

## Overview
This project is a web-based implementation of the Avalon board game, developed using Python, Firebase, and HTML. Avalon is a social deduction game where players take on the roles of characters in the world of King Arthur. The goal is to either successfully complete quests or sabotage them, depending on the player's allegiance.

## Features
- **Gameplay:** Experience the excitement of Avalon gameplay with friends or strangers online.
- **Roles:** Assume various roles such as Merlin, Assassin, and Loyal Servants of Arthur, each with unique abilities and objectives.
- **Real-time Updates:** Stay engaged with real-time updates on game progress, player actions, and chat messages.
- **Firebase Integration:** Utilize Firebase as the backend for real-time data synchronization and storage.
- **User Authentication:** Securely authenticate users using Firebase Authentication, allowing for personalized experiences and tracking of player statistics.
- **Responsive Design:** Enjoy a seamless gaming experience across devices and screen sizes.

## File Structure
```
Repository Root
├── README.md             # Project documentation
├── avalon.py             # Python backend for game logic
├── avalon_home.html      # Home page of the Avalon game
├── email.js              # JavaScript for email notifications
├── firebase.js           # Firebase configuration and integration
├── function.js           # Game functionality and core logic
├── game.css              # Styling for the game interface
├── game.html             # Main game interface
├── index.js              # Entry point for JavaScript functionality
├── styles.css            # Global styling for the project
└── waiting-room.html     # Lobby for players to wait before the game starts
```

## Requirements
- **Python 3.x**
- **Firebase Account:** For backend integration and user authentication.
- **HTML/CSS/JavaScript Compatible Web Browser:** To run the game interface.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Cloumeau/Avalon-Board-Game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Avalon-Board-Game
   ```
3. Set up Firebase:
   - Create a Firebase project.
   - Add your `firebaseConfig` in `firebase.js`.
4. Run the Python backend:
   ```bash
   python avalon.py
   ```
5. Open `avalon_home.html` in your web browser to start the game.

## Usage
- **Start the Game:** Open the home page and log in using Firebase Authentication.
- **Waiting Room:** Players can join the waiting room until the game starts.
- **Gameplay:** Follow the game instructions displayed on the interface.
- **Real-time Interaction:** Use the chat feature and monitor game updates in real-time.

## Contributing
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

---

Developed and maintained for fans of the Avalon board game.
