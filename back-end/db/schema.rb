# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_13_180335) do

  create_table "dg_course_pictures", force: :cascade do |t|
    t.integer "dgcourse_id", null: false
    t.integer "DGCourseReviewApiId"
    t.string "name"
    t.string "imgSrc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dgcourse_id"], name: "index_dg_course_pictures_on_dgcourse_id"
  end

  create_table "dg_courses", force: :cascade do |t|
    t.integer "DGCourseReviewApiId"
    t.string "name"
    t.string "street", default: "No street found..."
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.float "rating"
    t.integer "holes"
    t.string "courseLong"
    t.string "courseLat"
    t.string "dgCourseLink"
    t.string "dgRatingImg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "dgcourse_id", null: false
    t.integer "score", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dgcourse_id"], name: "index_games_on_dgcourse_id"
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "holes", force: :cascade do |t|
    t.integer "dgcourse_id", null: false
    t.string "tee1Length"
    t.string "tee1Par"
    t.string "tee2Length", default: "0"
    t.string "tee2Par", default: "0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dgcourse_id"], name: "index_holes_on_dgcourse_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "message"
    t.boolean "hasBeenSeen"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "scorecards", force: :cascade do |t|
    t.integer "hole_id", null: false
    t.integer "game_id", null: false
    t.integer "strokeCount", default: 1
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_scorecards_on_game_id"
    t.index ["hole_id"], name: "index_scorecards_on_hole_id"
  end

  create_table "user_friends", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_friends_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "firstName"
    t.string "lastName"
    t.string "street"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.string "userImg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "dg_course_pictures", "dgcourses"
  add_foreign_key "games", "dgcourses"
  add_foreign_key "games", "users"
  add_foreign_key "holes", "dgcourses"
  add_foreign_key "notifications", "users"
  add_foreign_key "scorecards", "games"
  add_foreign_key "scorecards", "holes"
  add_foreign_key "user_friends", "users"
end
