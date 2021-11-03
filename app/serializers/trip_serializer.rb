class TripSerializer < ActiveModel::Serializer
  has_many :members
  has_many :events
end
