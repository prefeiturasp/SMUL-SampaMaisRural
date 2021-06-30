module Certifiable
  extend ActiveSupport::Concern

  def certificate_list= values
    self.certificates = Certificate.import(values)
  end

  def certificate_list
    certificates.pluck(:name)
  end
end
