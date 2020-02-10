class GuessedWordsController < ApplicationController
  require 'open-uri'
  require 'net/http'
  require 'json'

  include WordsHelper

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

    def get_word(word)
      uri = URI("http://dictionaryapi.com/api/v3/references/collegiate/json/#{word}?key=#{ENV['DICTIONARY_API_KEY']}")
      response = JSON.parse(Net::HTTP.get(uri))
      if valid_word?(response)
        definitions = get_definitions(response, word)
        definitions if definitions.keys.size > 0 #? definitions : false
      end
    end

    def valid_word?(response)
      response.first.instance_of? Hash
    end

    def get_definitions(response, word)
      definitions = {}

      valid_definitions = response.select {|definition| definition["fl"] != "abbreviation" && definition["fl"] != "biographical name" && definition["hwi"]["hw"].gsub("\*","") == word}

      valid_definitions.collect do |definition|
        unless definitions.keys.include?(definition["fl"])
          definitions[definition["fl"]] = []
        end
      end

      valid_definitions.collect do |definition|
        definition["shortdef"].collect do |short_def|
          definitions[definition["fl"]].push(short_def)
        end
      end

      definitions
    end

end
