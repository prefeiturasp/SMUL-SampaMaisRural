set :environment, ENV["RAILS_ENV"]
env :GEM_PATH, '/usr/local/bundle' # defines where to find rake command
set :output, '/var/log/cron.log' # log location

every 1.day, at: '2:30 am' do
  command "cd #{ENV["APP_ROOT"]}; rake etl:import_partners ORIGIN=idec"
end

every 1.day, at: '3:30 am' do
  command "cd #{ENV["APP_ROOT"]}; rake partner:import_idec_attachments"
end

every 1.day, at: '4:30 am' do
  command "cd #{ENV["APP_ROOT"]}; rake etl:import_partners ORIGIN=geosampa"
end

every 1.day, at: '4:00 am' do
  command "cd #{ENV["APP_ROOT"]}; rake etl:new_integration CONFIG=sisrural"
end

every 1.day, at: '6:00 am' do
  command "cd #{ENV["APP_ROOT"]}; rake searchkick:reindex:all"
end

every 1.day, at: '11:00 pm' do
  runner "Seal.mark_as_expired"
end
