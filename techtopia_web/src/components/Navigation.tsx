import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import BoardsIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/SettingsApplications'
import AboutIcon from '@mui/icons-material/InfoOutlined'
import { Link } from 'react-router-dom'
import { AuthHeader } from './AuthHeader.tsx'

interface NavigationProps {
    isOpen: boolean
    onClose: () => void
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
    return (
        <div style={{
            width: "100vh"
        }}>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{ width: 250 }}>
                    {[
                        { label: 'Tickets', link: '/', icon: <BoardsIcon /> },
                        { label: 'Settings', link: '/settings', icon: <SettingsIcon /> },
                        { label: 'About', link: '/about', icon: <AboutIcon /> },
                        { label: 'Attractions', link: '/attractions', icon: <BoardsIcon /> },
                        { label: 'Create Park', link: '/create-park', icon: <BoardsIcon /> }
                    ].map((menuItem) => (
                        <ListItem disableGutters key={menuItem.link}>
                            <ListItemButton component={Link} to={menuItem.link} onClick={onClose}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                        <AuthHeader />
                </List>
            </Drawer>
        </div>
    )
}
