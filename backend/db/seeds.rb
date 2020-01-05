player_1 = Player.create(name: "Tom")
player_2 = Player.create(name: "Victoria")
game = Game.create
game_player_1 = GamePlayer.create(game: game, player: player_1, player_number: 1)
game_player_2 = GamePlayer.create(game: game, player: player_2, player_number: 2)


round_1 = Round.create(game: game, round_number: 1, rules: "Words that start with A and end in L")
round_2 = Round.create(game: game, round_number: 2, rules: "Words with double O's")
word_1 = GuessedWord.create(round: round_1, player: player_1, word: "Awful", points: 5)
word_2 = GuessedWord.create(round: round_1, player: player_1, word: "Animal", points: 7)
word_3 = GuessedWord.create(round: round_1, player: player_2, word: "Artisinal", points: 12)
word_4 = GuessedWord.create(round: round_2, player: player_1, word: "Choose", points: 4)
word_5 = GuessedWord.create(round: round_2, player: player_2, word: "Booze", points: 9)
word_6 = GuessedWord.create(round: round_2, player: player_2, word: "Loose", points: 3)
