class CreateUserTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :user_trips do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :trip, null: false, foreign_key: true

      t.timestamps
    end
  end
end
