namespace :deploy do
  desc "taks for deploys"
  task v2: :environment do
    Subcategory.destroy_all
  end
end
