import React from "react";
import Form from "react-bootstrap/Form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "react-bootstrap/Button";

const UpdateItems = () => {
  return (
    <div>
      <div style={{ paddingTop: "35px" }}>
        {/* Content for Update Items section */}
        <h2>Update Items </h2>
      </div>
      <div style={{ paddingTop: "35px" }}>
        <Form>
          <Form.Label
            style={{
              paddingRight: "58%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Barcode No
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter barcode No"
            name="Barcode_No"
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "58%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Item Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type here"
            name="Item_Name"
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "55%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Botanical Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type here"
            name="Botanical_Name"
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "59%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Unit Price
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type here"
            name="Unit_Price"
            style={{ width: "700px" }}
          />
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            style={{ paddingRight: "58%", marginTop: "25px" }}
          >
            Behaviours
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              value="Cooled"
              control={<Radio />}
              label="Cooled"
            />
            <FormControlLabel
              value="Not Cooled"
              control={<Radio />}
              label="Not Cooled"
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              value="Reactive"
              control={<Radio />}
              label="Reactive"
            />
            <FormControlLabel
              value="Not Reactive"
              control={<Radio />}
              label="Not Reactive"
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              value="Crushed"
              control={<Radio />}
              label="Crushed"
            />
            <FormControlLabel
              value="Not Crushed"
              control={<Radio />}
              label="Not Crushed"
            />
          </RadioGroup>
          <Button variant="success" size="lg">
            Reset
          </Button>{" "}
          <Button variant="success" size="lg">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateItems;
