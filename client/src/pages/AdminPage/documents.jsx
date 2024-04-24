import React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from "@mui/material";

const Documents = () => {
  

  // Function to generate a PDF
  const generatePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

  
    doc.setTextColor('green');
    // Add custom content to the PDF
    doc.text('Custom Document', 10, 10);

    // Define the table data and columns
    const data = [
      ['Item_name', 'Botnical_name', 'Unit_price', 'Shipped_quantity'],
    ];

    // Add the table to the PDF
    doc.autoTable({
      startY: 30, // Starting point for the table
      head: [data[0]], // Table header
      body: data.slice(1), // Table body (excluding the header)
    });

    // Save the PDF file
    doc.save('custom_document.pdf');
  };
    return (
      <div>
        {/* Content for Documents section */}
        <h2>Documents Section</h2>
        <Button onClick={generatePDF}
          variant="contained"
          color="secondary"
          style={{
            
            textTransform: "none",
            backgroundColor: "red",
            color: "white",
            fontSize: "17px",
            marginRight: "75%",
            marginTop: "10px",
            width: "300px",
          }}
          sx={{
            borderRadius: "9px",
          }}
         
          >
            Generate Custom PDF
          </Button>
          

      </div>
    );
  };

  export default Documents;