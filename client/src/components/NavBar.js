import { Link, useHistory } from "react-router-dom"

const NavBar = ({user, setUser}) => {
    const history = useHistory()

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE", 
        })
        .then(response => {
            if(response.ok){
                setUser(null)
                history.push('/')
            }
        })
    }

    return(
        <header className="NavBarContainer">
            <div> 
                <Link to="/">
                    <div className="NavBarLogoText">
                        <div>TaraNa</div>
                    </div>
                </Link>
            </div>
            <div className="NavBarLinks">
                {user ? (
                    <>
                        <Link to='/trips' className="TripsLink">
                            Trips
                        </Link>
                        <button className="LogOutButton" onClick={handleLogout}>Log Out</button> 
                    </>
                ) : (
                <>
                    <Link to='/signup' className="SignUpLink">
                        Sign Up
                    </Link>
                    <Link to="/login" className="LoginLink"> 
                        Log In
                    </Link>
                </>
                )}
            </div>
        </header>
    )
}

export default NavBar
