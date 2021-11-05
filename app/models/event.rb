class Event < ApplicationRecord
  belongs_to :trip
  belongs_to :user
  has_many :user_events, dependent: :destroy
  has_many :attendees, through: :user_events, source: :user

  validates :title, :description, :location, :budget, :start_time, :end_time, presence: true
end
