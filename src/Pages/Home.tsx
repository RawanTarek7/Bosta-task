import * as React from "react";
import {
    Alert,
    Box, Fab,
    Grid, Hidden, SxProps,
    Typography
} from "@mui/material";
import {Search} from "../components/Search";
import {useEffect, useState} from "react";
import {ITracking} from "../interfaces/tracking.interface";
import {useTranslation} from "react-i18next";
import Status from "../components/Status";
import Zoom from "@mui/material/Zoom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {useTheme} from "@mui/material/styles";




const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};


const styles = {
    home: {
        marginLeft: 16,
        marginRight: 16
        , display: 'flex',
        marginBottom: '50px'
    },


    title: {fontWeight: 600, margin: 25, color: "darkgray"},

    img: {
        transform: "scaleX(-1)",
        width: 460,
    }
    , stepper: {
        backgroundColor: '#0098a5',
        borderRadius: 2,
        height: 8

    }
    ,
    fab: {
        position: 'fixed',
        bottom: 2,
        right: 2,
    }

}


export default function Home() {
    const [details, setDetails] = useState<ITracking>()
    const [error, setError] = useState(false)
    const [trackingNo, setTrackingNo] = useState('')
    const {t} = useTranslation();


    const theme = useTheme();
    const [value, setValue] = React.useState(0);


    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };


    const setData = (data: any) => {
        setDetails(data);
    }
    const hasError = (error: boolean) => {
        setError(error);
    }
    const trackingNum = (num: string) => {
        setTrackingNo(num);
    }


    useEffect(() => {

    }, [details, error]);


    return (
        <Box style={styles.home}
             alignItems={"center"}
             flexDirection={"column"}
             justifyContent={"center"}>

            <Search
                hasError={hasError}
                setData={setData}
                trackingNo={trackingNum}>

            </Search>


            {error ? (

                    <Box marginTop={'25px'}>
                        <Alert style={{
                            fontSize: 16,
                            backgroundColor: '#FEF3F2',
                        }} variant={"outlined"} severity="error">
                            {t('error_wrong_number')}
                        </Alert>
                    </Box>
                ) :
                (<Grid width={'100%'}>
                    {details && details ?
                        (<Grid width={'100%'}>
                                <Hidden smDown>
                                    <Typography marginTop={'100px'} color={'#6670A5'}
                                                fontWeight={600}
                                                fontSize={'14'}>
                                        {t('Shipment_No_label')} {trackingNo}
                                    </Typography>
                                </Hidden>
                                <Status details={details}/>
                            </Grid>
                        ) : null}
                </Grid>)

            }

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: 500,
                    position: 'relative',
                    minHeight: 200,
                }}
            >

                <Zoom
                    key={'secondary' as 'secondary'}
                    in={value === 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${value === 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab sx={fabStyle as SxProps} aria-label={'chat'} color={'warning'}>
                        <QuestionAnswerIcon/>
                    </Fab>
                </Zoom>
            </Box>
        </Box>
    )

}
