module CustomFile
  class SVG
    attr_reader :input, :file

    def initialize file_path
      @input = file_path
      @file = Tempfile.new([SecureRandom.uuid, '.svg'])
    end

    def change_content from:, to:
      @file.write File.read(@input).gsub(from, to)
    end

    def path
      @file.path
    end
  end
end
