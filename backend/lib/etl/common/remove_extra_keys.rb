class RemoveExtraKeys
  attr_reader :template

  def initialize template
    @template = HashWithIndifferentAccess.new template
  end

  def process row
    row.each_key do |attribute|
      unless template.has_key? attribute.to_sym
        row.delete(attribute)
      end
    end
  end
end
