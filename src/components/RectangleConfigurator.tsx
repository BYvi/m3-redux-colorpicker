import React from 'react';
import DimensionConfigurator, {dimensionEnum} from './DimensionConfigurator'; 
import {reduxState} from '../index'

interface IProps {
    stateCounter:number;
  };
  interface IState { };

export default class RectangleConfigurator extends React.PureComponent<IProps, IState> {

    constructor(props:any) {
      console.log("new RectangleConfigurator component will be initialized");
      super(props);
      
    }


    render(){
        let colorSampleHeight: string = `${reduxState().RectangleConfigurator.wValue}px`
        let colorSampleWidth: string = `${reduxState().RectangleConfigurator.hValue}px`
        const lengthColor = {
            display: "inline-block",
            height: colorSampleHeight,
            width: colorSampleWidth,
            backgroundColor: "black"
        }
        console.log(reduxState().RectangleConfigurator.wValue);
        console.log(reduxState().RectangleConfigurator.hValue);
        
      return <div>
        <DimensionConfigurator size={dimensionEnum.w} intensity={reduxState().RectangleConfigurator.wValue} />
        <DimensionConfigurator size={dimensionEnum.h} intensity={reduxState().RectangleConfigurator.hValue} />
        <div style={lengthColor}></div>
        
        
      </div>
    }


  }
  