import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import logoEn from '../images/logo-en.png'
import logoAr from '../images/logo-ar.svg'
import Arabic from '../images/icons8-egypt-48.png'
import English from '../images/icons8-usa-48.png'
import {Box, Typography} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";
import i18n from "i18next";


export default function Header() {
    const language = useSelector((state: any) => state.language);
    const dispatch = useDispatch();


    const handleLanguageChange = (language: string) => {
        dispatch({type: 'SET_LANGUAGE', language});
        i18n.changeLanguage(language);


    };


    useEffect(() => {
        console.log('language', language)
    }, [language]);


    return (
        <AppBar
            style={{
                backgroundColor: 'white', display: "flex", justifyContent: "space-between"
                , flexDirection: "row", padding: 15
            }}
            position="static">

            {
                language === 'en' ?
                    (<img
                            width={125}
                            height={55}
                            src={logoEn}
                            alt={'logo'}
                            loading="lazy"
                        />
                    ) : (<img
                            width={125}
                            height={55}
                            src={logoAr}
                            alt={'logo'}
                            loading="lazy"
                        />
                    )}
            <Box
                display={"flex"}
                flexDirection={"row"}
                textAlign={"center"}
                alignItems={"center"}
                style={{
                    cursor: "pointer"
                }}
                onClick={() => {
                    handleLanguageChange(language === 'en' ? 'ar' : 'en')
                }
                }>
                <Typography style={{
                    color: "#E30613",
                    marginInlineEnd: 5,
                }} fontWeight={600} variant="h6" component="h6">
                    {language === 'en' ? 'AR' : 'EN'}
                </Typography>

                <img width={40} height={40}
                     style={{
                         marginInlineEnd: 15,
                     }} alt={'language'}
                     src={language === 'en' ? Arabic : English}/>

            </Box>


        </AppBar>
    );
}