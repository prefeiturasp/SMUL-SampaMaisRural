class Api::Config
  @@data = YAML.load_file('config/api/data.yml').deep_symbolize_keys

  def self.data
    @@data
  end
end

