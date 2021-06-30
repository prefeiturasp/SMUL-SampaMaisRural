module Subcategories
  extend ActiveSupport::Concern

  def subcategory_list= sub_names
    Subcategory.add_to(self, sub_names)
  end

  def add_subcategory_list= sub_names
    self.subcategory_list = subcategory_list + sub_names
  end

  def subcategory_ids= ids
    if ids.empty?
      errors.add(:subcategory_list, "can't be blank")
    else
      super(ids)
    end
  end

  def subcategory_list
    subcategories.pluck(:name)
  end

  def subcategory_names
    subcategory_list.join(',')
  end

  def public_subcategory_list
    subcategories.is_public.pluck(:name)
  end

  def farmer?
    farmer_with_contact? or farmer_without_contact?
  end

  def agriculture?
    kind_of?(Upa) and !farmer?
  end

  def farmer_with_contact?
    has_subcategory? I18n.t('subcategories.farmers_with_contact')
  end

  def farmer_without_contact?
    has_subcategory? I18n.t('subcategories.farmers_without_contact')
  end

  def rural_experience?
    has_subcategory? I18n.t('subcategories.rural_experience')
  end

  private

  def has_subcategory? sub_name
    subcategory_list.include? sub_name
  end
end
