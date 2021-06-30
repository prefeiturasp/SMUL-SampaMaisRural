FactoryBot.define do
  factory :attachment do
    file { Rack::Test::UploadedFile
      .new('spec/fixtures/attachment.jpg',
           'image/png') }
  end
end
