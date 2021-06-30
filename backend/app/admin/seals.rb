ActiveAdmin.register Seal do
  menu false

  member_action :as_zip, method: :get do
    respond_to do |format|
      format.html { send_file resource.as_zip, filename: resource.zip_filename }
    end
  end
end
