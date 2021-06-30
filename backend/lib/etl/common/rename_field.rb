class RenameField < Struct.new(:from, :to, keyword_init: true)
  def process(row)
    row[to.to_sym] = row.delete(from.to_sym)
    row
  end
end
