class CreatePostThemes < ActiveRecord::Migration[6.0]
  def change
    create_table :post_themes do |t|
      t.string :name

      t.timestamps
    end

    %w[Artigos
     Legislação
     Cursos
     Aplicativos].each do |name|
      PostTheme.create(name: name)
    end
  end
end
