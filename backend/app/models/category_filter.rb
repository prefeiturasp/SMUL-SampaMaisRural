class CategoryFilter
  attr_reader :category, :count

  def initialize category, count
    @category = category
    @count = count
  end

  def filters
    @filters ||= []
  end

  def name
    category
  end

  def label
    I18n.t('activerecord.models')[category.to_sym]
  end
end
