module AdjustTextWidthMethods
  def adjust_text_to_width text:, font:, max_width:
    width = calculate_width_from_text(text, font)

    if width.to_i <= max_width
      text
    else
      # remove last char and tray again
      adjust_text_to_width(text: "#{text.gsub('...', '').chop}...",
                           font: font,
                           max_width: max_width)
    end
  end

  private

  def calculate_width_from_text text, font
    convert_cmd = "convert  -debug annotate -font #{font}  xc: -pointsize 24  -annotate 0 '#{text}' null: 2>&1 |  grep Metrics:"
    stdout, stderr, status = Open3.capture3(convert_cmd)
    $1 if stdout =~ /width: (\d+);/
  end
end
