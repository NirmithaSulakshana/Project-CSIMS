import React from "react";
import "../../components/styles/add-new-item.css";
const AddNewItem = () => {

    return (
      <div id="add-new-item-container">
      
        <h2>Add New Item</h2>
        <form id="add-new-item-form">
          <label>Item Name</label>
          <input type="text" name="item-name" placeholder="Type Item Name" />
          <label>Botonical Name</label>
          <input type="text" name="botonical-name" placeholder="Type Botonical Name" />
          <label>Unit Price</label>
          <input type="number" name="unit-price" placeholder="Enter Unit Price" />
          <label>Barcode Number</label>
          <input type="text" name="barcode-number" placeholder="Enter Barcode Number" />
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