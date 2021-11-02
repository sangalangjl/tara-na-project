const Home = ({user}) => {
        if (user) {
            return (
                <div className="HomeDiv">
                    <div className="WelcomeText">
                        <h1>Welcome Back {user.first_name}!</h1>
                        <h1>Organize your next trip with us!</h1>
                    </div>
                </div>
            )
            } else {
                return (
                    <div className="HomeDiv">
                        <div className="WelcomeText">
                            <h1>Welcome to TaraNa,</h1>
                            <h1>Organize your next trip with us!</h1>
                        </div>
                    </div>
                )
            }
}

export default Home
