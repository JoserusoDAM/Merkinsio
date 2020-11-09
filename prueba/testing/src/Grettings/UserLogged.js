import React from 'react'

const UserGreeting = () => {
    return <h1>Hola usuario</h1>
}

const GuestGreeting = () => {
    return <h1>Hola desconocido</h1>
}

const UserLogged = ({ isLogged }) => {

    return isLogged ?
        <UserGreeting /> :
        <GuestGreeting />


}

export default UserLogged
