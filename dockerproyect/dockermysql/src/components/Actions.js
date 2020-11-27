import React from 'react'

const Actions = ({ row, onDelete, onEdit }) => {
    // declare the actions but dont implements here
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