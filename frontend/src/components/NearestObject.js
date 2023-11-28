import React from 'react'
import { useState } from 'react';
import { Navbar } from './Navbar';
import axios from 'axios';

export const NearestObject = () => {

    const [img,setImg] = useState({});
    comst [neoData, setNeoData] = useState({})
  
    
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/today_img')
        .then((response) => {
            console.log(response.data)
            setImg(response.data)
        }).catch((error) => {
            console.log(error)
            console.error('error getting img')
        })

        axios.get('http://127.0.0.1:5000/api/neo')
        .then((response) => {
            console.log(response.data)
            setNeoData(response.data)
        }).catch((error) => {
            console.log(error)
            console.error('error getting neo data')
        })
    },[])

  return (
    <div>
        <main className='main-container' style={{backgroundImage: `url(${img.url})`}}>    
            <Navbar />
            <section className='neo-section'>
                <h5>Current Nearest Earth Object Parameters</h5>
                <aside>
                    <h3>Asteroid info</h3>
                </aside>
                <aside>
                    <h3></h3>
                </aside>
            </section>
        </main>
    </div>
  )
}
