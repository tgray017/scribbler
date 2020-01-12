module RoundsHelper
  FIRST_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'w']
  LAST_LETTERS = ['a', 'b', 'd', 'e', 'l', 'm', 'n', 'o', 'r', 's', 't', 'w', 'y']

  def first_letter
    FIRST_LETTERS.sample
  end

  def last_letter
    LAST_LETTERS.sample
  end
end
