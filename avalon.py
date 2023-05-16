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
votecount = 1
quest_scores = [None] * 5
# Print out player order
print("Player order: ", player_order)

quest_num = 1
while quest_num <= 5 and quest_scores.count("Fail") <3 and quest_scores.count("Succeed") < 3:
    while votecount <4:
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
        questvotes={}
        for player in player_order:
            qvote = input(f"{player}, approve or deny the quest? (A/D): ")
            if qvote.lower() == "a" or qvote.lower() == "approve":
                questvotes[player] = "approve"
            elif qvote.lower() == "d" or qvote.lower() == "deny":
                questvotes[player] = "deny"
            else:
                print("Invalid vote. Please enter 'A' or 'D'.")

        approve_count = sum(1 for vote in questvotes.values() if vote == "approve")
        deny_count = sum(1 for vote in questvotes.values() if vote == "deny")

        if approve_count == deny_count or deny_count > approve_count:
            print("Vote ties or more denies. Next player in order chooses a quest.")
        else:
            print("Vote succeeds. Continuing with the quest.")
            votecount = 5
            continue
        votecount += 1


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
    quest_num = quest_num + 1
    votecount = 1

