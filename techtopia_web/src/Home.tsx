import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SecurityContextProvider from './security/contextProviders/SecurityContextProvider.tsx';
import SettingsContextProvider from './security/contextProviders/SettingsContextProvider.tsx';
import { ShowTicketTypes } from './components/tickets/TicketTypes.tsx';
import RouteGuard from './components/RouteGuard.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShowTicketForm } from './components/tickets/TicketForm.tsx';
import { ShowTicketInfo } from './components/tickets/TicketInfo.tsx';
import ShowPark from './components/parks/ShowPark.tsx';
import ParkMap from './components/parks/ParkMap.tsx';
import { ShowAllParkAttractions, ShowParkAttraction } from './components/parks/ShowParkAttractions.tsx';
import { FoundTheme } from './components/Settings.tsx';
import { Navigation } from './components/Navigation.tsx';
import Settings from './components/Settings.tsx';
import { CreateParkForm } from './components/parks/CreateParkForm.tsx';
import { TicketAgent } from './components/parks/TicketAgent.tsx';
import { CreateTicketForm } from './components/tickets/CreateTicketForm.tsx';

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
        <Header onOpenDrawer={() => setDrawerOpen(!drawerOpen)} />
        <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
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


const queryClient = new QueryClient()


export function Home() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const storedTheme = localStorage.getItem('theme');
    const themeObject = storedTheme ? JSON.parse(storedTheme) : FoundTheme;
    const someTheme = createTheme(themeObject);
    return (
        <ThemeProvider theme={someTheme}>
            <SettingsContextProvider>
                <SecurityContextProvider>
                    <BrowserRouter>
                        <Nav setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
                        <div>
                            <h1>Welcome to React TechTopia</h1>
                            <p>Check out the various ticket types to the park of your choice</p>
                        </div>
                        <main>
                            <QueryClientProvider client={queryClient}>
                                <Routes>
                                    <Route path='/create-tickets' element={<RouteGuard component={<CreateTicketForm />} />} />
                                    <Route path='/park/:id/tickets/:ticket_agent' element={<RouteGuard component={<ShowTicketTypes />} />} />
                                    <Route path='/settings' element={<RouteGuard component={<Settings />} />} />
                                    <Route path='/about/:id' element={<RouteGuard component={<TicketAgent />} />} />
                                    <Route path="/park/:id/purchase-form/:ticket_type/:ticket_agent" element={<RouteGuard component={<ShowTicketForm />} />} />
                                    <Route path='/ticket_info/:id/ticket/:username' element={<RouteGuard component={<ShowTicketInfo />} />} />
                                    <Route path='/' element={<RouteGuard component={<ShowPark />} />} />
                                    <Route path='/map/:id' element={<RouteGuard component={<ParkMap />} />} />
                                    <Route path='/attractions/:id' element={<RouteGuard component={<ShowParkAttraction />} />} />
                                    <Route path='/attractions' element={<RouteGuard component={<ShowAllParkAttractions />} />} />
                                    <Route path='/create-park' element={<RouteGuard component={< CreateParkForm/>} />} />
                                </Routes>
                            </QueryClientProvider>
                        </main>
                        <footer>
                            <Footer />
                        </footer>
                    </BrowserRouter>
                </SecurityContextProvider>
            </SettingsContextProvider>
        </ThemeProvider>
    )
}