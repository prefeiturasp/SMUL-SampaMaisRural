module Translatable
  include ActiveSupport::Concern

  def translate input
    checker.correct(input)
  end

  def translate_list values
    list = values.is_a?(String) ? values.split(/;|,/) : values
    list.map { |item| translate(item) }
  end

  def checker
    @spellChecker ||= SpellChecker.new
  end
end
