import React from "react";
import {useFormik} from "formik";
import "../../components/styles/add-new-item.css";
import { addnewitemvalidation } from "../../schema/addnewitemvalidation";

const initialValues = {
  itemName: "",
  botonicalName: "",
  unitPrice: "",
  barcodeNumber: ""
};

const AddNewItem = () => {
    const {values, handleBlur , handleChange, handleSubmit, errors} = useFormik({
      initialValues: initialValues,
      validationSchema: addnewitemvalidation,
      onSubmit: values => {
        console.log(values);
      }
    })
  
    return (
      <div id="add-new-item-container">
      
        <h2>Add New Item</h2>
        <form id="add-new-item-form" onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input type="text" name="itemName" placeholder="Type Item Name" onBlur={handleBlur} onChange={handleChange} value={values.itemName} />
          {errors.itemName && <small>{errors.itemName}</small>} 
          <label>Botonical Name</label>
          <input type="text" name="botonicalName" placeholder="Type Botonical Name" onBlur={handleBlur} onChange={handleChange} value={values.botonicalName} />
          {errors.botonicalName && <small>{errors.botonicalName}</small>}
          <label>Unit Price</label>
          <input type="number" name="unitPrice" placeholder="Enter Unit Price"  onBlur={handleBlur} onChange={handleChange} value={values.unitPrice} />
          {errors.unitPrice && <small>{errors.unitPrice}</small>}
          <label>Barcode Number</label>
          <input type="text" name="barcodeNumber" placeholder="Enter Barcode Number" onBlur={handleBlur} onChange={handleChange} value={values.barcodeNumber} />
          {errors.barcodeNumber && <small>{errors.barcodeNumber}</small>}
          <label>Behaviours</label>
          <select name="behaviours" class="behaviours">
            <option value="cool">Cool</option>
            <option value="not-cool">Not-Cool</option>
          </select>
          <div class="add-new-item-buttons">
            <button type="submit">Add </button>
            <button type="submit">Reset </button>
            <button type="submit">Cancel </button>
          </div>
          </form>
        

      </div>
      
    );
  };

  export default AddNewItem;