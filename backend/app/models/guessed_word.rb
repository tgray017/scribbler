class GuessedWord < ApplicationRecord
  belongs_to :round
  belongs_to :player
end
