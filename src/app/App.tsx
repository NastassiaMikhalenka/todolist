import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar";
import {CircularProgress, Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Login} from "../features/Login/Login";
import { Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC, setIsInitializedAC} from "./app-reducer";
import {AppRootStateType} from "../redux/store";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(() =>{
        dispatch(initializeAppTC())
    }, [])

    if(!isInitialized){
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ButtonAppBar isLoggedIn={isLoggedIn}/>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;


