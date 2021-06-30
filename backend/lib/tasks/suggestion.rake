namespace :suggestion do
  "deletes suggestions without associations"

  task :fix_empty_suggestion => :environment do
    Suggestion.all.select {|s| s.suggestable.blank? }.map(&:destroy)
  end
end
