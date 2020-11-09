import React from 'react'
import Hijo from './Hijo'

export default function Padre() {
    return (
        <div>
        <p>Soy el padre</p>
            <Hijo nombre="Jose"/>
        </div>
    )
}
