FactoryBot.define do
  factory :partner do
    data { "" }
    api_id { 1 }
    name { "João Agricultor"}
    public { true }
    full_address { "Praça da Sé" }
    _lat { -23.5499158 }
    _lon { -46.6334289 }

    trait :with_products do
      after(:create) do |partner|
        create(:product_item, product: create(:product), productable: partner)
        create(:product_item, product: create(:product), productable: partner)
      end
    end
  end

  factory :initiative do
    name { 'Iniciativa'}
    type { Initiative }
    public { true }
    source { :sprural }
    full_address { "Praça da Sé" }
    _lat { -23.5499158 }
    _lon { -46.6334289 }
  end


  factory :upa do
    name { 'Agricultor' }
    type { Upa }
    public { true }
    source { :upa }
    full_address { "Praça da Sé" }
    _lat { -23.5499158 }
    _lon { -46.6334289 }

    trait :with_participatory_system do
      certificates { "Orgânico Participativo, ABD" }
    end

    trait :approved do
      status { :approved }
    end

    trait :organic do
      qualifications { "Orgânico Certificado" }
    end

    trait :without_location do
      full_address { nil }
      _lat { nil }
      _lon { nil }
    end
  end

  factory :market do
    name { 'Feira' }
    type { Market }
    public { true }
    source { :idec }
    full_address { "Praça da Sé" }
    _lat { -23.5499158 }
    _lon { -46.6334289 }
  end

  factory :tourism do
    name { 'Hotel' }
    source { :tourism }
    type { Tourism }
    public { true }
    full_address { "Praça da Sé" }
    _lat { -23.5499158 }
    _lon { -46.6334289 }

    trait :rural_experience do
      subcategory_list { [I18n.t('categories.tourism.rural_experience')] }
    end
  end
end
