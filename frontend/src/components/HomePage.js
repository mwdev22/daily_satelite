import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const HomePage = () => {

    const [img,setImg] = useState({});
    const [date,setDate] = useState('');

    const handleDateInputChange = (e) => {
      setDate(e.target.value);
      console.log(date)
    };
  
    
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/today_img')
        .then((response) => {
            console.log(response.data)
            setImg(response.data)
        })
    },[])
  return (
    <div>
        <main className='main-container' style={{backgroundImage: `url(${img.url})`}}>    
            <section>
              <label for="date"></label>
              <input type="date" name="date" id="" onChange={handleDateInputChange}/>
              <Link to={`/specified_img/${date}`} >See a picture NASA chosen this day!</Link>
            </section>
        </main>
    </div>
  )
}
