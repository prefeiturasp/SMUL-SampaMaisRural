FactoryBot.define do
  factory :suggestion do
    name { "MyString" }
    email { "MyString" }
    phone { "MyString" }
    message { "MyText" }
    status { 1 }
  end
end
