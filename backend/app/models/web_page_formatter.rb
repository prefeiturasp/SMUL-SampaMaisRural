class WebPageFormatter
  class << self
    def call value
      return if value.blank?
      valid_url?(value) ? value : format(value)
    end

    private

    def valid_url? value
      value.include?('http://') or value.include?('https://')
    end

    def format value
      'http://' + value
    end
  end
end
