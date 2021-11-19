class Trip < ApplicationRecord
    belongs_to :user
    has_many :events, dependent: :destroy
    has_many :user_trips, dependent: :destroy
    has_many :members, through: :user_trips, source: :user

    validates :name, :location, :start_date, :end_date, presence: true
end
