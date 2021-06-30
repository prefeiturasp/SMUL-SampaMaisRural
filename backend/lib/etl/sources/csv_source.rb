require 'csv'

class CsvSource < Struct.new(:filename, :opts)
  def each
    default_opts = { headers: true, header_converters: :symbol }
    CSV.open(filename, default_opts.merge(opts.to_h)) do |csv|
      csv.each do |row|
        yield(row.to_hash)
      end
    end
  end
end
