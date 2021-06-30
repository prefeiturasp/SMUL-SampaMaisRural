class Query
  attr_reader :group_name, :fields

  def initialize group_name: nil, fields: nil
    @group_name = group_name
    @fields = fields || []
  end

  def add_field field
    fields << field if field.for?(group_name)
  end

  def to_query
    query = {}
    query.merge!(subcategory_list: group_name) if group_name
    fields.map { |field| query.merge!(field.to_query) }
  end
end

