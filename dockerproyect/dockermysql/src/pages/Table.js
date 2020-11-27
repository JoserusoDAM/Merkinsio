import React, { useState, useEffect } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import InsertModal from '../components/InsertModal'
import UpdateModal from '../components/UpdateModal'
import Actions from '../components/Actions'
import { getList, getCategory } from '../services/list'


const Table = () => {
  // estado para manejar los datos que traigo de la api
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);

  // este estado lo uso para traer los valores de la tabla y cargarlos en el modal
  const [selectedItem, setSelectedItem] = useState();

  // el estado del modal
  const [editModal, setEditModal] = useState();
  // esta funcion se llama cuando clico el boton update y da valores al selected item
  // de la row y activa el modal
  const handleEdit = (row) => {
    setSelectedItem(row);
    setEditModal(true);
  }

  const fetchData = () => {
    getList()
    .then(items => {
        setList(items)
    })}
  // Brgins the data to set the state to the product list
  useEffect(() => {
    fetchData()
  }, [])


  // Brgins the data to set the state to the category list
  useEffect(() => {
    let mounted = true;
    getCategory()
      .then(category => {
        if (mounted) {
          setCategory(category)
        }
      })
    return () => mounted = false;
  }, [])


  const columns = [{
    dataField: 'idproducts',
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
    dataField: 'cid',
    text: 'Product category',
    sort: true
  },
  {
    dataField: 'uid',
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
        onEdit={() => handleEdit(row)}
      />
    }
  }
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const deleteItem = async (id) => {
    await fetch(`http://localhost:4040/api/product/${id}`, {
      method: 'DELETE'
    })
    fetchData()
  }


  return (
    <div style={{ marginLeft: 25, marginRight: 25 }}>
      <div style={{ margin: 10 }}>
        {/*el toogle muestra el modal */}
        <InsertModal toggle={() => setEditModal(false)} buttonLabel="Insert product" />
      </div>
      <BootstrapTable
        keyField="id"
        data={list}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
      />
      <UpdateModal
        fetch={() => fetchData}
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        // la prop selected item me carga los datos en el modal
        selectedItem={selectedItem}
      />
    </div>
  )
}

export default Table;