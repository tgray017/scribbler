game = Game.create


round_1 = Round.create(game: game, round_number: 1, first_letter: "a", last_letter: "l", rules: "Words that start with A and end in L")
round_2 = Round.create(game: game, round_number: 2, first_letter: "b", last_letter: "e", rules: "Words that start with B and end in E")
word_1 = GuessedWord.create(round: round_1, word: "Awful", points: 5)
word_2 = GuessedWord.create(round: round_1, word: "Animal", points: 7)
word_3 = GuessedWord.create(round: round_1, word: "Artisinal", points: 12)
word_4 = GuessedWord.create(round: round_2, word: "Choose", points: 4)
word_5 = GuessedWord.create(round: round_2, word: "Booze", points: 9)
word_6 = GuessedWord.create(round: round_2, word: "Loose", points: 3)
