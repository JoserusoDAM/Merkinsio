import React from 'react'

const Mapeo = ({ numbers }) => {

    const listItems = numbers.map((number, index) =>
        <li key={index}>{number}</li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default Mapeo
