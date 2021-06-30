Ransack.configure do |config|
  config.add_predicate 'jcont', arel_predicate: 'contains', formatter: proc { |v| JSON.parse(v) }
end
