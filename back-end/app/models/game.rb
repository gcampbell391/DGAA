class Game < ApplicationRecord
  belongs_to :user
  belongs_to :dg_course
  has_many :scorecards
end
