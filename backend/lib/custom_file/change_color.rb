module SVG
  class File
    attr_reader :input, :file

    def initialize file_path
      @input = file
      @file = Tempfile.new([SecureRandom.uuid, '.svg'])
    end

    def change_color from:, to:
      File.read(@input).gsub(from, to)
    end
  end
end
