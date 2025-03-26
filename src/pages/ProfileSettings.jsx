import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";

const ProfileSettings = () => {
  const user = auth.currentUser;

  // Use user UID to keep per-user data
  const userKey = user ? `user_${user.uid}` : "guest";
  const storedData = JSON.parse(sessionStorage.getItem(userKey)) || {};

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [gender, setGender] = useState(storedData.gender || "male");
  const [phone, setPhone] = useState(storedData.phone || "");
  const [address, setAddress] = useState(storedData.address || "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("success");

  // Reset fields on user change
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");

      const newUserData = JSON.parse(sessionStorage.getItem(`user_${user.uid}`)) || {};
      setGender(newUserData.gender || "male");
      setPhone(newUserData.phone || "");
      setAddress(newUserData.address || "");
    } else {
      setGender("male");
      setPhone("");
      setAddress("");
    }
  }, [user]);

  // Handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleGenderChange = () => setGender(gender === "male" ? "female" : "male");
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarMessage("");

    try {
      await updateProfile(user, { displayName: name });

      // Save data per user UID
      sessionStorage.setItem(
        userKey,
        JSON.stringify({ gender, phone, address })
      );

      setSnackbarMessage("Profile updated successfully!");
      setSnackbarVariant("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVariant("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Container
      sx={{
        my: 15,
        backgroundColor: "background.paper",
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user && (
        <>
          <Typography variant="h2" sx={{ fontWeight: "normal" }}>
            User Profile
          </Typography>
          <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
          <Box sx={{ maxWidth: 400, width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
              />
              <FormControlLabel
                control={<Switch checked={gender === "male"} onChange={handleGenderChange} />}
                label={`Gender: ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
                sx={{ display: "block", mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address}
                onChange={handleAddressChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </form>
          </Box>
        </>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarVariant} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileSettings;


// import React, { useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { Avatar, Box, Button, Container, TextField, Typography, IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';

// const ProfileSettings = () => {
//     const user = auth.currentUser;

//     const [name, setName] = useState(user ? user.displayName : '');
//     const [email, setEmail] = useState(user ? user.email : '');
//     const [password, setPassword] = useState('********'); // Placeholder for password
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

//     return (
//         <Container sx={{ my: 15, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "background.paper", p: 20, borderRadius: 8 }}>
//             {user && (
//                 <>
//                     <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100 }} />
//                     <Box sx={{ maxWidth: 400, ml:5 }}>
//                         <Typography variant="h4" gutterBottom>{user.displayName}</Typography>
//                         <Typography variant="h6" gutterBottom>{user.email}</Typography>
//                         <form>
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
//                                     <Typography variant="body1">{password}</Typography>
//                                     <IconButton onClick={() => setIsEditingPassword(true)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                 </Box>
//                             )}
//                             <Button type="button" variant="contained" color="primary" fullWidth onClick={() => {
//                                 setIsEditingName(false);
//                                 setIsEditingEmail(false);
//                                 setIsEditingPassword(false);
//                             }}>
//                                 Update
//                             </Button>
//                         </form>
//                     </Box>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default ProfileSettings;