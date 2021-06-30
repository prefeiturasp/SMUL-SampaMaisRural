require 'net/http'

class IntegrationError < StandardError
  def initialize(msg="error getting data", exception_type="custom")
    @exception_type = exception_type
    super(msg)
  end
end

class HttpClient < OpenStruct
  def request
    uri = URI.parse(url)
    https = Net::HTTP.new(uri.host,uri.port)
    https.use_ssl = true
    req = "Net::HTTP::#{http_method.camelcase}".constantize.new(uri.path, initheader = headers )
    self.page = response ? response['current_page'] + 1 : 1
    req.set_form_data(page: page)
    res = https.request(req)
    raise IntegrationError if res.code != '200'
    self.response = JSON.parse(res.body)
    self.data = response['data']
    data.present?
  end
end
