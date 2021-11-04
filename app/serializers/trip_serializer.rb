class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :start_date, :end_date, :img_url

  has_many :members
  has_many :events
end
