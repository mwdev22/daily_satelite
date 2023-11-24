import React from 'react'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const SpecifiedImg = () => {
    
    const [img, setImg] = useState({});

    const date = useParams().date

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/img_detail?date=${date}`)
            .then((response) => {
                console.log(response.data);
                setImg(response.data.url);
            }) .catch((error) => {
                console.error('error getting photo', error);
                console.log(error)
              });
    }, [date]);  

    return (
        <div>
            <main className='main-container' style={{backgroundImage: `url(${img.url})`}}>
            </main>
        </div>
    );
}
