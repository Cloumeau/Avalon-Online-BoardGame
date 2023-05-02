# define the character abilities and their descriptions
character_abilities = {
    "Merlin": "Knows the identities of all the evil players besides Mordred, but must keep this hidden from the other players.",
    "Minion of Mordred": "Can assassinate Merlin at the end of the game if the evil team loses & is known by Merlin at the start of the game",
    "Percival": "Knows the identities of Merlin and Morgana, but not which is which.",
    "Morgana": "Appears as Merlin to Percival, but is evil. Is known by Merlin",
    "Mordred": "Does not reveal themselves to Merlin at the beginning of the game.",
    "Loyal Servant": "No abilities"
}

# prompt the user for their character card, number of players, and order in the game
character = input("What character card do you have? ")
num_players = int(input("How many players are in the game? "))
player_order = int(input("What order are you in the game? "))

# give advice based on the character card and number of players
if character == "Merlin":
    print("As Merlin, your main goal is to identify the evil players without revealing your own identity. Be careful not to give away too much information, but also try to steer the group towards identifying the evil players.")
    if num_players == 5:
        print("Because you know the minion, Your job is to determine out of the remaining 3 players which is Mordred and convince the other two good players that the Minion and Mordred are bad while staying discreet. With this few players, The evil team has a 1/3 chance of guessing who you are.")
elif character == "Minion of Mordred":
    print("As the Minion of Mordred, your main goal is to get on a quest and fail and try to divert attention away from Mordred to protect hsi identity. Doing a Trust Play doesnt work as well as a minion because Merlin knows who you are. If you get on a quest, fail the quest. If you are on a quest with Mordred, you should fail and they should pass. Finally pay attention to who accuses you because Merlin knows your identity and you can win by guessing who it is.")
    if player_order == 1:
        print("As the first player, you can either fail with good players on the quest,trust play, or put Mordred on the quest. You should fail and Mordred can accuse you to establish trust with Merlin.")
elif character == "Percival":
    print("As Percival, you know the identities of Merlin and Morgana, but not which is which. Use this information to your advantage and try to guide the group towards identifying the evil players. As a last resort, you can reveal yourself as Percival and expose Morgana to help the good team.")
    if num_players >= 7:
        print("With this many players, there may be multiple players claiming to be Merlin or Morgana, so be prepared to do some extra detective work. Some may even pretend to be Percival, so be prepared!")
elif character == "Morgana":
    print("As Morgana, your goal is to appear as Merlin to Percival and steer the group towards identifying the wrong players. Try to create confusion and misdirect the group. You can even pretend to be Percival to cause confusion but that is hard to pull off.")
    if player_order == 1:
        print("As the first player, you can either fail with good players on the quest,trust play, or put Mordred on the quest. You should fail and Mordred can accuse you to establish trust with Merlin.")
elif character == "Mordred":
    print("As Mordred, your goal is to stay hidden and blend in with the other evil players. Don't reveal yourself to Merlin at the beginning of the game, and try to identify other evil players without giving yourself away. As Mordred, Trust Plays are essential to winning trust of the other players.")
    if player_order == 1:
        print("As the first player, you can either Trust Play and pass, or put the Minion on the quest. The minion will fail and you can accuse him to establish trust with Merlin.")
elif character == "Loyal Servant":
    print("You must rely on your deduction skills, observation of the other players' behavior, and ability to convince other players to trust you as a good player in order to win the game.")
else:
    print("Invalid character card. Please enter Merlin, Minion of Mordred, Percival, Morgana, Loyal Servant, or Mordred.")