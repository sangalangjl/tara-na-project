class User < ApplicationRecord
    has_secure_password

    has_many :user_trips
    has_many :trips, through: :user_trips
    has_many :user_events
    has_many :events, through: :user_events
    has_many :created_events, class_name: 'Event'

    validates :username, presence: true, uniqueness: true	
    validates :first_name, presence: true	
    validates :last_name, presence: true	
    validates :email, presence: true, uniqueness: true	
    
end
