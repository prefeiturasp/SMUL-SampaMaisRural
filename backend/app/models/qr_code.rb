class QrCode
  attr_reader :code, :file, :extension

  def initialize url, extension = :svg
    @extension = extension
    @file = Tempfile.new([SecureRandom.hex(10), '.svg'])
    @code = RQRCode::QRCode.new(url)
  end

  def as_svg
    svg = code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      standalone: true
    ).to_s
    file.write(svg)
    file
  end

  def as_png
    code.as_png(
      bit_depth: 1,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: 'black',
      file: file,
      fill: 'white',
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 120
    ).to_s
    file
  end

  def generate
    begin
      yield send("as_#{extension}")
    ensure
      file.close
      file.unlink
    end
  end
end
