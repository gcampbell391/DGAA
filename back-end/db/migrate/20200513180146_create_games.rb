class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :dg_course, null: false, foreign_key: true
      t.integer :score, :default => 0

      t.timestamps
    end
  end
end
