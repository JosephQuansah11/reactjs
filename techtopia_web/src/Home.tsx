import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation.tsx';
import SecurityContextProvider from './security/contextProviders/SecurityContextProvider.tsx';
import SettingsContextProvider from './security/contextProviders/SettingsContextProvider.tsx';

// Here is the start of the navigation bar
type HeaderProps = {
    onOpenDrawer: () => void
}

const Header = ({ onOpenDrawer }: HeaderProps) => (
    <AppBar position="relative" color="transparent" className='nav'>
        <Toolbar sx={{ justifyContent: 'flex-start' }}>
            <IconButton onClick={onOpenDrawer}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6">React Tech-Topia</Typography>
        </Toolbar>
    </AppBar>
)


// Navigation is a component from the Navigation file
const Nav = ({ setDrawerOpen, drawerOpen }: { setDrawerOpen: (value: boolean) => void, drawerOpen: boolean }) => (
    <nav>
        <SettingsContextProvider>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Header onOpenDrawer={() => setDrawerOpen(!drawerOpen)} />
                    <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
                </BrowserRouter>
            </SecurityContextProvider>
        </SettingsContextProvider>
    </nav>
)
// here is the end of the navigation bar code


//Here is the start of the footer code
const Footer = () => (
    <footer style={{ height: '100%', margin: '0', padding: '0' }}>
        <a href="https://www.freepik.com/vectors/cartoon">Cartoon vector created by freepik - www.freepik.com</a>
        <a href="https://www.kdg.be">@ Karel de Grote Hogeschool</a>
    </footer>
)

// here is the end of the footer code

// body theme
const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: {
            main: 'rgba(241, 248, 253, 1)',
        },
    },
})
// end of body theme

export function Home() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Nav setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
            <h1>Welcome to React Tech-Topia</h1>
            <p>Check our the various tickets to the park of your choice </p>
            <body>
                <main>
                this shows tickets
                </main>
            </body>
            <footer>
                <Footer />
            </footer>
        </ThemeProvider >
    )
}