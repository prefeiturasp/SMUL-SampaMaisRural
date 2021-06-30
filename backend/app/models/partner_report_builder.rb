class PartnerReportBuilder
  attr_accessor :partners, :output

  def initialize partners
    self.partners = partners
    @output = Hash.new
  end

  def add field, method, value = nil
    add_value(field, extract(method, value))
  end

  def add_value field, value
    @output.merge!(field => value)
  end

  def extract(field, value)
    return partners.select { |partner| partner.send(field).present? }.count unless value
    partners.select { |partner| partner.send(field).map {|v| v.to_s.downcase}
      .include?(value.downcase) }.count
  end

  def data
    @output[:all] ||= partners.count
    @output
  end
end
