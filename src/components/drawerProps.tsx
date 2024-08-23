import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

export const DrawerProps = () => {
    return (
        <List>
            {Object.entries(ROUTES).map(([text, value]) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to={value.route}>
                        <ListItemIcon>{value.icon}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};
