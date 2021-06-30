module CustomImageProcessing
  class LineTextProcessing
    def self.process line_text
      if line_text.valid?
        line_text.text
      else
        line_text.chop!
        process line_text
      end
    end
  end
end
