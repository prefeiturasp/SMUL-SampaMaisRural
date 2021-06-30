module History
  class Change
    attr_reader :field, :old_value, :new_value
    ExcludeFields = %i[updated_at type shareable_type seals_group_id shareable_id id created_at]

    def initialize field, old_value, new_value
      @field = field
      @old_value = normalize old_value
      @new_value = normalize new_value
    end

    def changed?
      old_value != new_value
    end

    def valid?
      changed? and ExcludeFields.exclude?(field.to_sym)
    end

    private

    def normalize value
      value.to_s.gsub("\n", '')
    end
  end
end
