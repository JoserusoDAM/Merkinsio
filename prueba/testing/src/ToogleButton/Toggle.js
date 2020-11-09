import React, { useState } from 'react'

export default function Toggle() {
    
    const [isToggleOn, setIsToggleOn] = useState(true)
    
    const handleClick = () => {
        setIsToggleOn(!isToggleOn)
    } 

    return (
        <div>
            <button onClick={handleClick}>El boton esta {isToggleOn ? 'ON' : 'OFF'}</button>
        </div>
    )
}
