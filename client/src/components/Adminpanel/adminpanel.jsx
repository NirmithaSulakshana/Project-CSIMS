import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import NewRequest from "../ListItems/documents"
import AddNewItem from "../ListItems/addNewItem"
import UpdateItems from "../ListItems/updateItems"
import Orders from "../ListItems/orders"
import Documents from "../ListItems/documents"
import Packing from "../ListItems/packing"

const AdminPanel = () => {
    const [selectedSection, setSelectedSection] = useState('newRequest');
  
    const renderSection = () => {
      switch (selectedSection) {
        case 'newRequest':
          return <NewRequest />;
        case 'addNewItem':
          return <AddNewItem />;
        case 'updateItems':
          return <UpdateItems />;
        case 'orders':
          return <Orders />;
        case 'packing':
          return <Packing />;
        case 'documents':
          return <Documents />;
        default:
          return null;
      }
    };
  
    return (
      <div style={{ display: 'flex' }}>
        <Box 
            
            flex={1} 
            p={2} 
            sx={{display : {xs:"none", sm: "block", marginTop: "10%"}}}>
       
                <List style={{ width: '20%', padding: '10px', borderRight: '1px solid #ccc' }}>
                <ListItem button onClick={() => setSelectedSection('newRequest')}>
                    <ListItemText primary="New Request" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setSelectedSection('addNewItem')}>
                    <ListItemText primary="Add New Item" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setSelectedSection('updateItems')}>
                    <ListItemText primary="Update Items" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setSelectedSection('orders')}>
                    <ListItemText primary="Orders" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setSelectedSection('packing')}>
                    <ListItemText primary="Packing" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setSelectedSection('documents')}>
                    <ListItemText primary="Documents" />
                </ListItem>
                </List>
        </Box>
  
        {/* Display selected section content */}
        <div style={{ flex: 1, padding: '10px', marginTop: "10%" }}>
          {renderSection()}
        </div>
      </div>
    );
  };
  
  export default AdminPanel;