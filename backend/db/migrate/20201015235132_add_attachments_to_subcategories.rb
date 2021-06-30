class AddAttachmentsToSubcategories < ActiveRecord::Migration[6.0]
  def change
    add_file "Agricultores sem contato", 'farmer.jpg'
    add_file "Agricultores com contato", 'farmer.jpg'

    add_file "Comércio Parceiro de Orgânicos", 'initiative.jpg'
    add_file "Parceiro da Produção Local", 'initiative.jpg'

    add_file "Entrega de Orgânicos", 'idec.jpg'
    add_file "Feiras Orgânicas", 'idec.jpg'
    add_file "Grupo de Consumo Responsável", 'idec.jpg'
    add_file "Associações e Cooperativas", 'idec.jpg'
    add_file "SP Cidade Solidária", 'idec.jpg'

    add_file "Feiras Livres Municipais", "geosampa.jpg"
    add_file "Restaurantes com Orgânicos", "geosampa.jpg"
    add_file "Vivência Rural", "geosampa.jpg"
    add_file "Cultura", "geosampa.jpg"
    add_file "Hospedagem", "geosampa.jpg"
    add_file "Comércio e Serviços", "geosampa.jpg"
    add_file "Alimentação", "geosampa.jpg"
    add_file "Natureza", "geosampa.jpg"

    add_file "Hortas urbanas", "garden.jpg"
    add_file "Hortas em equipamentos públicos", "garden.jpg"
    add_file "Aldeias Guarani", "garden.jpg"

    add_file "Serviços para Agricultura", "garden.jpg"
    add_file "Iniciativas da Sociedade Civil", "garden.jpg"
    add_file "Políticas Públicas", "garden.jpg"
    add_file "Pesquisa e Extensão", "garden.jpg"
  end

  def add_file sub_name, filename
    subcategory = Subcategory.where("lower(name) = ?", sub_name.downcase).first
    if subcategory
      subcategory.attachments << Attachment.new(file: File.open("public/icons/#{filename}"))
      subcategory.save
    end
  end
end
