import { useState } from 'react';
import { createTheme } from '@mui/material';

export let FoundTheme = createTheme();

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#29b6f6', // Blue color
            light: '#4fc3f7',
            dark: '#42a5f5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffffff', // White color
        },
        background: {
            default: '#29b6f6', // Blue background color
            paper: '#42a5f5', // White background color for paper elements
        },
        text: {
            primary: '#ffffff', // White color for text
            secondary: '#0000ff', // Blue color for secondary text
        },
        contrastThreshold: 4.5,
    },
    // Additional customizations can be added here
});


const summerTheme = createTheme({
    palette: {
        primary: {
            main: '#FFD700',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            main: '#000',
        },
        background: {
            default: '#FFD700', // Blue background color
            paper: '#000', // White background color for paper elements
        },
        text: {
            primary: '#ffffff', // White color for text
            secondary: '#FFD700', // Gold color for secondary text
        },
        contrastThreshold: 4.5,
    },
});



const themes = {
    winter: { ...defaultTheme },
    summer: { ...summerTheme },
};


const Settings = () => {
    const [selectedTheme, setSelectedTheme] = useState('summer');
    const [currentSelectedTheme, setCurrentSelectedTheme] = useState(createTheme());
    const handleThemeChange = (themeName: string) => {
        setSelectedTheme(themeName);
        themeName === 'summer' ? setCurrentSelectedTheme(themes.summer) : setCurrentSelectedTheme(themes.winter);
        FoundTheme = currentSelectedTheme;
        localStorage.clear()
        localStorage.setItem('theme', JSON.stringify(FoundTheme));
    };

    return (
        <div>
            <h2>Theme Settings</h2>
            <button onClick={() => handleThemeChange('winter')}>Winter Theme</button>
            <button onClick={() => handleThemeChange('summer')}>Summer Theme</button>
            <p>Selected Theme: {selectedTheme}</p>
            <div style={{ width: '100%', height: '100px', background: currentSelectedTheme.palette.primary.main, display: 'flex', justifyContent: 'center', alignSelf: 'center' }}></div>
        </div>
    );
};


export default Settings;

export function CurrentTheme() {
    return (
        FoundTheme
    );
}
