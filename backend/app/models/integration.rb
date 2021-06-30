class Integration < ApplicationRecord
  extend ActiveRecord::Enum

  enum status: %i[started done error]
end
