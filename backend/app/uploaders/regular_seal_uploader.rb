class RegularSealUploader < ImageUploader
  process :add_metadata!

  include AdjustTextWidthMethods

  def add_metadata!
    return unless model.shareable.kind_of?(Partner)
    manipulate! do |img|
      compose img
      img
    end
  end

  private

  def compose img
    img.resize("2400x2460")
    shareable = model.shareable
    connected_partner = model.connected_partner
    detail = model.detail

    subcategories_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    fonts_path = "#{Rails.root}/public/fonts/"
    name_text = shareable.name.upcase
    font_bold =  "#{Rails.root}/public/fonts/Manrope/static/Manrope-ExtraBold.ttf"
    medium_font = "#{Rails.root}/public/fonts/Manrope/static/Manrope-Medium.ttf"

    name_label = adjust_text_to_width(text: name_text, font: font_bold, max_width: 775)

    # NAME
    name_path = Tempfile.new([SecureRandom.uuid, '.png']).path

    MiniMagick::Tool::Convert.new do |i|
      i.size "1596x200"
      i.gravity "Center"
      i.fill '#3E973D'
      i.font font_bold
      i.pointSize 96
      i.interline_spacing (-20)
      i.background "none"
      i << "caption: #{name_label} "
      i << name_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(name_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+1000"
    end
    result.write img.path

    # detail
    district_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    detail_label = adjust_text_to_width(text: detail, font: medium_font, max_width: 484)

    MiniMagick::Tool::Convert.new do |i|
      i.size "1600x150"
      i.pointSize 64
      i.gravity "Center"
      i.xc "transparent"
      i.fill '#3E973D'
      i.font medium_font
      i.draw "text 0,0 '#{detail_label}'"
      i << district_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(district_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+1200"
    end
    result.write img.path
    #
    # este estabelecimento
    district_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    font_bold =  "#{Rails.root}/public/fonts/Manrope/static/Manrope-ExtraBold.ttf"
    connected_text = connected_partner&.name&.upcase || "Este estabelecimento"
    connected_label = adjust_text_to_width(text: connected_text, font: font_bold, max_width: 408)

    MiniMagick::Tool::Convert.new do |i|
      i.size "1600x175"
      i.pointSize 96
      i.gravity 'Center'
      i.xc "transparent"
      i.fill '#28ADB6'
      i.font font_bold
      i.draw "text 0,0 '#{connected_label}'"
      i << district_path
    end
    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(district_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+1425"
    end
    result.write img.path
    # incentivo
    district_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    font_bold =  "#{Rails.root}/public/fonts/Manrope/static/Manrope-ExtraBold.ttf"
    connected_text = "incentiva a agricultura local"
    connected_label = adjust_text_to_width(text: connected_text, font: font_bold, max_width: 500)
    MiniMagick::Tool::Convert.new do |i|
      i.size "1600x120"
      i.pointSize 96
      i.gravity 'Center'
      i.xc "transparent"
      i.fill '#28ADB6'
      i.font font_bold
      i.draw "text 0,0 '#{connected_label}'"
      i << district_path
    end
    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(district_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+1600"
    end
    result.write img.path

    # bar
    # este estabelecimento
    district_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    district_text = adjust_text_to_width(text: shareable.district, font: "#{fonts_path}/Manrope-VariableFont_wght.ttf", max_width: 2000)

    MiniMagick::Tool::Convert.new do |i|
      i.size "1200x10"
      i.xc "#275B27"
      i << district_path
    end
    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(district_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+1370"
    end
    result.write img.path

    #QRCODE
    first_image  = MiniMagick::Image.new(img.path)
    qr_code = CustomFile::SVG.new(model.qr_code.file.path)
    qr_code.change_content(from: '#000', to: '#295C29')
    second_image = MiniMagick::Image.new(qr_code.file.path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity 'North'
      c.geometry "316x316+0+1745"
    end
    result.write img.path

    # logo
    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new("public/logosdds.png")
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity 'North'
      c.geometry "925x325+0+20"
    end
    result.write img.path


    # validate
    name_path = Tempfile.new([SecureRandom.uuid, '.png']).path

    MiniMagick::Tool::Convert.new do |i|
      i.size "399x86"
      i.gravity "center"
      i.fill '#295C29'
      i.pointSize 64
      i.background "none"
      i.font font_bold
      i << "caption: VAL #{model.expires_at.strftime("%m/%y")}"
      i << name_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(name_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+2059"
    end
    result.write img.path
    #
    # validate
    name_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    # name_text = adjust_text_to_width(text: shareable.name.upcase, font: "#{fonts_path}/Lato-Bold.ttf", max_width: 1300)

    MiniMagick::Tool::Convert.new do |i|
      i.size "401x57"
      i.gravity "center"
      i.fill '#295C29'
      i.pointSize 50
      i.interline_spacing (-20)
      i.background "none"
      i.font "#{Rails.root}/public/fonts/Manrope/static/Manrope-Medium.ttf"
      i << "caption: ID #{model.id}"
      i << name_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(name_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+2145"
    end
    result.write img.path
    #
    # site
    name_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    # name_text = adjust_text_to_width(text: shareable.name.upcase, font: "#{fonts_path}/Lato-Bold.ttf", max_width: 1300)

    MiniMagick::Tool::Convert.new do |i|
      i.size "1996x200"
      i.gravity "center"
      i.fill '#295C29'
      i.pointSize 70
      i.interline_spacing (-20)
      i.background "none"
      i.font "#{Rails.root}/public/fonts/Manrope/static/Manrope-Medium.ttf"
      i.kerning "10"
      i << "caption: sampamaisrural.prefeitura.sp.gov.br"
      i << name_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(name_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+2200"
    end
    result.write img.path
  end
end
