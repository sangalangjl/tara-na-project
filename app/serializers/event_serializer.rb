class EventSerializer < ActiveModel::Serializer
  attributes :creator, :id, :title, :description, :location, :budget, :start_time, :end_time

  belongs_to :trip, serializer: EventTripSerializer

  def creator
    object.user.username
  end
end
