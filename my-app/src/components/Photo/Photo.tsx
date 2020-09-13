import React, { useEffect } from "react";
import style from "./Photo.module.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

interface PhotoProps {
  source: string;
  description: string;
  name: string;
  author: string;
  bigSource: string;
  id: string;
}

interface OnePhoto {
  location?: {
    title?: string;
  };
}

const Photo: React.FC<PhotoProps> = ({
  source,
  description,
  bigSource,
  name,
  author,
  id,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [onePhoto, setOnePhoto] = React.useState({
    location: {
      title: "",
    },
  });

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) getOnePhoto(id);
  }, [isOpen, id]);

  const getOnePhoto = async (ii: string) => {
    try {
      await axios
        .get(
          `https://api.unsplash.com/photos/${ii}/?client_id=11bLaqxMPCYviq6R_9KfjrrGjjZRov6IpTNMRx8oexY`
        )
        .then((res) => {
          const photo = res.data;
          setOnePhoto(photo);
          console.log(photo);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={style.Content}>
        <img
          className={style.Image}
          onClick={showModal}
          src={source}
          alt={description}
        />
      </div>
      <Modal size={"lg"} show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <div className={style.Profile}>
            <div className={style.ProfileBox}>
              <img className={style.ProfileImage} src={author} alt={name} />
              <div className={style.NameBox}>{name}</div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={style.ModalBody}>
            <img
              className={style.PictureInModal}
              src={source}
              alt={description}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={style.Location}>{onePhoto.location.title}</div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Photo;
