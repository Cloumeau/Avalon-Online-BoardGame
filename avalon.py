import random

# define characters for each number of players
characters = {
    5: ["Mordred", "Minion of Mordred", "Loyal Servant", "Loyal Servant", "Merlin"],
    6: ["Mordred", "Morgana", "Loyal Servant", "Loyal Servant", "Merlin", "Percival"],
    7: ["Mordred", "Morgana", "Loyal Servant", "Loyal Servant", "Minion of Mordred", "Merlin", "Percival"],
    8: ["Mordred", "Morgana", "Loyal Servant", "Loyal Servant", "Loyal Servant", "Minion of Mordred", "Merlin", "Percival"],
    9: ["Mordred", "Morgana", "Loyal Servant", "Loyal Servant", "Loyal Servant", "Loyal Servant", "Minion of Mordred", "Merlin", "Percival"],
    10: ["Mordred", "Morgana", "Loyal Servant", "Loyal Servant", "Loyal Servant", "Loyal Servant", "Minion of Mordred", "Minion of Mordred", "Merlin", "Percival"]
}

num_players = int(input("Enter the number of players (5-10): "))
if num_players < 5 or num_players > 10:
    print("Invalid number of players. Please enter a number between 5 and 10.")
else:
    player_characters = random.sample(characters[num_players], num_players)
    print("Player characters:")
    for i in range(num_players):
        print(f"Player {i+1}: {player_characters[i]}")
