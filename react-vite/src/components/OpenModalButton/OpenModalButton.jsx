import { useModal } from '../../context/Modal';
import React from 'react';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  pinId, // optional: for passing in pinId to EditPin modal
  boardId
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(React.cloneElement(modalComponent, { pinId, boardId }));
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick} className={className}>{buttonText}</button>;
}

export default OpenModalButton;
