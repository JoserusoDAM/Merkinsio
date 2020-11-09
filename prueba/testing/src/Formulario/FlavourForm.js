import React, { useState } from 'react'


const FlavourForm = () => {
    
    const [sabor, setSabor] = useState()
    
    const handleChange = (e) => {
        setSabor(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        alert(sabor === undefined ? 'No seleccionates nada' : sabor)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Selecciona tu fruta favorita
            <select value={sabor} onChange={handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Cononut</option>
                <option value="mango">Mango</option>
            </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default FlavourForm

