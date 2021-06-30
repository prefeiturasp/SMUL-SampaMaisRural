class AttachmentMetadata
  EXTENSION_REGEX = /\.[0-9a-z]+$/
  attr_accessor :filename

  def initialize filename
    self.filename = filename.gsub(EXTENSION_REGEX, '')
  end

  def author
    name = filename.split('-')
    name[1].strip if name.count > 1
  end

  def position
    # > 100 é to avoid
    # ActiveModel::RangeError: is out of range for ActiveModel::Type::Integer with limit 4 bytes
    filename.to_i unless filename.to_i.zero? or filename.to_i > 100
  end
end
