import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css'

const UpdateModal = (props) => {
    const {
        className,
        isOpen,
        toggle,
        rowEdit,
        selectedItem
    } = props;

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [category, setCategory] = useState();

    // los handlers para que den valor a los estados cuando escribo en los imput
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

    // este useEffec es de la tabla anterior puede que no sirva
    useEffect(() => {
        if (rowEdit) {
            setName(rowEdit.name)
            setPrice(rowEdit.price)
            setId(rowEdit.user)
            setCategory(rowEdit.category)
        }
    }, [rowEdit])

    // sirve para cargar los datos del selectedItem y darles el valor con el useState
    useEffect(
        () => {
            if (selectedItem) {
                setName(selectedItem.name)
                setPrice(selectedItem.price)
                setId(selectedItem.user)
                setCategory(selectedItem.category)
            }
        }, [selectedItem]);


    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Item description</ModalHeader>
                <ModalBody>
                    <div>
                        <label >Name:</label>
                        {/* el onChange me permite darle el estado y el value el valor a ese estado */}
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
                            <option value="sports">Sports</option>
                            <option value="movies">Movies</option>
                            <option value="jewlery">Jewlery</option>
                            <option value="books">Books</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={toggle}>Update product</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateModal;