import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function QuantitySelector({ quantity, setQuantity }) {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Box display="flex" alignItems="center" sx={{ border: '1px grey solid', borderRadius: 1, padding: 1 }}>
      <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
        <RemoveIcon />
      </IconButton>

      <Typography variant="body1" sx={{ mx: 2 }}>
        {quantity}
      </Typography>

      <IconButton onClick={handleIncrease}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}
