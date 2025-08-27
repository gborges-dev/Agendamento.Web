import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '16px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <BottomNavigation
        sx={{
          width: 500,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Alunos"
          value="/alunos"
          icon={<GroupsIcon />}
        />
        <BottomNavigationAction
          label="Aulas"
          value="/aulas"
          icon={<CalendarIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}