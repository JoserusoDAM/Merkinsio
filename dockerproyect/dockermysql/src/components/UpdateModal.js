import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css'
import { updateItem } from '../services/list'

const UpdateModal = (props) => {
    const {
        className,
        isOpen,
        toggle,
        rowEdit,
        selectedItem,
        fetch
    } = props;

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [category, setCategory] = useState("");
    const [idproducts, setIdproducts] = useState("")

    const editProduct = async () => {
        //    checks blank fields
        if (name === "" || price === "" || category === "" || id === "0") {
            alert("Campo vacio")
        } else {
            await updateItem(
                {
                    idproducts: idproducts,
                    name: name,
                    price: parseInt(price),
                    cid: parseInt(category),
                    uid: 2,
                }
            )
            fetch()
            toggle()
        }
    }

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
            setIdproducts(rowEdit.idproducts)
            setName(rowEdit.name)
            setPrice(rowEdit.price)
            setId(rowEdit.uid)
            setCategory(rowEdit.cid)
        }
    }, [rowEdit])

    // sirve para cargar los datos del selectedItem y darles el valor con el useState
    useEffect(
        () => {
            if (selectedItem) {
                setIdproducts(selectedItem.idproducts)
                setName(selectedItem.name)
                setPrice(selectedItem.price)
                setId(selectedItem.uid)
                setCategory(selectedItem.cid)
            }
        }, [selectedItem]);


    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Item description</ModalHeader>
                <ModalBody>
                    <div>
                        <label>ID Product: </label>
                        <input disabled value={idproducts}></input>
                        <label >Name:</label>
                        <input
                            type="text"
                            placeholder="prodouct name"
                            value={name}
                            onChange={handleName}
                            required
                        >
                        </input>
                        <br />
                        <label >Price: </label>
                        <input
                            type="number"
                            placeholder="prodouct price"
                            value={price}
                            onChange={handlePrice}
                            required
                        >
                        </input>
                        <br />
                        <label >User ID:</label>
                        <input
                            type="text"
                            placeholder="user id"
                            value={id}
                            onChange={handleId}
                            disabled
                        >
                        </input>
                        <br />
                        <label>Category</label>
                        <select onChange={handleCategory} value={category} name="category">
                            <option value="1">Food</option>
                            <option value="2">Books</option>
                            <option value="3">Movies</option>
                            <option value="4">Games</option>
                            <option value="5">Gifts</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={editProduct}>Update product</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateModal;