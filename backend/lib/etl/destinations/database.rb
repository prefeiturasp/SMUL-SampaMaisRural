module Etl
  module Destinations
    class Database
      def initialize(logger)
        @logger = logger
      end

      def write(row)
        @logger.info("STARTING PROCESSING #{ row.inspect }")
        ImportService.new(@logger).import row
        @logger.info("END PROCESSING #{ row.inspect }")
      end
    end
  end
end
