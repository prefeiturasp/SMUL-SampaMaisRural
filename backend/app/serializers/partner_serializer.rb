class PartnerSerializer
  attr_reader :object
# def initialize object
#   @object = object
# end

  def call
    attributes.map { |attr| { attr => object.send(attr)  } }.reduce({}, :merge)
  end

  def read data
    data
  end

  private

  def attributes
    send("#{object.type.to_s.downcase}_attributes")
  end

  def initiative_attributes
    %i[api_id
    status
    category
    subcategory_list
    name
    qualification_list
    product_list


    full_address
    neighborhood
    zip_code
    district
    city
    zone

    phone_0
    phone_kind_0
    phone_1
    phone_kind_1
    phone_2
    phone_kind_2

    schedule
    email
    web_pages
    contact
    other_contact


    description
    market_ids
    upa_ids
    tourism_ids
    initiative_ids
    associativism
    park
    disabled_friendly_amenities
    neighborhood_region_list
    gender
    begined_at
    source
    source_date
    source_update


    responsable_name
    cpf
    registration_phone_0
    registration_phone_1
    email
    cnpj
    cnae
    company_activity

    registered_by
    source
    other_information

    lat
    lon




    ]
  end

  def tourism_attributes
    %i[api_id
    status
    category
    subcategory_list
    name
    qualification_list
    product_list

    full_address
    neighborhood
    zip_code
    district
    city
    zone

    phone_0
    phone_kind_0
    phone_1
    phone_kind_1
    phone_2
    phone_kind_2

    schedule
    email
    web_pages
    contact
    other_contact

    description
    market_ids
    upa_ids
    tourism_ids
    initiative_ids
    associativism
    disabled_friendly_amenities
    neighborhood_region_list
    gender
    begined_at
    source
    source_date
    source_info2
    source_update

    responsable_name
    cpf
    registration_phone_0
    registration_phone_1
    email
    cnpj
    cnae
    company_activity

    registered_by
    source

    lat
    lon


    ]
  end

  def upa_attributes
    %i[api_id
    status
    category
    subcategory_list
    name
    qualification_list
    product_list
    where_find_list

    zip_code
    district
    city
    zone
    full_address
    neighborhood
    zip_code
    district
    city
    zone

    phone_0
    phone_kind_0
    phone_1
    phone_kind_1
    phone_2
    phone_kind_2

    schedule
    email
    web_pages
    contact
    other_contact

    description
    market_ids
    upa_ids
    tourism_ids
    initiative_ids
    farms_count
    associativism
    park
    disabled_friendly_amenities
    neighborhood_region_list
    gender
    begined_at
    source
    source_date
    source_info
    source_info2
    source_update


    registration_name
    cpf
    registration_phone_0
    registration_phone_1
    email
    cnpj
    cnae
    company_activity

    registered_by
    source


    lat
    lon
    ]
  end

  def market_attributes
    %i[api_id
    status
    category
    subcategory_list
    name
    qualification_list
    full_address
    neighborhood
    zip_code
    district
    city
    city
    zone

    phone_0
    phone_kind_0
    phone_1
    phone_kind_1
    phone_2
    phone_kind_2

    schedule
    email
    web_pages
    contact
    other_contact
    description
    market_ids
    upa_ids
    tourism_ids
    initiative_ids
    associativism
    park
    disabled_friendly_amenities
    neighborhood_region_list
    gender
    begined_at

    cpf
    registration_address
    registration_zip_code
    registration_phone_0
    registration_phone_1
    registration_email
    cnpj
    cnae
    company_activity

    registered_by
    source


    lat
    lon
    ]
  end
end
