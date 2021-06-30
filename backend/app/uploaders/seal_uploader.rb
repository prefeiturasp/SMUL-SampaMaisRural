class SealUploader < ImageUploader
  process :add_metadata!
  include AdjustTextWidthMethods

  def add_metadata!
    return unless model.shareable.kind_of?(Partner)
    manipulate! do |img|
      compose img
      img
    end
  end

  def compose img
    # TODO extract to classes
    # this method generates seal for partner
    # and have a lot of repeated code
    shareable =  model.shareable
    # begin
    subcategories_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    fonts_path = "#{Rails.root}/public/fonts/"
    subcategories = shareable.public_subcategory_list.map {|line| adjust_text_to_width(text: line, font: "#{fonts_path}/Lato-Bold.ttf", max_width: 380) }

    # subcategories
    MiniMagick::Tool::Convert.new do |i|
      i.size "1592x324"
      i.gravity "center"
      i.xc "transparent"
      i.fill seal_colors[shareable.type.downcase.to_sym]
      i.pointSize 92
      i.interline_spacing (-10)
      i.font "#{fonts_path}/Lato-Bold.ttf"
      i.draw "text 0,0 '#{subcategories.join("\n")}'"
      i << subcategories_path
    end

    # SUBCATEGORIES
    first_image  = MiniMagick::Image.new shareable.category.seal.file.path
    second_image = MiniMagick::Image.new(subcategories_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "North"
      c.geometry "+0+540"
    end
    result.write img.path

    # NAME
    name_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    name_text = adjust_text_to_width(text: shareable.name.upcase, font: "#{fonts_path}/Lato-Bold.ttf", max_width: 1300)

    MiniMagick::Tool::Convert.new do |i|
      i.size "2000x308"
      i.gravity "center"
      i.fill '#000'
      i.pointSize 96
      i.interline_spacing (-20)
      i.background "none"
      i.font "#{fonts_path}/Lato-Bold.ttf"
      i << "caption: #{name_text}"
      i << name_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(name_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "Center"
      c.geometry "+0+300"
    end
    result.write img.path

    # DISTRICT
    district_path = Tempfile.new([SecureRandom.uuid, '.png']).path
    district_text = adjust_text_to_width(text: shareable.district, font: "#{fonts_path}/Manrope-VariableFont_wght.ttf", max_width: 500)

    MiniMagick::Tool::Convert.new do |i|
      i.size "1600x400"
      i.pointSize 72
      i.gravity 'South'
      i.xc "transparent"
      i.fill '#000'
      i.font "#{Rails.root}/public/fonts/Manrope-VariableFont_wght.ttf"
      i.draw "text 0,0 '#{district_text}'"
      i << district_path
    end

    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(district_path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity "South"
      c.geometry "+0+610"
    end
    result.write img.path


    # QRCODE
    first_image  = MiniMagick::Image.new(img.path)
    second_image = MiniMagick::Image.new(model.qr_code.file.path)
    result = first_image.composite(second_image) do |c|
      c.compose "Over"    # OverCompositeOp
      c.gravity 'South'
      c.geometry "316x316+0+240"
    end
    result.write img.path
  end

  private

  def seal_colors
    { upa: '#3C983B',
      market: '#E8374D',
      tourism: '#F59F59',
      initiative: '#26AEB6'
    }
  end
end
