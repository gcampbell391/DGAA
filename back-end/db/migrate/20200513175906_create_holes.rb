class CreateHoles < ActiveRecord::Migration[6.0]
  def change
    create_table :holes do |t|
      t.belongs_to :dgcourse, null: false, foreign_key: true
      t.string :tee1Length
      t.string :tee1Par
      t.string :tee2Length
      t.string :tee2Par

      t.timestamps
    end
  end
end
