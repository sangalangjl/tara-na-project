puts "Start Seeding..."

u1 = User.create(username: "johns", first_name: "John", last_name: "Sangalang", email: "johnsangalang@gmail.com", img_url: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png", password: "password")
u2 = User.create(username: "janed", first_name: "Jane", last_name: "Doe", email: "janedoe@gmail.com", img_url: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png", password: "password")

t1 = Trip.create(name: "Paris Trip", location: "Paris, France", start_date: Date.strptime("04/29/2022", "%m/%d/%Y"), end_date: Date.strptime("05/22/2022", "%m/%d/%Y"))
t2 = Trip.create(name: "Palawan Trip", location: "Palawan, Philippines", start_date: Date.strptime("02/05/2021", "%m/%d/%Y"), end_date: Date.strptime("02/20/2021", "%m/%d/%Y"))

e1 = u1.created_events.create(
    title: "Breakfast",
    description: "link to breakfast place",
    location: "Around the corner",
    budget: 15.00,
    start_time: Time.new(2022, 4, 29, 8),
    end_time: Time.new(2022, 4, 29, 10),
    trip_id: t1.id,
)

e1.attendees = [u1, u2]


puts "Done Seeding..."