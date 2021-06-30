class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  private

  def attributes_to_params attrs
    data = Hash.new
    attrs.map {|attr| attr.try(:keys) || attr }.flatten
      .map { |attr| data.merge!(attr => self.send(attr)) }
    data
  end
end
