module SourceDownload
  class Idec < Struct.new(:remote_file)

    def file
      filename = "tmp/idec-#{ Date.today.to_s }.csv"
      csv_content = open(remote_file).read
      File.open(filename, 'wb') do |file|
        file.write(csv_content)
      end
      filename
    end
  end
end
