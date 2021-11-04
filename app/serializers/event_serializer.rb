class EventSerializer < ActiveModel::Serializer
  attributes :id, :creator, :title, :description, :location, :budget, :start_time, :end_time

  has_many :attendees
  belongs_to :trip

  def creator
    object.user.username
  end
end
