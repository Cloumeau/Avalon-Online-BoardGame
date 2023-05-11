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

# Set up player order and quest sizes based on number of players
player_order = [i+1 for i in range(num_players)]
random.shuffle(player_order)
quest_sizes = {5: [2, 3, 2, 3, 3],
               6: [2, 3, 4, 3, 4],
               7: [2, 3, 3, 4, 4],
               8: [3, 4, 4, 5, 5],
               9: [3, 4, 4, 5, 5],
               10: [3, 4, 4, 5, 5]}

# Initialize quest scores as an empty list
quest_scores = []
quest_scores = [None] * 5
# Print out player order
print("Player order: ", player_order)

quest_num = 1
num_players_on_quest = quest_sizes[num_players][quest_num-1]
print(f"\nQuest {quest_num}: Select {num_players_on_quest} players for the quest.")

players_on_quest = []
for i in range(num_players_on_quest):
    valid_choice = False
    while not valid_choice:
        player_choice = int(input(f"Choose your {i+1} player: "))
        if player_choice not in players_on_quest and player_choice in player_order:
            players_on_quest.append(player_choice)
            valid_choice = True
        else:
            print("Invalid choice. Please choose a different player.")

print("Players on the quest: ", players_on_quest)

votes = []
for i in range(num_players_on_quest):
    valid_choice = False
    while not valid_choice:
        vote_choice = input(f"Player {players_on_quest[i]}, vote succeed or fail: ")
        if vote_choice.lower() == "succeed" or vote_choice.lower() == "fail":
            votes.append(vote_choice.lower())
            valid_choice = True
        else:
            print("Invalid choice. Please choose succeed or fail.")

num_fails = votes.count("fail")
if num_fails == 0:
    print("Quest succeeded!")
    quest_result = "Succeed"
else:
    print("Quest failed!")
    quest_result = "Fail"
    
quest_scores[quest_num-1] = quest_result

print("Current quest scores:")
for i, score in enumerate(quest_scores):
    print(f"Quest {i+1}: {score}")
