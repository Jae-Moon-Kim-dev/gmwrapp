import React, { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';

interface ModalConfig {
    headerContent?: ReactNode, 
    bodyContent?: ReactNode,
    closeLabel?: string,
}

const CommonModal = <CommonModalProps extends ModalProps & ModalConfig>(props: CommonModalProps):ReactNode => {
    const { headerContent, bodyContent, closeLabel } = props;

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>
            { headerContent }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
            { bodyContent }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{closeLabel ?? '닫기'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;