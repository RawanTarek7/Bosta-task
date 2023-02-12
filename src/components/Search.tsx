import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {Backdrop, CircularProgress, FormControl, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {ITracking} from "../interfaces/tracking.interface";


const styles = {
    direction: {
        marginInlineEnd: '-8px'

    },
    iconButton: {
        backgroundColor: 'white',
    }
    ,

    title: {
        fontWeight: 600
        , marginTop: 70,
        color: "#475467", marginBottom: 25
    },
}


export const Search = (props: any) => {
    const [trackingNumber, setTrackingNumber] = useState('')
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const {t} = useTranslation();
    const placeHolder = t('Tracking_No')
    const [shipmentDetails, setShipmentDetails] = useState<ITracking>()
    const handleClickSearch = () => {
        setOpen(!open);
        axios
            .get('https://tracking.bosta.co/shipments/track/' + trackingNumber)
            .then((response) => {
                setShipmentDetails(response.data)
                props.setData(shipmentDetails)
                props.trackingNo(trackingNumber)
                setOpen(false)
                setError(false)
                props.hasError(error)

            })
            .catch((er) => {
                setError(true)
                setOpen(false)
                props.hasError(error)

            })


    }
    const handleMouseDownSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    useEffect(() => {
        props.setData(shipmentDetails)
        props.hasError(error)
        console.log('searchdata', shipmentDetails)
    }, [shipmentDetails, error, trackingNumber, props]);


    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            <div>
                <Typography textAlign={"center"} style={styles.title} fontWeight={600}
                            fontSize={{md: '22px', xs: '16px'}}>
                    {t("Track_shipment")}
                </Typography>
                <Grid>

                    <FormControl sx={{m: 1, width: '25ch'}} variant="filled">

                        <OutlinedInput

                            style={{
                                borderRadius: " 10px",
                                border: 1,
                                borderColor: '#E30613',
                                backgroundColor: "transparent"
                            }}
                            color="error"
                            onChange={(newValue) => setTrackingNumber(newValue.target.value)}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    handleClickSearch()
                                }
                            }}
                            placeholder={placeHolder}
                            id="Tracking Number"
                            type={'text'}
                            endAdornment={
                                <InputAdornment

                                    position="end">
                                    <IconButton
                                        sx={{
                                            width: "55px",
                                            height: "55px",
                                            borderRadius: 0,
                                        }}
                                        style={styles.iconButton}
                                        disabled={trackingNumber.length === 0}
                                        onClick={handleClickSearch}
                                        onMouseDown={handleMouseDownSearch}
                                        edge="end">
                                        {<SearchIcon style={{
                                            fill: '#E30613',
                                            width: '100%'
                                            , height: '100%'
                                        }}>
                                        </SearchIcon>}
                                    </IconButton>
                                </InputAdornment>

                            }

                        />
                    </FormControl>
                </Grid>
            </div>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="warning"/>
            </Backdrop>
        </Box>
    );
}