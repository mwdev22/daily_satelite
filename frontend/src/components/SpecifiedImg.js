import React from 'react'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from './Navbar'

export const SpecifiedImg = () => {
    
    const [img, setImg] = useState({});

    const date = useParams().date

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/img_detail?date=${date}`)
            .then((response) => {
                console.log(response.data);
                setImg(response.data);
            }) .catch((error) => {
                console.error('error getting photo', error);
                console.log(error)
              });
    }, [date]);  

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
    );
}
