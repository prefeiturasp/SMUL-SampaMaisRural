class StatusDefiner
  def process row
    row[:status] = :pending unless row[:_lat] && row[:_lon]
    if row[:source] == 'sprural'
      row[:status] = row[:is_public].to_s.downcase == 'sim' ? Partner.statuses[:approved] : Partner.statuses[:pending]
    else
      row[:status] = Partner.statuses[:approved]
    end
    row
  end
end
