module History
  class VersionParser
    attr_reader :fields

    def initialize changes
      changes.each do |field, values|
        add_field(field, values)
      end
    end

    def changed_fields
      fields.map(&:field)
    end

    private

    def add_field field_name, values
      @fields ||= []
      old, new = values[0], values[1]
      if new.is_a?(Hash) # serialized field?
        new.map { |field, value| add_field(field, [old[field], value]) }
      else
        field = Change.new(field_name, old, new)
        @fields << field if field.valid?
      end
    end
  end
end
