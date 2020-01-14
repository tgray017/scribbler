class Round < ApplicationRecord
  belongs_to :game
  has_many :guessed_words

end
