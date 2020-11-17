import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css'

const InsertModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    // aqui si controlo que el modal se mueste o no porque lo llamo directamente desde la tabla
    // en el caso del update es distinto porque el boton esta en las acction, este boton esta directamente
    // en la vista de la tabla por lo que puede tener la prop toggle para mostrarlo
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [category, setCategory] = useState();

    // el resto del componente es igual los handler y los value
    const handleName = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    const handleId = (e) => {
        e.preventDefault()
        setId(e.target.value)
    }

    const handleCategory = (e) => {
        e.preventDefault()
        setCategory(e.target.value)
    }

    return (
        <div>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Item description</ModalHeader>
                <ModalBody>
                    <div>
                        <label >Name:</label>
                        <input
                            type="text"
                            placeholder="prodouct name"
                            value={name}
                            onChange={handleName}>
                        </input>
                        <br />
                        <label >Price: </label>
                        <input
                            type="text"
                            placeholder="prodouct price"
                            value={price}
                            onChange={handlePrice}>
                        </input>
                        <br />
                        <label >User ID:</label>
                        <input
                            type="text"
                            placeholder="user id"
                            value={id}
                            onChange={handleId}>
                        </input>
                        <br />
                        <label>Category</label>
                        <select onChange={handleCategory} value={category} name="category">
                            <option value="Sports">Sports</option>
                            <option value="movies">Movies</option>
                            <option value="jewlery">Jewlery</option>
                            <option value="Books">Books</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={toggle}>Insert product</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default InsertModal;