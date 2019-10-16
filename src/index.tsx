import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, compose } from 'redux';

import { IIntensityAction, baseColor } from './RGBColorPicker/SingleColorPicker'
import {IonIntensityChange, dimensionEnum} from './components/DimensionConfigurator'

export enum ActionType {
    INIT = "@@INIT",
    redux_test = "redux_test",
    update_color_intensity = "update_color_intensity",
    update_size_intensity = "update_size_intensity"
}
export interface IAction {
    type: ActionType;
}
//we define the structure of the state for the color picker 
interface IRGBColorPicker {
    rValue: number;
    gValue: number;
    bValue: number;
}


interface IRectangleConfigurator{
    hValue: number;
    wValue: number;
}
//we define the structure of the complete state
interface IState {
    stateCounter: number;
    RGBColorPicker: IRGBColorPicker;
    RectangleConfigurator: IRectangleConfigurator;
}
//we initialize the state for all the components we have in the app
const initialState: IState = {
    stateCounter: 0,
    RGBColorPicker: {
        rValue: 40,
        gValue: 100,
        bValue: 50
    },
    RectangleConfigurator: {
        hValue: 25,
        wValue: 25
    }
};

//here we define how the actions will change the state
const reducer = (state = initialState, action: IAction) => {
    console.log("REDUCER CALLED, stateCounter:" + state.stateCounter + " ACTION:" + action.type);
    let newState: IState = state;
    newState = JSON.parse(JSON.stringify(state)) as IState;
    newState.stateCounter++;
    switch (action.type) {
        case ActionType.INIT:
            return newState;
        case ActionType.update_color_intensity:
            const intensityAction = action as IIntensityAction
            const color = intensityAction.color
            console.log(color);
            switch (color) {
                case (baseColor.r):
                    console.log("update red");
                    newState.RGBColorPicker.rValue = intensityAction.intensity;
                    break;
                case (baseColor.g):
                    newState.RGBColorPicker.gValue = intensityAction.intensity
                    break;
                case (baseColor.b):
                    newState.RGBColorPicker.bValue = intensityAction.intensity
                    break;
            }
            return newState


            case ActionType.update_size_intensity:
                const onIntensityChange = action as IonIntensityChange
                const size = onIntensityChange.size
                console.log(size);
                switch (size) {
                    case (dimensionEnum.h):
                        console.log("update red");
                        newState.RectangleConfigurator.hValue = onIntensityChange.intensity;
                        break;
                    case (dimensionEnum.w):
                        newState.RectangleConfigurator.wValue = onIntensityChange.intensity
                        break;
                    
                }
                return newState
        default:
            console.log("Error!!!!! no reducer defined");
            return newState;
    }
}

//we need all the following , to connect the redux store to the redux developer tools in chrome
export interface IWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
}
declare let window: IWindow;
let reduxMiddleware: any;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    reduxMiddleware = compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
//the store will be created with the reducer we defined and the middleware
//to connect the redux tools
const store = createStore(
    reducer,
    reduxMiddleware
);



//the initial render
ReactDOM.render(<App stateCounter={reduxState().stateCounter} />, document.getElementById('root'));
//the whole app will be rerendered after every state change,
//because the stateCounter will always be different
store.subscribe(() => {
    ReactDOM.render(<App stateCounter={reduxState().stateCounter} />, document.getElementById('root'));
});


//this is just a shortcut for later to get the state, since will need the state alle the time
export function reduxState() {
    return store.getState();
}
//this is just a shortcut to dipatach and action, since we will do this later all the time
export function dispatch(action: IAction) {
    store.dispatch(action);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
