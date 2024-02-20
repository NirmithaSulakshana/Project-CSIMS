import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AttachMoney, Exposure, Person, Search,} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const UpdateStock = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: '',
    itemName: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit form data to your backend here
  };

  return (
    <div>
      {/* Content for New Request section */}
      <br/>
      <h2>Update Stock Section</h2>
      <br/>
      <div className="form">
          <form onSubmit={handleSubmit}>
            <div>
                <label style={{paddingRight : "69%", marginBottom : "10px"}}>Supplier Name</label>
                <br/>
                <TextField
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Supplier Name"
                  inputProps={{
                    style : 
                    { width: '700px', 
                      borderRadius: "9px", 
                      backgroundColor : "white",
                      height : "10px",
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                    },

                  }}
                  
                  
                />
                <Person style = {{marginLeft : "100px", marginTop : "10px"}} />
  
            </div>
            <br/>
            <div>
            <label style={{paddingRight : "71%", marginBottom : "10px"}}>Item Name</label>
            <br/>
            
            <TextField
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              inputProps={{
                style : 
                { width: '700px', 
                  borderRadius: "9px", 
                  backgroundColor : "white",
                  height : "10px",
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                },

              }}
              
              
            />
            <Search style = {{marginLeft : "100px", marginTop : "10px"}} />
            </div>
            <br/>
            <div>
            <label style={{paddingRight : "73%", marginBottom : "10px"}}>Quantity</label>
            <br/>
           
            <TextField
              
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              inputProps={{
                style : 
                { width: '700px', 
                  borderRadius: "9px", 
                  backgroundColor : "white",
                  height : "10px",
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                },

              }}
              
            />
            <Exposure style = {{marginLeft : "100px", marginTop : "10px"}} />
            </div>
            <div>
          
            <br/>
            <label style={{paddingRight : "75%", marginBottom : "10px"}}>Price</label>
            <br/>
            
            <TextField
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              inputProps={{
                style : 
                { width: '700px', 
                  borderRadius: "9px", 
                  backgroundColor : "white",
                  height : "10px",
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                },

              }}
              
            />
            <AttachMoney style = {{marginLeft : "100px", marginTop : "12px"}}/>
            </div>
            <br/>
            <div style = {{marginTop: "80px", marginRight : "160px"}}>
            <Button 
              onClick={() => Navigate("/SalesManagerOrders")}
              
               variant="contained"
               color="secondary" 
               style={{
                   textTransform: 'none',
                   backgroundColor: 'green', 
                   color: 'white', 
                   fontSize: "17px",
                   marginRight : "40px",
                   width : "150px"
               }}
                   sx={{
               
                   borderRadius: '9px', 
                   }}>{" "}
                  Orders
            </Button>
            <Button  
                        type="submit"
                        variant="contained"
                        color="secondary" 
                        style={{
                            textTransform: 'none',
                            backgroundColor: 'red', 
                            color: 'white', 
                            fontSize: "17px",
                            width : "150px"
                        }}
                            sx={{
                        
                            borderRadius: '9px', 
                            }}>
                        Update
            </Button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default UpdateStock;
