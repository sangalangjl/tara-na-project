class Trip < ApplicationRecord
    has_many :events
    has_many :user_trips
    has_many :members, through: :user_trips, source: :user

    validates :name, :location, :start_date, :end_date, presence: true
end
