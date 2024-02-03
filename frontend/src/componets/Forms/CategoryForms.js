import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CategoryForms = ({ handleSubmit, value, setValue, isEditing }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(value);
      }}
    >
      <Form.Group className="mb-3" controlId="text">
        <Form.Control
          type="text"
          placeholder={
            isEditing ? "Enter Updated Category Name" : "Enter Category Name"}  required={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        {isEditing ? "Update" : "Add"}
      </Button>
    </Form>
  );
};

export default CategoryForms;
