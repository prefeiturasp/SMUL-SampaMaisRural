class RegularSeal < Seal
  mount_uploader :file, RegularSealUploader
  has_paper_trail on: [:create, :update]

  after_commit :generate_file, if: :generate_file?

  private

  def generate_file?
    (saved_changes.keys & %w[detail expires_at shareable_id description connected_partner_id]).any?
  end

  def generate_file
    RegularSealFileJob.perform_later(self)
  end
end
