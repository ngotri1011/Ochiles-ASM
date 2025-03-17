import React, { useState } from "react";
import { Container, Box, TextField, FormControl, FormControlLabel, Checkbox, Button, Typography, Select, MenuItem, Snackbar, Alert, Grid, Paper, IconButton, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styled from '@emotion/styled';

const ContactInfoCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const ContactInfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'translateY(-2px)',
    },
}));

function Contact() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            content: "",
            major: "",
            agree: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            email: Yup.string().required("Required.").email("Invalid email"),
            content: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            major: Yup.string().required("Please select an orchid."),
            agree: Yup.boolean().oneOf([true], "The terms and conditions must be accepted."),
        }),
        onSubmit: (values) => {
            // Show success message
            setSnackbar({
                open: true,
                message: `Thank you for your interest in ${values.major}! We will contact you soon at ${values.email} to discuss your inquiry.`,
                severity: 'success'
            });
            // Reset form
            formik.resetForm();
        },
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 16, mb: 8 }}>
            <Grid container spacing={4}>
                {/* Contact Form Section */}
                <Grid item xs={12} md={7}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'background.paper',
                            padding: { xs: 3, md: 6 },
                            borderRadius: 2,
                            boxShadow: 3,
                            position: 'relative',
                            overflow: 'hidden',
                            height: '100%',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: (theme) => theme.palette.primary.main,
                            }
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                mb: 4,
                                textAlign: 'center'
                            }}
                        >
                            Contact Us
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            sx={{
                                width: '100%',
                                maxWidth: '600px'
                            }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email address"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ mb: 3 }}
                            />

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                    value={formik.values.major}
                                    onChange={formik.handleChange}
                                    name="major"
                                    displayEmpty
                                    error={formik.touched.major && Boolean(formik.errors.major)}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: formik.touched.major && formik.errors.major ? 'error.main' : 'inherit'
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled>Select your favorite orchid</MenuItem>
                                    <MenuItem value="Taichung Beauty">Taichung Beauty</MenuItem>
                                    <MenuItem value="Golden Sunset">Golden Sunset</MenuItem>
                                    <MenuItem value="Moonlit Pearl">Moonlit Pearl</MenuItem>
                                    <MenuItem value="Lavender Mist">Lavender Mist</MenuItem>
                                </Select>
                                {formik.touched.major && formik.errors.major && (
                                    <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                                        {formik.errors.major}
                                    </Typography>
                                )}
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Message"
                                name="content"
                                multiline
                                rows={4}
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                error={formik.touched.content && Boolean(formik.errors.content)}
                                helperText={formik.touched.content && formik.errors.content}
                                sx={{ mb: 3 }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formik.values.agree}
                                        onChange={formik.handleChange}
                                        name="agree"
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography color="text.secondary">
                                        I agree to the terms and conditions
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                            {formik.touched.agree && formik.errors.agree && (
                                <Typography color="error" variant="caption" display="block" sx={{ mb: 2 }}>
                                    {formik.errors.agree}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                        transition: 'transform 0.2s',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Get in Touch Section */}
                <Grid item xs={12} md={5}>
                    <ContactInfoCard elevation={3}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                mb: 3
                            }}
                        >
                            Get in Touch
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Have questions about our orchids? We're here to help! Reach out to us through any of the following channels.
                        </Typography>

                        <ContactInfoItem>
                            <LocationOnIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    123 Orchid Lane, Garden City,<br />
                                    GC 12345
                                </Typography>
                            </Box>
                        </ContactInfoItem>

                        <ContactInfoItem>
                            <PhoneIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    (+84) 909 000 000<br />
                                    (+84) 909 000 000
                                </Typography>
                            </Box>
                        </ContactInfoItem>

                        <ContactInfoItem>
                            <EmailIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    info@orchiles.com<br />
                                    support@orchiles.com
                                </Typography>
                            </Box>
                        </ContactInfoItem>

                        <ContactInfoItem>
                            <AccessTimeIcon color="primary" />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Business Hours</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                    Saturday: 10:00 AM - 4:00 PM<br />
                                    Sunday: Closed
                                </Typography>
                            </Box>
                        </ContactInfoItem>

                        <Divider sx={{ my: 3 }} />

                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Follow Us
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <SocialButton aria-label="Facebook">
                                    <FacebookIcon />
                                </SocialButton>
                                <SocialButton aria-label="Instagram">
                                    <InstagramIcon />
                                </SocialButton>
                                <SocialButton aria-label="Twitter">
                                    <TwitterIcon />
                                </SocialButton>
                                <SocialButton aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </SocialButton>
                            </Box>
                        </Box>
                    </ContactInfoCard>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{
                        width: '100%',
                        '& .MuiAlert-message': {
                            fontSize: '1rem',
                            fontWeight: 500
                        }
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Contact;
