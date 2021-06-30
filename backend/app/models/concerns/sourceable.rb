module Sourceable
  extend ActiveSupport::Concern
  included do
    enum source: %i[idec upa tourism geosampa sprural]
  end
end
