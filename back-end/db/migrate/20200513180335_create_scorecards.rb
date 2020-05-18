class CreateScorecards < ActiveRecord::Migration[6.0]
  def change
    create_table :scorecards do |t|
      t.belongs_to :game, null: false, foreign_key: true
      t.integer :strokeCount, :default => 1
      t.integer :holeNum
      t.integer :parCount

      t.timestamps
    end
  end
end
