import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom/dist';

export const Navbar = () => {

    const [date, setDate] = useState('(choose date)')

    const handleDateInputChange = (e) => {
      setDate(e.target.value);
      console.log(date)
    };

    const openMenu = () => {
      document.getElementById('resp-menu').style.display = 'flex';
      document.getElementById('burger').style.color = 'transparent'
    };
  
    const closeMenu = () => {
      document.getElementById('resp-menu').style.display = 'none';
      document.getElementById('burger').style.color = 'white'
      
    };
  

  return (
    <div>
        <nav>
            <ul className='menu'>
              <li>
                <Link to={'/'}>Todays photo</Link>
              </li>
              <li>
                <input type="date" name="date" id="date-inp" onChange={handleDateInputChange}/>
                <Link to={`/specified_img/${date}`} style={{fontSize: '1.5rem'}}>See a picture of {date}</Link>
              </li>
              <li>
              <Link to={`/neo`} >Nearest Earth Object</Link>
              </li>
            </ul>
            <ul className='resp-menu' id='resp-menu'>
            <a href="#" id="closeX" onClick={closeMenu}>
            &times;
            </a>
            <li>
                <Link to={'/'}>Todays photo</Link>
              </li>
              <li className='d-li'>
                <input type="date" name="date" id="date-inp" onChange={handleDateInputChange}/>
                <Link to={`/specified_img/${date}`} >See a picture NASA chosen this day!</Link>
              </li>
              <li>
              <Link to={`/neo`} >Nearest Earth Object</Link>
              </li>
            </ul>
          
            <span id="burger" onClick={openMenu}>
              &#9776;
            </span>
        </nav>
    </div>
  )
}
