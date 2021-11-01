const Home = ({user}) => {
        if (user) {
            return (
                <div>
                    <h1>Welcome Back {user.first_name}!</h1>
                    <h2>Organize your next trip with us!</h2>
                </div>
            )
            } else {
                return (
                    <div>
                        <h1>Welcome to TaraNa,</h1>
                        <h2>Organize your next trip with us!</h2>
                    </div>
                )
            }
}

export default Home
