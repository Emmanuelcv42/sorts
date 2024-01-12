import React from "react";
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sorting/sortingAlgorithms.js';
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }
    componentDidMount() {
        this.resetArrary();
    }

    resetArrary() {
        const array = [];
        for (let i = 0; i < 310; i++) {
            array.push(randomIntFromInterval(5, 750));
        }
        this.setState({ array });
    }
    mergeSort1(){
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
    }
    render() {
        const { array } = this.state;
        return (
            <div className="array-container">

                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
                <div>
                    <button onClick={()=> this.resetArrary()}>Generar Nuevo Array</button>
                    <button onClick={()=> this.mergeSort1()}>Merge Sort</button>
                    <button onClick={()=> this.quickSort()}>Quick New Sort</button>
                    <button onClick={()=> this.heapSort()}>Heap New sort</button>
                </div>

            </div>
        );
    }

}


function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}