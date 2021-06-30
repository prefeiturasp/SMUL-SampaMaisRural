module StatusEnum
  extend ActiveSupport::Concern

  included do
    enum status: %i[pending approved refused]
  end
end
