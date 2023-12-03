import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom/dist';

export const Navbar = () => {

    const [date, setDate] = useState('')

    const handleDateInputChange = (e) => {
      setDate(e.target.value);
      console.log(date)
    };
  

  return (
    <div >
        <nav>
            <ul>
              <li>
                <Link to={'/'}>Todays photo</Link>
              </li>
              <li>
                <input type="date" name="date" id="date-inp" onChange={handleDateInputChange}/>
                <Link to={`/specified_img/${date}`} >See a picture NASA chosen this day!</Link>
              </li>
            </ul>
        </nav>
    </div>
  )
}
