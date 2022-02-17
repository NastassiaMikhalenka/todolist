import React from 'react';
import './App.css';
import ButtonAppBar from "../components/AppBar";
import {Container} from "@mui/material";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {InitialStateStatusType} from "./app-reducer";


function App() {

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
              <TodolistsList />
            </Container>
        </div>
    );
}

export default App;


