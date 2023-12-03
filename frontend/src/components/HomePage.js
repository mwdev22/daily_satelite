import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';

export const HomePage = () => {

    const [img,setImg] = useState({});
  
    
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
            <Navbar />

            <section className='main-cont'>

            </section>
        </main>
    </div>
  )
}
