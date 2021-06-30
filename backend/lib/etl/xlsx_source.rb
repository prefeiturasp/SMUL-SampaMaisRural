class XlsxSource < Struct.new(:filename, :origin, :template)
  def each
    data_to_import = Roo::Excelx.new(filename, extension: :xlsx)
    data_to_import.each_with_pagename do |name, sheet|
      next unless name == ENV['SHEET']
      sheet.each(template).each_with_index do |row, index|
        next if index.zero?
        yield(row.merge(source: origin).symbolize_keys)
      end
    end
  end
end
