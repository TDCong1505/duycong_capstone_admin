import { Modal } from 'antd';
import React from 'react';
import styles from './ModalPopup.module.scss';

export default function ModalPopup({
  visible,
  handleCancelModal,
  handleConfirmModal,
  title,
  children,
  maskClosable = true,
  transition = 'zoom',
  closeBtn = false,
  width = 520,
  textCancel = 'Huỷ bỏ',
  textConfirm = 'Đồng ý',
  isConfirmBtn = true,
  isCancelBtn = true,
  // isClickOnMask,
  iconTopRight,
  positionAction = 'end',
  titleStyle = {},
  className,
}) {
  return (
    <Modal
      className={className}
      wrapClassName="modal-global"
      transitionName={`ant-${transition}`}
      closable={closeBtn}
      width={width}
      footer={null}
      visible={visible}
      maskClosable={maskClosable}
      onCancel={e => {
        e.stopPropagation();
        if (handleCancelModal) {
          handleCancelModal();
        }
      }}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <div className={styles.title} style={titleStyle}>
            {title}
          </div>
          {iconTopRight && <div className={styles.icon_right}>{iconTopRight}</div>}
        </div>
        <div className={styles.modal_content}>{children}</div>
        {(isCancelBtn || isConfirmBtn) && (
          <div className={`${styles.modal_action} justify-content-${positionAction}`}>
            {isCancelBtn && (
              <button type="button" onClick={handleCancelModal} className={styles.modal_cancel}>
                {textCancel}
              </button>
            )}
            {isConfirmBtn && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleConfirmModal();
                }}
                className={`${styles.modal_confirm} ${!isCancelBtn && styles.btn_only}`}>
                {textConfirm}
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
