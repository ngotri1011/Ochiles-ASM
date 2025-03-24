// ProfileSettings.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { Avatar, Box, Button, Container, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfileSettings = () => {
    const user = auth.currentUser;

    const [name, setName] = useState(user ? user.displayName : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('********'); // Placeholder for password
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Container sx={{ my: 15, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "background.paper", p: 20, borderRadius: 8 }}>
            {user && (
                <>
                    <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100 }} />
                    <Box sx={{ maxWidth: 400, ml:5 }}>
                        <Typography variant="h4" gutterBottom>{user.displayName}</Typography>
                        <Typography variant="h6" gutterBottom>{user.email}</Typography>
                        <form>
                            {isEditingName ? (
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="body1">{name}</Typography>
                                    <IconButton onClick={() => setIsEditingName(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            )}
                            {isEditingEmail ? (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="body1">{email}</Typography>
                                    <IconButton onClick={() => setIsEditingEmail(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            )}
                            {isEditingPassword ? (
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="body1">{password}</Typography>
                                    <IconButton onClick={() => setIsEditingPassword(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            )}
                            <Button type="button" variant="contained" color="primary" fullWidth onClick={() => {
                                setIsEditingName(false);
                                setIsEditingEmail(false);
                                setIsEditingPassword(false);
                            }}>
                                Update
                            </Button>
                        </form>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ProfileSettings;