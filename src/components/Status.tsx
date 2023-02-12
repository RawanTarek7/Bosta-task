import * as React from 'react';
import {Divider, Grid, Hidden, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {ITracking, TransitEvent} from "../interfaces/tracking.interface";
import {useSelector} from "react-redux";

const styles = {
    stepper: {
        backgroundColor: '#0098a5',
        borderRadius: 2,
        height: 8
    },
    noneStepper: {
        backgroundColor: '#D9F4F8',
        borderRadius: 2,
        height: 8
    }
}
export default function Status({details}: any) {
    const {t} = useTranslation();
    const [statusDetails, setStatusDetails] = useState<ITracking>();
    const [transitEvents, setTransitEvents] = useState<TransitEvent>();
    const [status, setStatus] = useState('');
    const deliverToSender = statusDetails && statusDetails.CurrentStatus.state === 'DELIVERED_TO_SENDER';
    const language = useSelector((state: any) => state.language);

    const date = new Date(Date.UTC(2020, 7, 20, 16, 34, 55, 150));
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
        locale: language === 'ar' ? 'ar-EG' : 'en-US'
    };

    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    // @ts-ignore
    const formattedDate = date.toLocaleString(locale, options);


    useEffect(() => {

        setStatusDetails(details)

        setTransitEvents(details?.TransitEvents[details?.TransitEvents.length - 1])

        const arabic = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
        console.log('arabic', (arabic.toLocaleString('ar-EG', {timeZone: 'UTC'})))


        if (statusDetails && statusDetails.CurrentStatus.state === 'DELIVERED') {
            if (language === 'ar') {

                const state = t('DELIVERED') + t('order_is')
                setStatus(state)
            }
            if (language === 'en') {
                const state = t('order_is') + t('DELIVERED')
                setStatus(state)
            }
        }
        if (deliverToSender) {
            const state = t('DELIVERED_TO_SENDER')
            setStatus(state)
        }


    }, [details,deliverToSender, statusDetails, status, language, t]);


    return (

        <Grid width={'100%'}>
            <Typography marginBottom={'30px'} marginTop={{md: 0, xs: '30px'}} fontWeight={600}
                        fontSize={35}>
                {status}
            </Typography>
            <Grid container
                  style={{marginBottom: 30}}
                  textAlign={'center'}
                  justifyContent={'center'}
                  gap={0.5} spacing={1}>
                <Grid style={styles.stepper} item md={2} xs={3}>
                </Grid>
                <Grid style={styles.stepper} item md={2} xs={3}>
                </Grid>
                {deliverToSender ?
                    <Grid style={styles.noneStepper} item md={2} xs={3}>
                    </Grid> :
                    <Grid style={styles.stepper} item md={2} xs={3}>
                    </Grid>}
            </Grid>
            <Grid container
                  justifyContent={"center"}
                  gap={2}>
                <Typography
                    display={{display: 'inline-block'}}
                    fontWeight={600}
                    marginBottom={'10px'}
                    fontSize={'16px'}>
                    {status}
                </Typography>
                <Typography
                    display={{display: 'inline-block'}}
                    fontWeight={600} color={'#0098a5'}>
                    {formattedDate}
                </Typography>

            </Grid>
            <Hidden smDown>
                <Typography color={'#667085'}
                            fontSize={'14px'}
                            marginBottom={'25px'}>
                    (
                    {t("Last_update_days", {
                        days: formattedDate
                    })}

                    )

                </Typography>
            </Hidden>

            <Hidden smUp>
                <Grid textAlign={"start"}>
                    <Divider orientation="horizontal" flexItem/>
                    <Typography marginTop={'15px'} color={'#6670A5'}
                                fontSize={'15'}>
                        {t('Shipment_No_label')}

                    </Typography>
                    <Typography
                        fontSize={'15'}>
                        {statusDetails &&
                            statusDetails?.TrackingNumber}
                    </Typography>

                    <Typography marginTop={'25px'} color={'#6670A5'}
                                fontSize={'15'}>
                        {t('Last_update')}

                    </Typography>

                    <Typography marginTop={'5px'}
                                marginBottom={'25px'}
                                fontSize={'15'}>
                        {formattedDate}

                    </Typography>

                </Grid>
            </Hidden>
            <Grid md={3} xs={12} justifyContent={"center"}>
                <Divider orientation="horizontal"/>
            </Grid>
            <Grid md={4} xs={12} container
                  textAlign={"center"}
                  justifyContent={"center"} marginRight={{md: '100px'}} marginLeft={{md: '50px'}}>
                <Grid item marginTop={'40px'} fontSize={"14px"} marginBottom={"25px"} md={12} xs={12}>

                    <Typography> {t("ACTIVITY_LOG")}</Typography>
                </Grid>
                <Grid item dir={language === "ar" ? 'rtl' : 'lrt'}>
                    <Stepper

                        activeStep={0}
                        orientation="vertical">
                        <Step key={1}>
                            <StepLabel
                                icon={' '}>

                                <Typography
                                    fontWeight={600}
                                    fontSize={'14px'}
                                    padding={2}
                                    marginTop={'10px'}
                                    style={{color: 'black'}}>
                                    {formattedDate}
                                </Typography>


                            </StepLabel>
                            <StepContent>

                                <Typography
                                    justifyContent={"center"}
                                    textAlign={"center"}
                                    fontWeight={400}
                                    fontSize={'14px'}
                                    padding={2}
                                    marginTop={'10px'}
                                    borderRadius={3}
                                    border={1} borderColor={'lightgrey'} style={{color: 'black'}}>
                                    {transitEvents?.state}
                                </Typography>

                            </StepContent>
                        </Step>


                    </Stepper>
                </Grid>
            </Grid>
        </Grid>

    );
}