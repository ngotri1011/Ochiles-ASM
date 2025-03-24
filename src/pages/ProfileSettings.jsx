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

// // ProfileSettings.js
// import React, { useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
// import { Avatar, Box, Button, Container, TextField, Typography, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';

// const ProfileSettings = () => {
//     const user = auth.currentUser ;

//     const [name, setName] = useState(user ? user.displayName : '');
//     const [email, setEmail] = useState(user ? user.email : '');
//     const [password, setPassword] = useState(''); // Password input for updating
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isEditingName, setIsEditingName] = useState(false);
//     const [isEditingEmail, setIsEditingEmail] = useState(false);
//     const [isEditingPassword, setIsEditingPassword] = useState(false);

//     useEffect(() => {
//         if (user) {
//             setName(user.displayName || '');
//             setEmail(user.email || '');
//         }
//     }, [user]);

//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSuccessMessage('');
//         setErrorMessage('');

//         try {
//             // Update display name
//             if (isEditingName) {
//                 await updateProfile(user, { displayName: name });
//                 setIsEditingName(false);
//             }

//             // Update email if it's changed
//             if (isEditingEmail && email !== user.email) {
//                 await updateEmail(user, email);
//                 setIsEditingEmail(false);
//             }

//             // Update password if it's provided
//             if (isEditingPassword && password) {
//                 await updatePassword(user, password);
//                 setIsEditingPassword(false);
//             }

//             setSuccessMessage("Profile updated successfully!");
//         } catch (error) {
//             setErrorMessage(error.message);
//         }
//     };

//     return (
//         <Container sx={{ my: 15, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "background.paper", p: 4, borderRadius: 2 }}>
//             {user && (
//                 <>
//                     <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100 }} />
//                     <Box sx={{ maxWidth: 400, ml: 5 }}>
//                         <Typography variant="h4" gutterBottom>{user.displayName}</Typography>
//                         <Typography variant="h6" gutterBottom>{user.email}</Typography>
//                         <form onSubmit={handleSubmit}>
//                             {isEditingName ? (
//                                 <TextField
//                                     label="Name"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     value={name}
//                                     onChange={handleNameChange}
//                                 />
//                             ) : (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <Typography variant="body1">{name}</Typography>
//                                     <IconButton onClick={() => setIsEditingName(true)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                 </Box>
//                             )}
//                             {isEditingEmail ? (
//                                 <TextField
//                                     label="Email"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     type="email"
//                                     value={email}
//                                     onChange={handleEmailChange}
//                                 />
//                             ) : (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <Typography variant="body1">{email}</Typography>
//                                     <IconButton onClick={() => setIsEditingEmail(true)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                 </Box>
//                             )}
//                             {isEditingPassword ? (
//                                 <TextField
//                                     label="Password"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     type="password"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                 />
//                             ) : (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <Typography variant="body1">********</Typography>
//                                     <IconButton onClick={() => setIsEditingPassword(true)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                 </Box>
//                             )}
//                             <Button type="submit" variant="contained" color="primary" fullWidth>
//                                 Update
//                             </Button>
//                         </form>
//                         {successMessage && <Typography color="green">{successMessage}</Typography>}
//                         {errorMessage && <Typography color="red">{errorMessage}</Typography>}
//                     </Box>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default ProfileSettings;