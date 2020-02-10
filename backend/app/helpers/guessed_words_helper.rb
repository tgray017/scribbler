module GuessedWordsHelper

  def letter_points
    {
      "a"=>1, "e"=>1, "i"=>1, "o"=>1, "u"=>1, "l"=>1, "n"=>1, "s"=>1, "t"=>1, "r"=>1, "d"=>2, "g"=>2, "b"=>3, "c"=>3, "m"=>3, "p"=>3, "f"=>4, "h"=>4, "v"=>4, "w"=>4, "y"=>4, "k"=>5, "j"=>8, "x"=>8, "q"=>10, "z"=>10
    }
  end

  def score(word)
    arr = word.split('')
    points = arr.collect {|l| letter_points["#{l}"]}

    # replacing first and last letter points with 1 since those are given
    points[0] = 1
    points[-1] = 1

    points.reduce {|sum, cv| sum + cv}
  end

  ### API ###

  def get_word(word)
    uri = URI("http://dictionaryapi.com/api/v3/references/collegiate/json/#{word}?key=#{ENV['DICTIONARY_API_KEY']}")
    response = JSON.parse(Net::HTTP.get(uri))
    if valid_word?(response)
      definitions = get_definitions(response, word)
      definitions if definitions.keys.size > 0
    end
  end

  def valid_word?(response)
    response.first.instance_of? Hash
  end

  def get_definitions(response, word)
    definitions = {}

    # grab all definitions for the word that aren't abbreviations, names, and are for the exact word that the user submitted (i.e. not a stem off a base word)
    valid_definitions = response.select {|definition| definition["fl"] != "abbreviation" && definition["fl"] != "biographical name" && definition["hwi"]["hw"].gsub("\*","") == word}

    # grab the parts of speech in the valid definitions (e.g. noun, verb, etc...)
    valid_definitions.collect do |definition|
      unless definitions.keys.include?(definition["fl"])
        definitions[definition["fl"]] = []
      end
    end

    # hash values are an array of each part of speech (could have multiple noun or verb definitions)
    valid_definitions.collect do |definition|
      definition["shortdef"].collect do |short_def|
        definitions[definition["fl"]].push(short_def)
      end
    end

    definitions
  end
end
