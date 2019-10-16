import React from 'react';
import {dispatch,ActionType, IAction} from '../index'

export enum dimensionEnum {
    w = "width",
    h = "height",
    
}

export interface IonIntensityChange extends IAction{
    size:dimensionEnum,
    intensity:number
}


interface IProps {
    size: dimensionEnum;
    intensity: number;
};

interface IState { };

export default class DimensionConfigurator extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.onIntensityChange = this.onIntensityChange.bind(this);
    }

    render() {
        
   
        let colorSampleHeight: string = ""
        let colorSampleWidth: string = ""

        switch (this.props.size) {
            case dimensionEnum.h:
                colorSampleWidth = `${this.props.intensity}px`;
                colorSampleHeight = `25px`
                break;
            case dimensionEnum.w:
                colorSampleWidth = `${this.props.intensity}px`;
                colorSampleHeight = `25px`
                break;
        }
        
        const lengthColor = {
            display: "inline-block",
            height: colorSampleHeight,
            width: colorSampleWidth,
            backgroundColor: "black"
        }
        return <div>
            <div style={lengthColor}></div><input type="number" value={this.props.intensity} onChange={this.onIntensityChange}/>
            I'm a DimensionConfigurator for {this.props.size}
        </div>
    }

    onIntensityChange(event:any){
        const inputElement = event.target as HTMLInputElement;
        const onIntensityChange:IonIntensityChange = {
            type: ActionType.update_size_intensity,
            size:this.props.size,
            intensity:parseInt(inputElement.value)
        }

       dispatch(onIntensityChange);
    }
}