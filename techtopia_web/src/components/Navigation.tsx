import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import BoardsIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/SettingsApplications'
import AboutIcon from '@mui/icons-material/InfoOutlined'
import { Link } from 'react-router-dom'
import { AuthHeader } from './AuthHeader.tsx'
import SecurityContext from '../security/contexts/SecurityContexts.ts'
import { useContext } from 'react'

interface NavigationProps {
    isOpen: boolean
    onClose: () => void
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
    const { roles } = useContext(SecurityContext)
    return (
        <div style={{
            width: "100vh"
        }}>
            <Drawer open={isOpen} onClose={onClose}>
                <List sx={{ width: 250 }}>
                    {
                    roles== 'admin'? [
                        {label: 'Home', link: '/', icon: <BoardsIcon />},
                        { label: 'Tickets', link: '/park:id/tickets', icon: <BoardsIcon /> },
                        { label: 'Settings', link: '/settings', icon: <SettingsIcon /> },
                        { label: 'About', link: '/about', icon: <AboutIcon /> },
                        { label: 'Attractions', link: '/attractions', icon: <BoardsIcon /> },
                        { label: 'Create Park', link: '/create-park', icon: <BoardsIcon /> },
                        { label: 'Create Ticket', link: '/create-tickets', icon: <BoardsIcon /> }
                    ].map((menuItem) => (
                        <ListItem disableGutters key={menuItem.link}>
                            <ListItemButton component={Link} to={menuItem.link} onClick={onClose}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        </ListItem>
                    )):
                    [
                        {label: 'Home', link: '/', icon: <BoardsIcon />},
                        { label: 'Settings', link: '/settings', icon: <SettingsIcon /> },
                        { label: 'About', link: '/about', icon: <AboutIcon /> },
                        { label: 'Attractions', link: '/attractions', icon: <BoardsIcon /> },
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

