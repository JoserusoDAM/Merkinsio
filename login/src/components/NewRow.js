import React, { useState } from 'react'
import { db } from '../config/init-firebase'

const NewRow = ({ setRow, handleRefreshData, uID }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')

    const styles = {
        margin: "5px"
    }

    const nameHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const priceHandler = (e) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    const uid = localStorage.getItem('uid');

    const saveData = () => {
        if (name.length <1 && price.length <1) {
            alert("Campos vacios")
        } else {
            setRow(state => [...state, {
                id: id,
                name: name,
                price: price
            }])
            
            db.collection(uid).add({
                name: name,
                price: price,              
            })
            .then(function(docRef) {
                handleRefreshData();
                setName("");
                setPrice("")
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        
    }
    

    return (
        <div>
            <div className="modal fade"
                id="newModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel">Datos</h5>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label style={styles}>Nombre del producto:  </label>
                                            <input onChange={nameHandler} value={name}></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label style={styles}>Precio del producto:  </label>
                                            <input onChange={priceHandler} value={price}></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal">Cerrar</button>
                            <button type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={saveData}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRow;