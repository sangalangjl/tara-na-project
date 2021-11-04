class UserTrip < ApplicationRecord
  belongs_to :user
  belongs_to :trip

  validates :trip_id, uniqueness: { scope: :user_id, message: "You're already included in this trip" }
end
