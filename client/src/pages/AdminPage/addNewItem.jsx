import React from "react";

import Button from "react-bootstrap/Button";
//this is a library is a allows you to validate informatiuons
import * as Yup from "yup";
//this is for creating forms and validation
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import "../../components/styles/addNewItem.css";

const AddNewItem = () => {
  //this is a object for initial values
  const initialValues = {
    itemName: "",
    unitPrice: "",
    supplierPrice: "",
    quantity: "",
    botnicalName: "",
    barcodeNumber: "",
    cooled: "false",
    crushed: "false",
    reacted: "false",
  };

  const onSubmit = (data, { resetForm }) => {
    //this is the place we want to call the api request and submit the data on to the data base
    axios
      .post("http://localhost:3001/api/items/addItem", data)
      .then((response) => {
        console.log("Add a new Item");
      });
    resetForm();
  };

  //this is an object containg each one of the fields that we need in our form
  //Using yup we can specify whta exactly we need to validate
  const validationSchrma = Yup.object().shape({
    //thes are the validation that we check
    itemName: Yup.string().required("Add a name"),
    unitPrice: Yup.number().required("Add unit price"),
    supplierPrice: Yup.number().required("Add supplier price"),
    quantity: Yup.number().required("what is the qty"),
    botnicalName: Yup.string().required("Add a Botnical name"),
    barcodeNumber: Yup.number().required("Add a Bar code"),
    cooled: Yup.boolean(),
    crushed: Yup.boolean(),
    reacted: Yup.boolean(),
  });

  return (
    <>
      <div>
        {/* Content for Add New Item section */}
        <h2>Add New Item Section</h2>
      </div>

      <div className="addnew">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchrma}
        >
          <Form className="formContainer">
            <label className="addLabel">Item Name: </label>
            <ErrorMessage
              name="itemName"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="itemName"
              placeholder="Enter Item name"
            />
            <label className="addLabel">Unit Price: </label>
            <ErrorMessage
              name="unitPrice"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="unitPrice"
              placeholder="Price"
            />
            <label className="addLabel">Quantity: </label>
            <ErrorMessage
              name="quantity"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="quantity"
              placeholder="KG"
            />
            <label className="addLabel">Supplier Price: </label>
            <ErrorMessage
              name="supplierPrice"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="supplierPrice"
              placeholder="Price"
            />
            <label className="addLabel">Botanical Name: </label>
            <ErrorMessage
              name="botnicalName"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="botnicalName"
              placeholder="name"
            />
            <label className="addLabel">Barcode No: </label>
            <ErrorMessage
              name="barcodeNumber"
              component="span"
              className="error-message"
            />
            <Field
              autocomplete="off"
              id="inputAddItem"
              name="barcodeNumber"
              placeholder="No:#"
            />
            <label className="addLabel">Behaviours: </label>
            {/* -------------------------Cooled check------------------------------ */}
            <div className="btnRadio">
              <label className="btnStyle">
                <Field type="radio" name="cooled" value="true" />
                Cooled
              </label>
              <label className="btnStyle">
                <Field type="radio" name="cooled" value="false" />
                Not Cooled
              </label>
              <ErrorMessage
                name="cooled"
                component="span"
                className="error-message"
              />
            </div>
            {/* -----------------------------Reactive--------------------------- */}
            <div className="btnRadio">
              <label className="btnStyle">
                <Field type="radio" name="reacted" value="true" />
                Reactive
              </label>
              <label className="btnStyle">
                <Field type="radio" name="reacted" value="false" />
                Not Reactive
              </label>
              <ErrorMessage
                name="reacted"
                component="span"
                className="error-message"
              />
            </div>
            {/* ------------------------------Crushed--------------------------- */}
            <div className="btnRadio">
              <label className="btnStyle">
                <Field type="radio" name="crushed" value="true" />
                Crushed
              </label>
              <label className="btnStyle">
                <Field type="radio" name="crushed" value="false" />
                Not Crushed
              </label>
              <ErrorMessage
                name="crushed"
                component="span"
                className="error-message"
              />
            </div>
            {/* -----------------------------Btns------------------------------ */}
            <Button type="reset" variant="success" size="lg">
              Reset
            </Button>{" "}
            <Button type="submit" variant="success" size="lg">
              Add
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddNewItem;
