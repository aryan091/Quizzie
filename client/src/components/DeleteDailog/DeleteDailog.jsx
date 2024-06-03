import React from 'react';
import './DeleteDailog.css';
const DeleteDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-dialog-overlay ">
      <div className="delete-dialog-container ">
        <h2 className="delete-dialog-title" style={{ lineHeight: '60px' }}>
          Are you confirm you want to delete?
        </h2>
        <div className="delete-dialog-buttons" style={{ gap: '4rem' }}>
          <button 
            onClick={onConfirm} 
            className="delete-dialog-confirm-button"
          >
            Confirm Delete
          </button>
          <button 
            onClick={onCancel} 
            className="delete-dialog-cancel-button "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
