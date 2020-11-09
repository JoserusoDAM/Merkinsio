import React, {useState} from 'react'

const NameForm = () => {

    const [name, setName] = useState('')

    const changeHandler = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(name)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name
            <textarea type='text' value={name}  onChange={changeHandler}></textarea>
            </label>
            <input type="submit" value="Subir" />
        </form>
    )
}

export default NameForm
