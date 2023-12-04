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
         <Navbar />
         <main className='main-container'>
        
            <section className='det-con'>
                <div className='img-s'>
                    <div className='image' style={{backgroundImage: `url(${img?.url})`}}>
                    </div>
                </div>
                <aside className='p-info'>
                        <h5>{img.title}</h5>
                        <p>{img.explanation}</p>
                    </aside>
            </section>      
            </main>
    </div>
  )
}
