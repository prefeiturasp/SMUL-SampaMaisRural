class HashSerializer
  def self.dump(hash)
    hash
  end

  def self.load(hash)
    return YAML.load(hash) if hash.is_a?(String) # TODO remove this temp
    (hash || {}).with_indifferent_access
  end
end
