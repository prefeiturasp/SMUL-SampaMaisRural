class FixPhoneFormats < ActiveRecord::Migration[6.0]
  def change
    Phone.find_each do |phone|
      number = phone.phone_number
      phone.phone_number = number.gsub('.0', '')
      phone.save(validate: false)
    end
  end
end
