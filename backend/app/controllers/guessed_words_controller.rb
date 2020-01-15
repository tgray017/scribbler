class GuessedWordsController < ApplicationController

  require 'open-uri'
  require 'net/http'
  require 'json'

  def index
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

    if word.valid?
      if get_word(guessed_word_params[:word])
        word.save
        render json: word, status: :ok
      else
        render json: { errors: word.errors.full_messages }, status: :bad_request
      end
    else
      render json: { errors: word.errors.full_messages }, status: :bad_request
    end
  end

  private

    def guessed_word_params
      params.require(:guessed_word).permit(:word, :points)
    end

    def get_word(word)
      uri = URI("http://dictionaryapi.com/api/v3/references/collegiate/json/#{word}?key=#{ENV['DICTIONARY_API_KEY']}")
      response = JSON.parse(Net::HTTP.get(uri))
      response.first["meta"] ? true : false
    end

end
