import React, {useState, useEffect} from 'react'
import FormattedTime from './FormattedTime';

export default function Clock({name='World', apellido}) {
  
    const [date, setDate] = useState(new Date().toLocaleTimeString());

    const tick = () => {
        setDate(new Date().toLocaleTimeString())
    };

    useEffect(() => {
            const int = setInterval (
            () => tick(),
            1000
        );
        return () => {
            clearInterval(int)
        }
    }, [date]);

    
    return (
      <div>
        <h1>Hello, {name} {apellido} !</h1>
        <FormattedTime date={date} />
      </div>
    );  
  }
  
