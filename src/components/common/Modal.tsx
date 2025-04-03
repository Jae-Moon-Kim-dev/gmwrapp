import { ModalConfig } from '@/app/types/common/modal';
import React, { ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';

const CommonModal = <CommonModalProps extends ModalProps & ModalConfig>(props: CommonModalProps):ReactNode => {
    const { header, body, close_label } = props;

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>
            { header }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
            { body }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{close_label ?? '닫기'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;