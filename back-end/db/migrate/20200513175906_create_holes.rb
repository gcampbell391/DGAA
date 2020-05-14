class CreateHoles < ActiveRecord::Migration[6.0]
  def change
    create_table :holes do |t|
      t.belongs_to :dgcourse, null: false, foreign_key: true
      t.string :tee1Length
      t.string :tee1Par
      t.string :tee2Length, :default => "0" 
      t.string :tee2Par, :default => "0" 

      t.timestamps
    end
  end
end
