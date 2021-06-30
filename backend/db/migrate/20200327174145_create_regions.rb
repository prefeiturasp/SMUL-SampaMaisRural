class CreateRegions < ActiveRecord::Migration[6.0]
  def change
    db_connection = ActiveRecord::Base.connection()
    sql_file = File.read('db/create_regions.sql')
    db_connection.execute(sql_file)
    db_connection.execute("update Regions set geom = ST_TRANSFORM(ST_GeomFromText(st_astext(regions.geom), 29193), 4326);")
    add_index :regions, :gid
    add_index :regions, :geom, using: :gist
  end
end
