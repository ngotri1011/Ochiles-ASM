import React from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { deleteUser, updateUsername } from './userSlice';
import { Button, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function UserList() {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.users.value);
    const [newUsername, setNewUsername] = useState('');

    return (
        <div>
            {userList.map((user) => {
                <ListItem key={user.id} >
                    <ListItemText primary={user.name} secondary={user.username} />
                    <TextField
                        placeholder='Type new username...'
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            dispatch(updateUsername({ id: user.id, username: newUsername }));
                        }}>
                        Update
                    </Button>
                    <IconButton aria-label="delete" color="error"
                        onClick={() => {
                            dispatch(deleteUser({ id: user.id }));
                        }}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </ListItem>
            })}
        </div>
    )
}
