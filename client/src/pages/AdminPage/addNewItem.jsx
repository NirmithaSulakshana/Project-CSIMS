import React from "react";
import "../../components/styles/add-new-item.css";
const AddNewItem = () => {

    return (
      <div id="add-new-item-container">
      
        <h2>Add New Item</h2>
        <form id="add-new-item-form">
          <label>Item Name</label>
          <input type="text" name="item-name" />
          <label>Botonical Name</label>
          <input type="text" name="botonical-name" />
          <label>Unit Price</label>
          <input type="number" name="unit-price" />
          <label>Barcode Number</label>
          <input type="text" name="barcode-number" />
          <label>Behaviours</label>
          <select name="behaviours" class="behaviours">
            <option value="cool">Cool</option>
            <option value="not-cool">Not-Cool</option>
          </select>

          </form>
        

      </div>
      
    );
  };

  export default AddNewItem;