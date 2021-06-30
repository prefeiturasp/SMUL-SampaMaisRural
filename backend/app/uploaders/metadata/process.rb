module Metadata
  class Process
    attr_reader :config, :value

    def initialize config, value
      @config = OpenStruct.new(config)
      @config.draw = format(config[:draw], value)
    end

    def call cmd
      config.to_h.each do |property, value|
        cmd.public_send(property, value)
      end
    end
  end
end
