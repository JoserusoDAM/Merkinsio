import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css'
import { setItem } from '../services/list'



const InsertModal = (props) => {
    const {
        buttonLabel,
        className,
        fetchData
    } = props;

    // state of the modal to show ir or dispose it
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    };

    // inputs states
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [category, setCategory] = useState("");

    // fuction to send the data to the db
    const sendData = async () => {
        console.log(category)
        //    checks blank fields
        if (name === "" || price === "" || category === "" || id === "0") {
            alert("Campo vacio")
        } else {
            await setItem(
                {
                    name: name,
                    price: parseFloat(price),
                    uid: 1,
                    cid: parseInt(category)
                }
            )
            fetchData()
            toggle()
        }
    }

    // handlers from the inputs
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
                            placeholder="Prodouct name"
                            value={name}
                            onChange={handleName}
                            required
                        >
                        </input>
                        <br />
                        <label >Price: </label>
                        <input
                            type="number"
                            placeholder="Prodouct price"
                            value={price}
                            onChange={handlePrice}
                            required
                        >
                        </input>
                        <br />
                        <label >User ID:</label>
                        <input
                            type="text"
                            placeholder="User id"
                            value={id}
                            onChange={handleId}
                            disabled
                        >
                        </input>
                        <br />
                        <label>Category</label>
                        <select onChange={handleCategory} value={category} name="category">
                            <option selected value="" >--Select a category--</option>
                            <option value="1">Food</option>
                            <option value="2">Books</option>
                            <option value="3">Movies</option>
                            <option value="4">Games</option>
                            <option value="5">Gifts</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={sendData}>Insert product</Button>{' '}
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default InsertModal;