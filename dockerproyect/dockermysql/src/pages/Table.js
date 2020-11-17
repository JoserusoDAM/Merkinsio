import React, { useState } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import InsertModal from '../components/InsertModal'
import UpdateModal from '../components/UpdateModal'
import Actions from '../components/Actions'


const Table = () => {

  // este estado lo uso para traer los valores de la tabla y cargarlos en el modal
  const [selectedItem, setSelectedItem] = useState();

  // el estado del modal
  const [editModal, setEditModal] = useState();
  // esta funcion se llama cuando clico el boton update y da valores al selected item
  // de la row y activa el modal
  const handleEdit = (row) => {
    setSelectedItem(row)
    setEditModal(true);
  }

  const [row, setRow] = useState([{
    id: 1,
    name: 'Whistle',
    price: '7 €',
    category: 'sports',
    user: '01'
  },
  {
    id: 2,
    name: 'Dumbbells',
    price: '250 €',
    category: 'sports',
    user: '01'
  },
  {
    id: 3,
    name: 'E.T',
    price: '30 €',
    category: 'movies',
    user: '01'
  },
  {
    id: 4,
    name: 'Diamond',
    price: '2500 €',
    category: 'jewlery',
    user: '01'
  },
  {
    id: 5,
    name: 'Ball',
    price: '35 €',
    category: 'sports',
    user: '01'
  },
  {
    id: 6,
    name: 'Random thing',
    price: '250 €',
    category: 'miscellaneous',
    user: '01'
  },
  {
    id: 7,
    name: 'Hamlet',
    price: '30 €',
    category: 'Books',
    user: '01'
  },
  {
    id: 8,
    name: 'Another random thing',
    price: '250 €',
    category: 'miscellaneous',
    user: '01'
  },
  {
    id: 9,
    name: 'Ring',
    price: '150 €',
    category: 'jewlery',
    user: '01'
  },
  {
    id: 10,
    name: 'Polar Vantage',
    price: '499 €',
    category: 'Watch',
    user: '01'
  },
  {
    id: 11,
    name: 'Lords of the Rings',
    price: '15 €',
    category: 'books',
    user: '01'
  },
  {
    id: 12,
    name: 'Iron Man',
    price: '49 €',
    category: 'movies',
    user: '01'
  }
  ]);

  const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true,
  }, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Product Price',
    sort: true
  },
  {
    dataField: 'category',
    text: 'Product category',
    sort: true
  },
  {
    dataField: 'user',
    text: 'User name',
    sort: true
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: (cell, row, rowIndex) => {
      // las acciones le paso esos parametros para saber que fila borrar y que fila editar
      return <Actions
        row={row}
        onDelete={deleteItem}
        onEdit={() => handleEdit(row) }
      />
    }
  }
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  // el estado de la fila si es distinto a la id que le he pasado la elimina
  const deleteItem = (id) => {
    setRow((prevRow) =>
      prevRow.filter((row) => row.id !== id)
    )
  }

  return (
    <div style={{ marginLeft: 25, marginRight: 25 }}>
      <div style={{ margin: 10 }}>
      {/*el toogle muestra el modal */}
        <InsertModal toggle={() => setEditModal(false)} buttonLabel="Insert product" />
      </div>
      <BootstrapTable
        keyField="id"
        data={row}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
      />
      <UpdateModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        // la prop selected item me carga los datos en el modal
        selectedItem={selectedItem}
        />
    </div>
  )
}

export default Table;