class AddSuggestableToSuggestions < ActiveRecord::Migration[6.0]
  def change
    add_reference :suggestions, :suggestable, polymorphic: true, null: false
  end
end
