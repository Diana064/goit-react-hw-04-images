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
  const [showButton, setShowButton] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  //   componentDidUpdate(prevProps, prevState) {
  //     const { page, pictureName } = this.state;

  //     if (pictureName !== prevState.pictureName) {
  //       this.setState({ page: 1, status: 'pending', images: [] });
  //       this.getImages(page, pictureName);
  //       return;
  //     }
  //     if (page > prevState.page) {
  //       this.getImages(page, pictureName);
  //       return;
  //     }
  // }
  // useEffect(() => {
  //   getImages(page, pictureName);
  // }, [page, pictureName]);
  // useEffect(() => {
  //   setPage(1);
  //   setStatus('pending');
  //   setImages([]);
  //   getImages(page, pictureName);
  // }, [pictureName, page]);

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
        setStatus('resolved');
        setTotalHits(totalHits);
        showButton(page < Math.ceil(totalHits / 12));
      })

      .catch(error => setError(error), setStatus('rejected'));

    console.log(showButton);
  };

  const onSubmitFormHandler = pictureName => {
    if (pictureName) {
      setPictureName(pictureName);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    // if (status === 'pending') {
    //   return <Loader />;
    // }
    // if (status === 'rejected') {
    //   return <div>{error}</div>;
    // }
    // if (status === 'rejected') {
    //   return (
    //     <div className={css.App}>
    //       <Searchbar onSubmit={onSubmitFormHandler} />
    //       <ImageGallery images={images} />
    //       {showButton && <Button onClick={loadMore}>Load More</Button>}
    //     </div>
    //   );
    // }

    <div className={css.App}>
      <Searchbar onSubmit={onSubmitFormHandler} />
      <ToastContainer />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <div>{error}</div>}
      {status === 'rejected' && (
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

// export class App extends Component {
//   state = {
//     status: 'idle',
//     page: 1,
//     pictureName: '',
//     images: null,
//     showModal: false,
//     largeImageURL: '',
//     error: null,
//     showButton: false,
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, pictureName } = this.state;

//     if (pictureName !== prevState.pictureName) {
//       this.setState({ page: 1, status: 'pending', images: [] });
//       this.getImages(page, pictureName);
//       return;
//     }
//     if (page > prevState.page) {
//       this.getImages(page, pictureName);
//       return;
//     }
//   }
//   getImages = (page, pictureName) => {
//     fetch(
//       `${BASE_URL}q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         return Promise.reject(
//           new Error(`Something wrong with this request ${pictureName}`)
//         );
//       })
//       .then(({ hits, totalHits }) => {
//         const imagesList = hits.map(
//           ({ id, webformatURL, largeImageURL, tags }) => {
//             return {
//               id,
//               webformatURL,
//               largeImageURL,
//               tags,
//             };
//           }
//         );
//         this.setState(({ images }) => ({
//           images: [...images, ...imagesList],
//           status: 'resolved',
//           totalHits,
//           showButton: this.state.page < Math.ceil(totalHits / 12),
//         }));
//       })

//       .catch(error => this.setState({ error, status: 'rejected' }));

//     console.log(this.state.showButton);
//   };

//   onSubmitFormHandler = pictureName => {
//     if (pictureName) {
//       this.setState({ pictureName });
//     }
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {
//     const { images, status, error } = this.state;
//     if (status === 'pending') {
//       return <Loader />;
//     }
//     if (status === 'rejected') {
//       return <div>{error.message}</div>;
//     }
//     if (status === 'resolved') {
//       return (
//         <div className={css.App}>
//           <Searchbar onSubmit={this.onSubmitFormHandler} />
//           <ImageGallery images={images} />
//           {this.state.showButton && (
//             <Button onClick={this.loadMore}>Load More</Button>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.onSubmitFormHandler} />
//         <ToastContainer />
//         {/* {showButton && <Button onClick={this.loadMore}>Load More</Button>} */}
//       </div>
//     );
//   }
// }
