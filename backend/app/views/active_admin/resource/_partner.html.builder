context.instance_eval do
  panel I18n.t('active_admin.labels.form.basic_info') do
    attributes_table_for resource do
      row :id
      row :api_id
      row (:status) { |partner| I18n.t("active_admin.#{ partner.status }") }
      row :category_name
      row :subcategory_list
      row :name
      if resource.integrated?
        row :update_via_integration
      end

      Subcategory.tag_list.each do |tag_list|
        if Subcategory.tag_list_for(resource.category.subcategories, tag_list).any?
          row "#{tag_list.to_s.singularize}_list" do
            "#{resource.send(tag_list).join(',')}"
          end
        end
      end
    end
  end

  panel I18n.t('active_admin.labels.form.address') do
    attributes_table_for resource do
      row :full_address
      row :neighborhood
      row :zip_code
      row :district
      row :city
      row :zone
    end

    resource.phones.commercial.each_with_index do |phone, index|
      attributes_table_for phone do
        row "Telefone #{index+1}"do
          "#{phone.phone_number} - #{phone.kind}"
        end
      end
    end

    attributes_table_for resource do
      row :schedule
      row :email
      row :web_pages
      row :contact
      row :other_contact
    end
  end

  panel I18n.t('active_admin.labels.form.complementary_info') do
    attributes_table_for resource do
      row :description

      if resource.agriculture?
        row :cultivated_area
      end

      row (:connections) { |resource| resource.partners.pluck(:name) }

      row :associativism
      row :park
      row :disabled_friendly_amenities
      row :neighborhood_region_list
      row :gender
      row :begined_at
      row :source_info
      row :source_date
      row :source_info2
      row :source_update
    end
  end

  panel I18n.t('active_admin.labels.form.registration_info') do
    attributes_table_for resource do
      row :responsable_name
      row :cpf
      row :registration_address
      row :registration_neighborhood
      row :registration_zip_code
      row :registration_phone_0
      row :registration_phone_1
      row :registration_email
      row :cnpj
      row :cnae
      row :company_activity
    end
  end

  panel I18n.t('active_admin.labels.form.management_information') do
    attributes_table_for resource do
      row :registered_by
      row :source
      row :other_information
    end
  end

  panel I18n.t('active_admin.labels.form.pics_and_map') do
    attributes_table_for resource do
      panel I18n.t('active_admin.attachments') do
        resource.attachments.each do |attachment|
          attributes_table_for resource do
            row (:attachment) do |partner|
              span do
                image_tag attachment.site_version_url
              end
            end
          end
        end
      end

      row :avatar do |partner|
        if partner.avatar_url
          image_tag partner.avatar_url
        end
      end

      row :lat
      row :lon
    end
  end

  panel I18n.t('activerecord.models.regular_seal') do
    table_for resource.regular_seals do
      column (:id) { |seal| link_to seal.id, admin_regular_seal_path(seal.id) }
      column (:status) { |seal| Seal.human_attribute_name(seal.send(:status)) }
      column (:connected_partner) { |seal| seal.connected_partner }
      column (:connected_partner_id) { |seal| seal.connected_partner_id }
      column (:created_at) { |seal| seal.created_at }
      column (:expires_at) { |seal| seal.expires_at }
    end
  end

  panel I18n.t('active_admin.labels.history'), only: :show do
    table_for resource.versions.where.not(whodunnit: nil) do
      column (:created_at) { |version| version.created_at.to_s :long }
      column (:whodunnit) { |version| User.find_by_id(version.whodunnit)&.name }
      column (:event) { |version| I18n.t('events')[version.event.to_sym] }
      column (:changed_fields) { |version| History::VersionParser.new(version.changeset).changed_fields.map { |field| Partner.human_attribute_name(field) }  }
    end
  end
end
