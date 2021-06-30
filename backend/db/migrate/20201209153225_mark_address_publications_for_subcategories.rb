class MarkAddressPublicationsForSubcategories < ActiveRecord::Migration[6.0]
  def change
    Subcategory.where(name: ["Aldeias Guarani", "Agricultores sem contato"]).update_all(address_publication: Subcategory.address_publications[:only_resume_address])
    Subcategory.where(name: "Agricultores com contato").update_all(address_publication: Subcategory.address_publications[:full_address_only_on_show])
  end
end
