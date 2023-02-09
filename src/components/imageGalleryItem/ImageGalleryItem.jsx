import React from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../modal/Modal';
import { useState } from 'react';

export default function ImageGalleryItem({
  largeImageURL,
  webformatURL,
  tags,
}) {
  const [largeURL, setLargeURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onModalShow = () => {
    setLargeURL(largeImageURL);

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          onClick={onModalShow}
          className={css.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeURL} tags={tags} />
      )}
    </>
  );
}

// export class ImageGalleryItem extends React.Component {
//   state = {
//     largeImageURL: '',
//     showModal: false,
//   };

//   onModalShow = () => {
//     const { largeImageURL } = this.props;
//     this.setState({ largeImageURL });
//     this.toggleModal();
//     console.log(this.state);
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { webformatURL, tags } = this.props;
//     const { showModal, largeImageURL } = this.state;
//     return (
//       <>
//         <li className={css.ImageGalleryItem}>
//           <img
//             onClick={this.onModalShow}
//             className={css.ImageGalleryItem_image}
//             src={webformatURL}
//             alt={tags}
//           />
//         </li>
//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}
//       </>
//     );
//   }
// }
