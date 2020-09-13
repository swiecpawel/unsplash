import React, { useEffect, useState } from "react";
import style from "./Gallery.module.css";
import Search from "../Search/Search";
import Photo from "../Photo/Photo";
import { useParams } from "react-router";
import axios from "axios";
import Masonry from 'react-masonry-css'

const Gallery: React.FC = () => {

  const [photos, setPhotos] = useState([]);
  let { query } = useParams();

  useEffect(() => {
    console.log(query);
    getPhotos(query);
  }, [query]);

  const getPhotos = async (q: string) => {
    try {
      await axios
        .get(
          `https://api.unsplash.com/search/photos?query=${q}&client_id=11bLaqxMPCYviq6R_9KfjrrGjjZRov6IpTNMRx8oexY&per_page=40`
        )
        .then((res) => {
          const photo = res.data.results;
          setPhotos(photo);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.Content}>
      <div className={style.SearchBar}>
        <Search />
      </div>
      <div className={style.Query}>
        {query}
      </div>
      <div className={style.GalleryBox}>
          <Masonry
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {photos.map((p: any) => {
                  return (
                      <Photo
                          key={p.id}
                          source={p.urls.small}
                          description={p.alt_description}
                          id={p.id}
                          name={p.user.name}
                          author={p.user.profile_image.medium}
                          bigSource={p.urls.full}
                      />
                  );
              })}
          </Masonry>

      </div>
    </div>
  );
};

export default Gallery;
