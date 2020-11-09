import React, { useEffect, useState } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Actions from '../components/Actions';
import EditRow from '../components/EditRow';
import NewRow from '../components/NewRow';
import { db } from '../config/init-firebase'

const Tabla = () => {

    const [selectedItem, setSelectedItem] = useState();
    const [rowEdit, setRowEdit] = useState();
    const [row, setRow] = useState([]);
    const [columns, setColumns] = useState([{
        dataField: 'id',
        text: 'ID del producto',
        sort: true,
        filter: textFilter({placeholder:'Buscar una ID'})
    }, {
        dataField: 'name',
        text: 'Nombre del producto',
        sort: true,
        filter: textFilter({placeholder:'Buscar un nombre'})
    }, {
        dataField: 'price',
        text: 'Precio del producto',
        sort: true,
        filter: textFilter({placeholder:'Buscar un precio'})
    },
    {
        dataField: 'actions',
        text: 'Acciones',
        formatter: (cell, row, rowIndex) => {
            return <Actions
                row={row}
                onDelete={deleteItem}
                onEdit={() => setSelectedItem(row)}
            />
        }
    }])

    const uid = localStorage.getItem('uid');
    const datos = []
    const loadData = () => {
        db.collection(uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                console.log(doc.data().name)
                datos.push({
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price, 
                })
            });
            setRow(datos);
        });
    }

    useEffect(() => {
        loadData()
    }, [])
    

    const deleteItem = (id) => {
        setRow((prevRow) =>
            prevRow.filter((row) => row.id !== id)
        )
        
        db.collection(uid).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }


    return (
        <div>
            <span>Bienvenido Admin</span>
            <span>
                <button type="button"
                    className="btn btn-success"
                    data-target="#newModal"
                    data-toggle="modal"
                    style={{ margin: "5px" }}
                >
                    Insertar producto
                </button>
            </span>
            <BootstrapTable
                keyField='id'
                data={row}
                columns={columns}
                filter={filterFactory()}
            />
            <EditRow selectedItem={selectedItem}
             itemID={row.id} 
             rowEdit={rowEdit} 
             row={row} 
             setRow={setRow}
             handleRefreshData={() => loadData()}           
              />
            <NewRow setRow={setRow} 
                handleRefreshData={() => loadData()}             
            />
        </div>
    )
}

export default Tabla;