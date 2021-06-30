FactoryBot.define do
  factory :product do
    name { 'Laranjas' }

    trait :root  do
      name { 'Hortaliças e raízes' }
    end
    trait :ornamental  do
      name { 'Ornamentais' }
    end
    trait :fruits  do
      name { 'Frutas' }
    end
  end
end
