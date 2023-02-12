import React from 'react';
import Home from "./Pages/Home";
import './App.css'
import {Provider as ReduxProvider} from 'react-redux';
import store from './redux/store';
import Header from "./components/Header";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {useTranslation, withTranslation} from "react-i18next";


const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: ['Cairo', 'sans-serif'].join(','),
            fontSize: 16,
        },
    },

});

function BostaApp() {
    const {i18n} = useTranslation();
    document.body.dir = i18n.dir();
    return (
        <ThemeProvider theme={theme}>
            <ReduxProvider store={store}>
                <div className="App">
                    <Header></Header>
                    <Home/>
                </div>
            </ReduxProvider>
        </ThemeProvider>

    );
}

export default withTranslation()(BostaApp);
