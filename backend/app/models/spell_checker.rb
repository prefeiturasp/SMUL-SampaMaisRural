class SpellChecker

  def correct input
    value = dictionary[normalize(input)]
    value || input
  end

  private

  def dictionary
    @dictionary ||= YAML.load_file("config/dictionary.yml")
  end

  def normalize input
    input.gsub(' ',  '').parameterize.downcase
  end
end
