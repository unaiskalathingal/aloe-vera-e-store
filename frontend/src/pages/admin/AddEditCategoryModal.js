import React from "react";
import Modal from "react-bootstrap/Modal";
import CategoryForms from "../../components/Forms/CategoryForms";

const AddEditCategoryModal = ({ show, handleClose, handleUpdate, initialCategory }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialCategory ? "Edit Category" : "Add Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryForms
          handleSubmit={(name) => {
            handleUpdate(name);
            handleClose();
          }}
          value={initialCategory ? initialCategory.name : ""}
          setValue={() => {}} 
          isEditing={!!initialCategory} // For the modal edit form
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddEditCategoryModal;
