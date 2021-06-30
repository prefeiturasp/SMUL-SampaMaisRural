class AddNewRegions < ActiveRecord::Migration[6.0]
  def change
    db_connection = ActiveRecord::Base.connection
    db_connection.execute("drop table regions")
    db_connection.execute(File.read("db/create_regions.sql"))
    Region.update_all(kind: Region.kinds[:region])
    Dir['db/regions/*.sql'].each do |region_sql|
      db_connection.execute(File.read(region_sql))
      Region.where(kind: nil).update_all(kind: Region.kinds[files_to_kind[region_sql.split('/').last]])
    end
    db_connection.execute("update Regions set geom = ST_TRANSFORM(ST_GeomFromText(st_astext(regions.geom), 29193), 4326);")
  end

  def files_to_kind
    { "urbano_e_rural_regions.sql" => :rural_urban,
      "parques_municipais_regions.sql" => :park,
      "povos_originarios_regions.sql" => :native,
      "unidade_conservacao_regions.sql"  => :conservation
    }
  end
end
