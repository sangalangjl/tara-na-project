class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :budget, :start_time, :end_time
  has_one :trip
  has_one :user
end
