require './lib/source_download/idec.rb'
require './lib/source_download/geosampa.rb'

module SourceDownload
  class FileDownloader < Struct.new(:origin)
    def file
      case origin
      when 'geosampa'
        SourceDownload::Idec.new(Rails.application.secrets.geosampa_file_url).file
      when 'idec'
        SourceDownload::Idec.new(Rails.application.secrets.csv_file_path).file
      else
        raise "file not found for origin: #{ origin }"
      end
    end
  end
end
