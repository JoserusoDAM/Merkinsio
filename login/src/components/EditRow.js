import React, { useEffect, useState, } from 'react'
import { db } from '../config/init-firebase'

const EditRow = ({ rowEdit, row, selectedItem, setRow, handleRefreshData }) => {

    const [name, setName] = useState();
    const [price, setPrice] = useState();

    useEffect(
        () => {
            if (selectedItem) {
                setName(selectedItem.name)
                setPrice(selectedItem.price)
            }  
        }, [selectedItem])

    const nameHandler = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const priceHandler = (e) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    useEffect(() => {
        if (rowEdit) {
            setName(rowEdit.name)
            setPrice(rowEdit.price)
        }
    }, [rowEdit])


    const uid = localStorage.getItem('uid');
    const saveData = () => {
        
        if (name.length <1 && price.length <1) {
            alert("Campos vacios")
        } else {
        db.collection(uid).doc(selectedItem.id).update({
            name: name,
            price: price
        })
            .then(function (docRef) {
                handleRefreshData();
                setName("");
                setPrice("")
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }
    }

    return (
        <div>
            <div className="modal fade"
                id="editModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel">Modificar datos</h5>
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
                                            <label>Nombre del producto: </label>
                                            <input
                                                value={name}
                                                onChange={nameHandler}></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Precio del producto:  </label>
                                            <input
                                                value={price}
                                                onChange={priceHandler}></input>
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
                                onClick={saveData}
                                data-dismiss="modal"
                            >Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditRow;
