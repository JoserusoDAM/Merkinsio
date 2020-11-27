import React from 'react'

const Actions = ({ row, onDelete, onEdit }) => {
    // los botones cada uno con la accion del click que vienen definidas en la tabla, aqui
    // solo les digo que van a recibir un click, pero la funcion viene definita en la tabla que es
    // donde los llamo. Cada uno recibe una fila por parametro 
    return (
        <div>
            <button type="button"
                className="btn btn-danger"
                onClick={() => {
                    onDelete(row.idproducts);
                }}
            >
                Delete
                </button>
            <button type="button"
                className="btn btn-warning"
                onClick={() => onEdit(row)}
            >
                Update
            </button>
        </div>
    )
}

export default Actions;