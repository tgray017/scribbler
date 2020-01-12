class GamesController < ApplicationController
  include RoundsHelper

  def index
    games = Game.all
    render json: games
  end

  def show
    game = Game.find(params[:id])
    render json: game
  end

  def create
    game = Game.create

    round_1 = Round.new(game: game, round_number: 1, first_letter: first_letter, last_letter: last_letter)
    round_2 = Round.new(game: game, round_number: 2, first_letter: first_letter, last_letter: last_letter)
    round_3 = Round.new(game: game, round_number: 3, first_letter: first_letter, last_letter: last_letter)

    round_1.save
    round_2.save
    round_3.save

    render json: game, include: [:rounds]
  end
end
