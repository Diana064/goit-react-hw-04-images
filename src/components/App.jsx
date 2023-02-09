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
import pictureApi from './services/PictureApi';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [pictureName, setPictureName] = useState('');
  const [images, setImages] = useState([]);
  const [, setError] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [, setTotalHits] = useState(0);

  useEffect(() => {
    const getImages = (page, pictureName) => {
      pictureApi
        .fetchPicture(pictureName, page)
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
          setImages(prevState => [...prevState, ...imagesList]);
          setTotalHits(totalHits);
          setShowButton(page < Math.ceil(totalHits / 12));
          setStatus('resolved');
        })

        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    };
    if (pictureName) {
      getImages(page, pictureName);
    }
  }, [page, pictureName]);

  const onSubmitFormHandler = pictureName => {
    if (pictureName) {
      setPictureName(pictureName);

      setPage(1);
      setStatus('pending');
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>Oh, something went wrong</div>}
      <div className={css.App}>
        <Searchbar onSubmit={onSubmitFormHandler} />
        <ImageGallery images={images} />
        <ToastContainer />
        {showButton && <Button onClick={loadMore}>Load More</Button>}
      </div>
    </>
  );
}
