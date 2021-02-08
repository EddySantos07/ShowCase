import React, { useState, useEffect } from "react";
import axios from "axios";

// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from "swiper";

// // Import Swiper styles
// import "swiper/swiper.scss";

// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/scrollbar/scrollbar.scss";

// import "../../../dist/styles.css";

// SwiperCore.use([Navigation, Pagination, Controller, Thumbs]); // tell swiper to use these methods

const GetProjects = () => {
  const [currentProjects, setProjects] = useState([]);

  const GetDocumentsFromCollection = async (collections) => {
    // second phase of rendering project photos

    let result = await axios
      .put("/GetDocumentsFromCollection", {
        collections: collections,
      })
      .then((documents_and_collections) => {
        return documents_and_collections;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  };

  useEffect(async () => {
    await axios //first phase of rendering project photos
      .get("/GetAllProjects")
      .then(async (data) => {
        console.log(data, "this is data from getting all collections");

        let documents_and_collections = await GetDocumentsFromCollection(
          data.data
        ); // finding documents from collections!

        console.log(documents_and_collections);
      })
      .catch((err) => {
        console.log(err);
      });

    //stop any infinite loops https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffectÎ
  }, []);

  return (
    <>
      {/* <Swiper >

      </Swiper> */}
      <div>lol</div>
    </>
  );
};

export default GetProjects;
