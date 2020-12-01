import React, { useState, useEffect, useCallback } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import InsertModal from '../components/InsertModal'
import UpdateModal from '../components/UpdateModal'
import Actions from '../components/Actions'
import { getList } from '../services/list'


const Table = () => {
  // states from the api
  const [list, setList] = useState([]);
  //const [category, setCategory] = useState([]);

  // selected item state to gives it to the modal
  const [selectedItem, setSelectedItem] = useState();

  // moda state
  const [editModal, setEditModal] = useState();
  // Gives the values from thr row to the selected items and dispose or show the modal
  const handleEdit = (row) => {
    setSelectedItem(row);
    setEditModal(true);
  }

  // brings the data from the appi
  // const fetchData = () => {
  //   getList()
  //   .then(items => {
  //     console.log(items)
  //       setList(items)
  //   })}

  // using the hook useCallback to get the data from the api
  const fetchData = useCallback(() => {
    getList((data) => {
      if (data) {
        setList(data)
      }
    })
  }, [])

  // rerender after an edit
  useEffect(() => {
    fetchData()
  }, [fetchData, editModal])

  const insert = () => {
    fetchData()
  }

  // Api call to delete the item then fetch the new data
  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:4040/api/product/${id}`, {
        method: 'DELETE'
      })
      fetchData()
    } catch (err) {
      window.alert("Error: " + err)
    }
  }

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
    dataField: 'category',
    text: 'Product category',
    sort: true
  },
  {
    dataField: 'uid',
    text: 'User id',
    sort: true
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: (cell, row, rowIndex) => {
      // Actions of deleting or updating
      return <Actions
        row={row}
        onDelete={deleteItem}
        onEdit={() => handleEdit(row)}
      />
    }
  }
  ];

  const defaultSorted = [{
    dataField: 'idproducts',
    order: 'asc'
  }];



  return (
    <div style={{ marginLeft: 25, marginRight: 25 }}>
      <div style={{ margin: 10 }}>
        <InsertModal fetchData={insert} buttonLabel="Insert product" />
      </div>
      <BootstrapTable
        keyField="idproducts"
        data={list}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
      />
      <UpdateModal
        fetch={() => fetchData}
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        selectedItem={selectedItem}
      />
    </div>
  )
}

export default Table;