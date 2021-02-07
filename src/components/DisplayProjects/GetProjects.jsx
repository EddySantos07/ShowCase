import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore , { Navigation, Pagination, Controller, Thumbs } from "swiper";

// Import Swiper styles
import 'swiper/swiper.scss';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const GetProjects = () => {

  const [currentProjects, setProjects] = useState([]);

  useEffect( () => {

    axios.get('/GetAllProjects')
    .then( (data) => {
      console.log(data, 'this is data');
      // i then take the objs / data and set state and rerender the projects
      
    })
    .catch((err) => {
      console.log(err);
    });


  }) 

  return (
      <div className="ProjectHouseContainer"> house projects
        
      </div>
    ); 
}

export default GetProjects;
