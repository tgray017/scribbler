class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :player_1_id
      t.integer :player_2_id, default: nil

      t.timestamps
    end
  end
end
