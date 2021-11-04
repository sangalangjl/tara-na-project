class Event < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  validates :title, :description, :location, :budget, :start_time, :end_time, presence: true
end
