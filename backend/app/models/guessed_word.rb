class GuessedWord < ApplicationRecord
  belongs_to :round

  serialize :definition

  validates :word, presence: true
  validates :word, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validate :must_follow_rule
  validate :must_be_unique_for_round
  validate :must_be_at_least_three_letters


  private

    def must_follow_rule
      arr = word.split('')
      unless arr.first == round.first_letter && arr.last == round.last_letter
        errors.add(:word, "must start with '#{round.first_letter.upcase}' and end with '#{round.last_letter.upcase}'")
      end
    end

    def must_be_unique_for_round
      if round.guessed_words.find {|guessed_word| guessed_word.word == word}
        errors.add(:word, "must be unique for the current round")
      end
    end

    def must_be_at_least_three_letters
      if word.length < 3
        errors.add(:word, "must be at least three letters")
      end
    end

end
