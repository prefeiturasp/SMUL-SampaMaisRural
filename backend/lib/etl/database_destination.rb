class DatabaseDestination
  def initialize(logger)
    @logger = logger
  end

  def write(row)
    ImportService.new(@logger).import row
  end
end
