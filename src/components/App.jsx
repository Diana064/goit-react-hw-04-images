/* eslint-disable no-sequences */

import { Loader } from './loader/Loader';
import { Searchbar } from './searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './imageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const API_KEY = '31465649-f1ff204e289e0f72e30576924';
const BASE_URL = 'https://pixabay.com/api/?';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [pictureName, setPictureName] = useState('');
  const [images, setImages] = useState(null);

  const [error, setError] = useState(null);
  const [showButton] = useState(false);
  const [, setTotalHits] = useState(0);

  useEffect(() => {
    const getImages = (page, pictureName) => {
      fetch(
        `${BASE_URL}q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Something wrong with this request ${pictureName}`)
          );
        })
        .then(({ hits, totalHits }) => {
          const imagesList = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return {
                id,
                webformatURL,
                largeImageURL,
                tags,
              };
            }
          );

          setImages([...images, ...imagesList]);

          setTotalHits(totalHits);
          showButton(page < Math.ceil(totalHits / 12));
          setStatus('resolved');
        })

        .catch(error => setError(error), setStatus('rejected'));

      console.log(images);
    };
    getImages(page, pictureName);
  }, [page, pictureName]);

  const onSubmitFormHandler = pictureName => {
    if (pictureName) {
      setPictureName(pictureName);
    }
    setPage(1);
    setStatus('pending');
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmitFormHandler} />
      <ToastContainer />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>{error}</div>}
      {status === 'resolved' && (
        <div className={css.App}>
          <Searchbar onSubmit={onSubmitFormHandler} />
          <ImageGallery images={images} />
          {showButton && <Button onClick={loadMore}>Load More</Button>}
        </div>
      )}

      {/* {showButton && <Button onClick={this.loadMore}>Load More</Button>} */}
    </div>
  );
}
