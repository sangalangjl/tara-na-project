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
            <form className="LogInForm" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    autoComplete="on"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input 
                    type="password" 
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
