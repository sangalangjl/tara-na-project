import { useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import TripContainer from './components/TripContainer';

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [getTrips, setGetTrips] = useState([])
  const [manualToggle, setManualToggle] = useState(false)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  return (
    <>
      <NavBar 
        user={user} 
        setUser={setUser}
      />
      <main>
        {user ? (
          <Switch>
            <Route exact path='/'>
              <Home 
                user={user}
              />
            </Route>
            <Route path='/'>
              <TripContainer 
                user={user}
                getTrips={getTrips}
                setGetTrips={setGetTrips}
                errors={errors} 
                setErrors={setErrors}
              />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path='/signup'>
              <Signup 
                setUser={setUser} 
                errors={errors} 
                setErrors={setErrors} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
              />
            </Route>
            <Route path='/login'>
              <Login 
                setUser={setUser} 
                errors={errors} 
                setErrors={setErrors} 
                setIsLoading={setIsLoading} 
              />
            </Route>
            <Route exact path='/'>
              <Home 
                user={user}
              />
            </Route>
          </Switch>
        )}
      </main>     
    </>
  );
}

export default App;