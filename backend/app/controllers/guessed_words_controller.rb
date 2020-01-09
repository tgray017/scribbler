class GuessedWordsController < ApplicationController

  def index
    words = GuessedWord.all
    render json: words
  end

  def show
    word = GuessedWord.find(params[:id])
    render json: word
  end

  

end
