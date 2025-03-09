import { Box, Button, TextField, IconButton, Avatar } from "@mui/material";
import React from "react";
import UsersData from "../../Share/ListOfUsers";
import { Container } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from 'react';
import { addUser } from '../../features/Users';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { deleteUser, updateUsername } from '../../features/Users';

export default function AddUser() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const UsersData = useSelector((state) => state.users.value);
  const [newUsername, setNewUsername] = useState('');


  return (
    <Container style={{ margin: "50px" }}>
      <Box component="form" display="flex" gap={2} mb={3}>
        <TextField label="Name" variant="outlined" size="small" value={name} onChange={(event) => { setName(event.target.value); }} />
        <TextField label="Username" variant="outlined" size="small" value={username} onChange={(event) => { setUsername(event.target.value); }} />
        <Button variant="contained" onClick={() => { dispatch(addUser({ id: 0, name: name, username: username })); }}>Add User</Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {UsersData.map((user) => (
          <Box
            key={user.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            borderRadius={2}
            bgcolor="white"
            boxShadow={1}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar />
              <Box>
                <h4 style={{ margin: 0 }}>{user.name}</h4>
                <p style={{ margin: 0, color: "gray" }}>{user.username}</p>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Type new username..."
                sx={{ width: "200px" }}
                onChange={(e)=>setNewUsername(e.target.value)}
              />
              <Button variant="contained" color="primary"   onClick={()=>{dispatch(updateUsername({id: user.id, username: newUsername})); }}>
                Update
              </Button>
              <IconButton color="error" onClick={()=> { dispatch(deleteUser({id: user.id})); }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
