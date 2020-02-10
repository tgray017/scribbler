class GuessedWordsController < ApplicationController

  include GuessedWordsHelper

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
    word_record = GuessedWord.new(guessed_word_params)
    word_record.round = Round.find(params[:round_id])

    if word_record.valid?
      if word_record.definition = get_word(word_record.word)
        word_record.points = score(word_record.word)
        word_record.save
        render json: word_record, status: :ok
      else
        render json: { errors: "Word doesn't exist".to_json }, status: :bad_request
      end
    else
      render json: { errors: word_record.errors.full_messages }, status: :bad_request
    end
  end

  private

    def guessed_word_params
      params.require(:guessed_word).permit(:word)
    end

end
