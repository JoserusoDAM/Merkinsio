import React, { useState } from 'react'
import UserLogged from '../Grettings/UserLogged'

const Login = ({ onClick }) => {
    return (
        <button onClick={onClick}>Login</button>
    )
}

const Logout = ({ onClick }) => {
    return (
        <button onClick={onClick}>Logout</button>
    )
}

const Buttons = () => {

    const [isLogged, setIsLogged] = useState(false)

    let button;
    const handleClickIn = () => {
        setIsLogged(true)
    }

    const handleClickOut = () => {
        setIsLogged(false)
    }

    if (isLogged) {
        button = <Logout onClick={handleClickOut} />
    } else {
        button = <Login onClick={handleClickIn} />
    }

    return (
        <div>
            <UserLogged isLogged={isLogged} />
            { button}
        </div>
    )

}

export default Buttons
