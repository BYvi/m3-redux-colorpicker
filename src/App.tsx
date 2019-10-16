import React from 'react';
import './App.css';
import RGBColorPicker from './RGBColorPicker/RGBColorPicker'
import RectangleConfigurator from './components/RectangleConfigurator'
import {reduxState,dispatch,ActionType} from './index'

interface IProps {
  stateCounter:number;
};
interface IState { };

export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    console.log("new App component will be initialized");
    super(props);
    this.handleReduxTest = this.handleReduxTest.bind(this);
  }

  render() {
    console.log("App.render() called, stateCounter:"+reduxState().stateCounter);
    return <div>
      <p>Hello Redux world.</p>
      <p>stateCounterFromReactProperty: {this.props.stateCounter}</p>
      <p>stateCounterFromRedux:{reduxState().stateCounter}
       <button onClick={this.handleReduxTest}>Redux Test</button></p>
      <RGBColorPicker stateCounter={reduxState().stateCounter} />
      <RectangleConfigurator stateCounter={reduxState().stateCounter} />


    </div>
  }

  handleReduxTest(event:any){
    dispatch({type:ActionType.redux_test})

  }
}
