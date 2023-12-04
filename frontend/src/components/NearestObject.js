import React from 'react'
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import axios from 'axios';


export const NearestObject = () => {
    const [neoData, setNeoData] = useState({})
  
    
    useEffect(() => {

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
        <Navbar />
        <main className='main-container'>    
            
            <section className='neo-section'>
                <h5 style={{fontSize: '3rem'}}>Asteroid {neoData.name} parameters</h5>
                <div className='cols'>
                <aside className='ast-info'>
                    <h2>Velocity</h2>
                    <h1>{neoData.relative_velocity?.kilometers_per_hour} kilometers per hour</h1>
                    <h1>{neoData.relative_velocity?.kilometers_per_second} kilometers per second</h1>
                    <h1>{neoData.relative_velocity?.miles_per_hour} miles per hour</h1>
                    
                </aside> 
                <aside className='ast-info'>
                    <h2>Asteroid info</h2>
                    {neoData.hazardous === 'false' ? (<h2> Object is not potentially hazardous </h2>) : (<h2> Object potentially hazardous </h2>)}
                    <h1>Orbiting around: {neoData.orbiting_body}</h1>
                </aside> 
                <aside className='ast-info'>
                    <h2>Distance To Earth</h2>
                    <h1>Kilometers: {neoData.miss_distance?.kilometers}</h1>
                    <h1>Miles: {neoData.miss_distance?.miles}</h1>
                    <h1>Lunar: {neoData.miss_distance?.lunar}</h1>
                </aside> 
                </div>
            </section>
        </main>
    </div>
  )
}
