class CreateUserFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :user_friends do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :friend_id
      t.boolean :accepted
      t.timestamps
    end
  end
end
