class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :firstName
      t.string :lastName
      t.string :street
      t.string :city
      t.string :state
      t.integer :zip
      t.string :userImg

      t.timestamps
    end
  end
end
