import React from 'react'

const Actions = ({ row, onDelete, onEdit }) => {


    return (
        <div>
            <button type="button"
                style={{ margin: "5px" }}
                className="btn btn-danger"
                onClick={() => onDelete(row.id)}
            >
                Borrar
                </button>
            <button type="button"
                className="btn btn-warning"
                data-target="#editModal"
                data-toggle="modal"
                style={{ margin: "5px" }}
                onClick={() => onEdit(row)}
            >
                Modificar
            </button>
        </div>
    )
}

export default Actions;