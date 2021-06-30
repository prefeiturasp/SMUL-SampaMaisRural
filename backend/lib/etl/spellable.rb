module Spellable
  def translate input
    checker.correct(input)
  end

  def translate_list list
    list.to_s
      .split(',').map { |list| translate(list) }.join(',')
  end

  def checker
    @spellChecker ||= SpellChecker.new
  end
end
