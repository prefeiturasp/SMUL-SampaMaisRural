# frozen_string_literal: true
# this constant returns correspondency between product_list from database and respective values for painel and profile api's
module Api::ProductListMethods
  PRODUCT_LIST_RESUME = {
    'Olericultura - Folhosas e inflorescências' => { painel: 'Legumes, Verduras e Raízes', profile: 'Horticultura' },
    'Olericultura - Raízes/Tubérculos' => { painel: 'Legumes, Verguras e Raízes', profile: 'Horticultura' },
    'Olericultura - Legumes' => { painel: 'Legumes, Verduras e Raízes', profile: 'Horticultura' },
    'Monocultura - Fruticultura/café' => { painel: 'Frutas', profile: 'Fruticultura' },
    'Plantas Ornamentais' => { painel: 'Plantas Ornamentais', profile: 'Plantas Ornamentais' },
    'Olericultura - Aromáticas/ Condimentares/ Medicinais' => { painel: 'Legumes, Verguras e Raízes', profile: 'Horticultura' },
    'Fungicultura' => { painel: 'Outras', profile: 'Outro' },
    'Cultivo protegido - Mudas' => { painel: 'Outras', profile: 'Outro' },
    'Silvicultura' => { painel: 'Outras', profile: 'Outro' },
    'Pastagens' => { painel: 'Outras', profile: 'Outro' },
    'Pousio' => { painel: 'Outras', profile: 'Outro' },
    'Vegetação nativa' => { painel: 'Outras', profile: 'Outro' },
    'Pomar/ horta doméstica' => { painel: 'Outras', profile: 'Outro' },
    'Sistemas agroflorestais (SAF)' => { painel: 'Outras', profile: 'Outro' },
    'Olericultura - Frutas' => { painel: 'Frutas', profile: 'Fruticultura' },
    'Cultura anual' => { painel: 'Outras', profile: 'Outro' },
    'Monocultura' => { painel: 'Outras', profile: 'Outro' },
    'ILPF - Integração Lavoura-Pecuária-Floresta' => { painel: 'Outras', profile: 'Outro' },
    'Consorcio - outros' => { painel: 'Outras', profile: 'Outro' },
    'Cultivo protegido - Fungicultura' => { painel: 'Outras', profile: 'Outro' },
    'Cultivo protegido - Olericultura' => { painel: 'Legumes, Verduras e Raízes', profile: 'Fruticultura' },
    'Cultivo protegido - Outros' => { painel: 'Outras', profile: 'Outro' },
    'Aves de corte' => { painel: 'Outras', profile: 'Outro' },
    'Aves de postura' => { painel: 'Outras', profile: 'Outro' },
    'Suínos' => { painel: 'Outras', profile: 'Outro' },
    'Animais aquáticos' => { painel: 'Outras', profile: 'Outro' },
    'Bovinos de leite' => { painel: 'Outras', profile: 'Outro' },
    'Bovinos de corte' => { painel: 'Outras', profile: 'Outro' },
    'Meliponicultura' => { painel: 'Outras', profile: 'Outro' },
    'Apicultura' => { painel: 'Outras', profile: 'Outro' },
    'Caprinos/Ovinos' => { painel: 'Outras', profile: 'Outro' },
    'Piscicultura' => { painel: 'Outras', profile: 'Outro' },
    'Animais Outros' => { painel: 'Outras', profile: 'Outro' }
  }

  def product_list_on_profile product_list
    list = Set.new(
      product_list.map { |product_name|
        PRODUCT_LIST_RESUME[product_name].try(:dig, :profile)
      }
      .compact
    ).to_a
    list.any? ? list : ["Sem informação"]
  end

  def product_list_on_painel product_list
    Set.new(
      product_list.map { |product_name|
        PRODUCT_LIST_RESUME[product_name].try(:dig, :painel)
      }
      .compact
    ).to_a
  end
end
