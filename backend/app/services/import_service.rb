class ImportService
  attr_reader :data

  def initialize logger
    @logger = logger
  end

  def import data
    category_name = data.delete(:category_name)
    category = Category.where("lower(name) = ?", category_name.downcase).first_or_create(name: category_name)
    partner = Partner.find_or_initialize_by(api_id: data[:api_id], type: data[:type].to_s)
    partner.update_via_integration = true unless partner.persisted?
    if partner.persisted?
      data.delete(:subcategory_list)
    else
      partner.update_via_integration = %w[idec upa geosampa].include?(data[:source].to_s)
    end
    return unless partner.update_via_integration?
    partner.category = category
    partner.phones.destroy_all
    if partner.update(data)
      @logger.info("partner #{partner.api_id} just saved!!!")
    else
      @logger.error("partner #{data[:api_id]} not saved")
      @logger.error("error message: #{partner.errors.messages}")
    end
  end
end
