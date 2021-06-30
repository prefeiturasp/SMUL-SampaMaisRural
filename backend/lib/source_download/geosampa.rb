module SourceDownload
  class Geosampa < Struct.new(:remote_file)
    def file
      content = open(remote_file)
      filename = "GEOINFO_AB_FEIRASLIVRES_#{ Date.today.year - 1 }_Dados.csv"
      filepath = "tmp/#{ filename }"
      File.delete(filepath) if File.exists?(filepath)
      Zip::File.open_buffer(content) do |zip|
        zip.each do |entry|
          next unless entry.name == filename
          entry.extract(filepath)
        end
      end
      filepath
    end
  end
end
