module Download
  class Template
    attr_accessor :name, :publishable

    def initialize name, publishable
      self.name = name
      self.publishable = publishable
    end

    def headers
      attributes.map { |attr| I18n.t('source_bases.partner')[attr.to_sym] }
    end

    def attributes
      @attributes ||= YAML.load_file("config/download/#{name}.yml")["attributes"]
    end
  end
end
