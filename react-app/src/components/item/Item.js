import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function Item() {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>

      <Button onClick={openModal} outline rounded >
        Details
      </Button>
      <Modal
        show={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <Modal.Header>
                <Modal.Title>Tet</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>        
                <Button style={{ marginLeft: "auto" }} variant="secondary" onClick={closeModal}>Close</Button>
             </Modal.Body>
        </Modal> 
    </div>
  );
}