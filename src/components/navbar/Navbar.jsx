import React, { useEffect, useState } from 'react';
import orchidLogo2 from '../../assets/images/orchid-logo-dall-E-removebg-preview.png';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useThemeContext } from "../../darkmode/ThemeContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  InputBase,
  Container,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from '@mui/material/styles';
import { UserAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const pages = ['Home', 'News', 'About', 'Contact', 'List'];
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #B03052',
  marginLeft: theme.spacing(2),
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 0 8px rgba(176, 48, 82, 0.3)',
    transform: 'translateY(-2px)'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: '#B03052',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)'
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "text.secondary",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    width: '100%',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(176, 48, 82, 0.05)'
    }
  },
}));

export default function Navbar() {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut, googleSignIn } = UserAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error);
    }
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={orchidLogo2} alt="Orchiles Logo" style={{ width: "50px", marginRight: '10px' }} />
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }
              }}>
                Orchiles
              </Typography>
            </NavLink>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s ease'
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={handleClose}
                    component={NavLink}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(176, 48, 82, 0.1)',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 26 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: location.pathname === item.path ? 'primary.main' : 'gray',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    borderBottom: location.pathname === item.path ? '2px solid #dc004e' : 'none',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: '2px solid #dc004e',
                      transform: 'translateY(-2px)',
                      color: 'primary.main'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Search sx={{borderRadius: '10px'}}>
            <StyledInputBase
              placeholder="Search orchids..."
              value={searchQuery}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>

          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg)',
                backgroundColor: 'rgba(176, 48, 82, 0.1)'
              }
            }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            {user?.displayName ? (
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.email} src={user.photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" ><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={handleSignOut}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                startIcon={<LoginIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    borderColor: '#d2e3fc',
                    backgroundColor: '#f8f9fa'
                  }
                }}
              >
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
