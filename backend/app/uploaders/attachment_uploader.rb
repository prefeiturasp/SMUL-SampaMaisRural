class AttachmentUploader < ImageUploader
  version :site do
    process :resize_to_fit => [996, 636]
    process :quality => 75
    process :author!
  end

  def author!
    author_name = AttachmentMetadata.new(file.filename).author
    return if author_name.blank?
    manipulate! do |img|
      img.combine_options do |cmd|
        cmd.gravity 'South'
        cmd.draw "text 10, 10 'foto tirada por #{author_name}'"
        cmd.font 'Lato Bold'
        cmd.pointsize 24
        cmd.fill 'white'
      end
      img
    end
  end

end
