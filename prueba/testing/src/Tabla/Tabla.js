import React, { useState } from 'react'
import './styles.css'

const Row = ({id, title, priority, type, complete, remove}) => (
    <div className="row">
      <div className="remove">
        <button onClick={() => remove(id)}>X</button>
      </div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{priority}</div>
      <div>{type}</div>    
      <div>{complete}</div>    
    </div>
  );

const Tabla = () => {

      const [data, setData] = useState ([
        {id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100}, 
        {id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30}, 
        {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
        ])

      
      
    
      const remove = (rowId) => {
        const arrayCopy = data.filter((row) => row.id !== rowId);
        setData(arrayCopy);
      };
        
  
        const rows = data.map((rowData) => <Row remove={remove} {...rowData } />);
    
        return (
          <div className="table">
            <div className="header">
              <div className="remove"></div>
              <div >ID</div>
              <div >Title</div>
              <div >Priority</div>
              <div >Issue Type</div>
              <div >% Complete</div>
            </div>
            <div className="body">
              {rows}
            </div>
          </div>
        );
    }


export default Tabla