class CreateDgCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :dg_courses do |t|
      t.integer :DGCourseReviewApiId
      t.string :name
      t.string :street, :default => "No street found..."
      t.string :city
      t.string :state
      t.integer :zip
      t.float :rating
      t.integer :holes
      t.string :courseLong
      t.string :courseLat
      t.string :dgCourseLink
      t.string :dgRatingImg

      t.timestamps
    end
  end
end
