class CreateDgCoursePictures < ActiveRecord::Migration[6.0]
  def change
    create_table :dg_course_pictures do |t|
      t.belongs_to :dgcourse, null: false, foreign_key: true
      t.integer :DGCourseReviewApiId
      t.string :name
      t.string :imgSrc

      t.timestamps
    end
  end
end
