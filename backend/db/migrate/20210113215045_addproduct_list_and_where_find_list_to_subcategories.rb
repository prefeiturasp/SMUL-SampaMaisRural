class AddproductListAndWhereFindListToSubcategories < ActiveRecord::Migration[6.0]
  def change
    product_list = [
      "Olericultura - Folhosas e inflorescências",
      "Olericultura - Raízes/Tubérculos",
      "Olericultura - Legumes",
      "Monocultura - Fruticultura/café",
      "Ornamentais",
      "Olericultura - Aromáticas/ Condimentares/ Medicinais",
      "Fungicultura",
      "Cultivo protegido - Mudas",
      "Silvicultura",
      "Pastagens",
      "Pousio",
      "Vegetação nativa",
      "Pomar/ horta doméstica",
      "Sistemas agroflorestais (SAF)",
      "Olericultura - Frutas",
      "Cultura anual",
      "Monocultura",
      "ILPF - Integraçãoo Lavoura-Pecuária-Floresta",
      "Consorcio - outros",
      "Cultivo protegido - Fungicultura",
      "Cultivo protegido - Olericultura",
      "Cultivo protegido - Outros",
      "Aves de corte",
      "Aves de postura",
      "Suínos",
      "Animais aquáticos",
      "Bovinos de leite",
      "Bovinos de corte",
      "Meliponicultura",
      "Apicultura",
      "Caprinos/Ovinos",
      "Piscicultura",
      "Animais Outros",
      "Não comercializa",
      "Legumes e Verduras",
      "Raízes",
      "Frutas",
      "Grãos",
      "PANCs - Plantas alimentícias não convencionais",
      "Cogumelos",
      "Ovos",
      "Produção de Mel",
      "Laticínios",
      "Processados e Beneficiados (geleias, compotas, frutas desidratadas, etc.)",
      "Panificados",
      "Plantas Medicinais",
      "Bambu",
      "Plantas Ornamentais",
      "Mudas"
    ]

    where_find = [
      "Não comercializa",
      'Intermediários',
      'Supermercados',
      'Mercados locais',
      'Ceagesp',
      'Grupos de consumo/Comunidades que sustentam agricultura',
      'Entrega em domicílio',
      'Restaurantes/Hotéis',
      'Venda no local  da produção',
      'Associações, ONGs',
      'Órgãos públicos',
      'Cooperativa',
      'Feira',
      'Plataformas digitais',
      'Outros',
      'Na propriedade',
      'CEAGESP',
      'Associação, sindicato ou cooperativa',
      'Feiras Livres',
      'Restaurantes',
      'Quitandas ou mini-mercados',
      'Supermercados ou grandes empresas'
    ]

    Subcategory.where(name: ["Agricultores sem contato", "Agricultores com contato"]).each do |subcategory|
      subcategory.product_list = product_list
      subcategory.where_find_list = where_find
      subcategory.save
    end
  end
end
