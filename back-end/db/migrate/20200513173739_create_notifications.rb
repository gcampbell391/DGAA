class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :message
      t.boolean :hasBeenSeen

      t.timestamps
    end
  end
end
