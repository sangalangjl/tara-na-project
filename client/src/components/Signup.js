import { useState } from 'react'
import { useHistory } from 'react-router'

const Signup = ({ setUser, setErrors, isLoading, setIsLoading, errors}) => {
    const [username, setUsername] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        setIsLoading(true)
        fetch('/signup',{ 
            method: "POST",
            headers: { 
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username, 
                first_name,
                last_name,
                email,
                imgURL,
                password,
                password_confirmation
            })
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((user) => setUser(user))
                history.push('/')
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
            
        })

    }

    return (
        <div className="SignUpContainer">
            <form className="FormSignin"onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    autoComplete="off"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="first_name">First Name:</label>
                <input 
                    type="text" 
                    id="first_name" 
                    autoComplete="off"
                    value={first_name} 
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="last_name">Last Name:</label>
                <input 
                    type="text" 
                    id="last_name" 
                    autoComplete="off"
                    value={last_name} 
                    onChange={(e) => setLastName(e.target.value)}/
                >
                <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        autoComplete="off"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="img_url">Profile Picture:</label>
                    <input 
                        type="text" 
                        id="img_url" 
                        autoComplete="off"
                        value={imgURL} 
                        onChange={(e) => setImgURL(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    autoComplete="current-password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password_confirmation">Password Confirmation:</label>
                <input 
                    type="password" 
                    id="password_confirmation" 
                    autoComplete="current-password"
                    value={password_confirmation} 
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button className="SignUpBtn" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
                {errors.map((err) => (
                    <div className="SignUpError" key={err}>{err}</div>
                )) }
            </form>
        </div>
    )
}

export default Signup
