class HttpSource
  attr_reader :client, :integration

  def initialize options, integration
    @client = HttpClient.new(options)
    @integration = integration
  end

  def each
    begin
      while client.request
        client.data.each do |resource_data|
          yield resource_data.symbolize_keys
        end
      end
    rescue IntegrationError => e
      integration.error!
      nil
    end
  end
end
