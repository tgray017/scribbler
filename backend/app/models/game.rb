class Game < ApplicationRecord
  has_many :rounds
  has_many :game_players
  has_one :player_1, -> { where(:player_number => 1) }, class_name: 'GamePlayer'
  has_one :player_2, -> { where(:player_number => 2) }, class_name: 'GamePlayer'
end
