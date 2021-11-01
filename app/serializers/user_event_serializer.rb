class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :attended
  has_one :user
  has_one :event
end
