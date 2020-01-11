class GuessedWordsController < ApplicationController

  def index
    words = GuessedWord.all
    render json: words
  end

  def show
    word = GuessedWord.find(params[:id])
    render json: word
  end

  def create
    word = GuessedWord.new(guessed_word_params)
    ##### added for testing
      word.round = Round.first
    #####
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
