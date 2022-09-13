import './App.css';
import Main from "./Components/Main";
import { createTheme } from '@mui/material/styles';

export const theme: createTheme = {
    palette: {
        type: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#00e5ff',
        },
    },
};


function App() {

    return (
        <div className="App">
            <header className="App-header">
                <Main />
            </header>
        </div>

  );
}

export default App;
