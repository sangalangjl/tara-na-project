import { Link, useHistory } from "react-router-dom"
import { HiOutlineLogout } from "react-icons/hi"

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
                        <Link to='/events' className="TripsLink">
                            Events
                        </Link>
                        <HiOutlineLogout className="LogOutButton" onClick={handleLogout} />
                    </>
                ) : (
                <div className="SignupLoginContainer">
                    <Link to='/signup' className="SignUpLink">
                        Sign Up
                    </Link>
                    <Link to="/login" className="LoginLink"> 
                        Log In
                    </Link>
                </div>
                )}
            </div>
        </header>
    )
}

export default NavBar
