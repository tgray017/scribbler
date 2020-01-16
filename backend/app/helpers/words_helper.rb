module WordsHelper

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
end
