class GuessedWordsController < ApplicationController

  def index
    #binding.pry
    round = Round.find(params[:round_id])
    words = round.guessed_words
    render json: words
  end

  def show
    word = GuessedWord.find(params[:id])
    render json: word
  end

  def create
    word = GuessedWord.new(guessed_word_params)
    word.round = Round.find(params[:round_id])

    if word.save
      render json: word
    else
      render json: word.errors.full_messages
    end
    #binding.pry
  end

  private

    def guessed_word_params
      params.require(:guessed_word).permit(:word, :points)
    end

end
