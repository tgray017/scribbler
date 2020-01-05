class CreateGuessedWords < ActiveRecord::Migration[5.2]
  def change
    create_table :guessed_words do |t|
      t.references :round, foreign_key: true
      t.references :player, foreign_key: true
      t.string :word
      t.integer :points

      t.timestamps
    end
  end
end
