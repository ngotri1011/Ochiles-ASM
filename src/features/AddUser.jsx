import React from 'react'
import { useState } from 'react';
import { addUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';

export default function AddUser() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div>
            <TextField
                label="Name"
                name="name"
                value={name}
                onChange={(event) => { setName(event.target.value); }}
            />
            <TextField
                name="username"
                label="Username"
                value={username}
                onChange={(event) => { setUsername(event.target.value); }}
            />
            <Button onClick={() => {
                dispatch(addUser({ id: 0, name: name, username: username }));
            }}
            >
                Add user
            </Button>
        </div>
    )
}
