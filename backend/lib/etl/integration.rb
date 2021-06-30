module Etl
  class Integration
    attr_reader :etl_filename

    def initialize etl_filename
      @etl_filename = etl_filename
    end

    def run
      script_content = IO.read(etl_filename)
      job_definition = Kiba.parse(script_content, etl_filename)
      Kiba.run(job_definition)
    end
  end
end
