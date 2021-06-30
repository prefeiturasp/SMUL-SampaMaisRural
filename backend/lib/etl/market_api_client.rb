class MarketApiClient
  def get_images parent
    res = get("/media?parent=#{ parent }")
    res.code == '200' ? JSON.parse(res.body) : []
  end

  def get_markets
    markets = []
    page = 1
    res = nil
    while res.nil? || res.code == '200' do
      res = get("/feiras?page=#{page}&per_page=100")
      markets += JSON.parse(res.body) if res.code == '200'
      page += 1
    end
    markets
  end

  private

  def get path
    uri = URI.parse(Rails.application.secrets.idec_api_url + path)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    res = http.request(request)
  end
end
