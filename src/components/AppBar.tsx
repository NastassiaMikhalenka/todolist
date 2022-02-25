import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import {CustomizedSnackbars} from "./ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {InitialStateStatusType} from "../app/app-reducer";
import {logoutTC} from "../features/Login/reducer-auth";

type PropsType = {
    isLoggedIn: boolean
}

export default function ButtonAppBar({isLoggedIn}: PropsType) {
    const status = useSelector<AppRootStateType, InitialStateStatusType>((state) => state.app.status)
    const dispatch = useDispatch()
// useCallback
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <CustomizedSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TODOAPP
                    </Typography>
                    {isLoggedIn && <Button
                        onClick={logoutHandler}
                        color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
        </Box>
    );
}
