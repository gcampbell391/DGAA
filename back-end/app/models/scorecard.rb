class Scorecard < ApplicationRecord
  belongs_to :hole
  belongs_to :game
end
