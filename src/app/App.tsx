import React from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar";
import {Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {InitialStateStatusType} from "./app-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
              <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;


