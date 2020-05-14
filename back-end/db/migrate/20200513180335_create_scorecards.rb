class CreateScorecards < ActiveRecord::Migration[6.0]
  def change
    create_table :scorecards do |t|
      t.belongs_to :hole, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true
      t.integer :strokeCount, :default => 1

      t.timestamps
    end
  end
end
