import { useState } from 'react'
import { useHistory} from 'react-router-dom'

const Login = ({errors, setErrors, setUser, setIsLoading}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        fetch("/login",{ 
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
            }).then((r) => {
            if (r.ok) {
                setIsLoading(false)
                r.json().then((user) => setUser(user))
                history.push('/')
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    } 

    return (
        <div className="LogInContainer">
            <div className="LogInText">
                <h2>Log In</h2>
            </div>
            <form className="LogInForm" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    id="username" 
                    autoComplete="on"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    id="password" 
                    autoComplete="current-password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="LogInBtn" type="submit">Login</button>
                {errors.map((err) => (
                <div className="LogInError" key={err}>{err}</div>
                ))}
            </form>
        </div>
    )
}

export default Login
