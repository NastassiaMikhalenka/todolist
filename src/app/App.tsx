import React from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar";
import {Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Login} from "../features/Login/Login";
import { Routes, Route } from "react-router-dom";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    return (
        <div className="App">
            <ButtonAppBar/>
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


