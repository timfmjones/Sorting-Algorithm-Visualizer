import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// speed of animation
const ANIMATION_SPEED_MS = 1;

// Number of bars to be sorted in array
const NUMBER_OF_ARRAY_BARS = 300;

// main colour of bars
var PRIMARY_COLOUR = 'navy';

// animation colour of bars
const SECONDARY_COLOUR = 'pink';

// max bar height 
const MAX_BAR_HEIGHT = 700;


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animation: []
    };

  }

  componentDidMount() {
    this.buildArray();
  }

  buildArray() {
    // window.location.reload(false);
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, MAX_BAR_HEIGHT));
    }
    this.setState({array});
  }

  resetArray(){
    window.location.reload(false);
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColourChange = i % 3 !== 2;
      if (isColourChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const colour = i % 3 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
        setTimeout(() => {
          
          barOneStyle.backgroundColor = colour;
          barTwoStyle.backgroundColor = colour;
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


  selectionSort(){
    console.log(this.state.array);
    const animations = getSelectionSortAnimations(this.state.array);
    this.animation = animations;
    
    for (let i =0; i < animations.length; i = i+3) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx] = animations[i];


        setTimeout(() => {
            const barOneStyle = arrayBars[barOneIdx].style;
            //barOneStyle.backgroundColor = 'orange';
        }, i * ANIMATION_SPEED_MS* 20); 
        const [barOneIdx2, barOneHeight] = animations[i+1];
        const [barOneIdx3, barTwoHeight] = animations[i+2];
        setTimeout(() => {
            const barOneStyle = arrayBars[barOneIdx2].style;
            barOneStyle.height = `${barOneHeight}px`;
            barOneStyle.backgroundColor = SECONDARY_COLOUR;
            const barTwoStyle = arrayBars[barOneIdx3].style;
            barTwoStyle.height = `${barTwoHeight}px`;
            //barTwoStyle.backgroundColor = 'blue';
        }, i * ANIMATION_SPEED_MS* 8); 

        
    }
  }

  quickSort() {
    // TODO
  }

  heapSort() {
    // TODO
  }

  bubbleSort() {
    console.log(this.state.array);
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(animations.length);
    for (let i = 0; i < animations.length; i = i +2){
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barOneHeight] = animations[i];
        const [barTwoIdx, barTwoHeight] = animations[i+1];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            
            barTwoStyle.height = `${barTwoHeight}px`;

        }, i * ANIMATION_SPEED_MS* 2); 


    }
  }

  // tets will only work if methods return sorted array not just animations 
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOUR,
              height: `${value}px`,
            }}></div>
        ))}
        <br></br>
        <button class="button" onClick={() => this.selectionSort()}>Selection Sort</button>
        <button class="button button2" onClick={() => this.mergeSort()}>Merge Sort</button>
        {/* <button onClick={() => this.quickSort()}>Quick Sort</button> */}
        {/* <button onClick={() => this.heapSort()}>Heap Sort</button> */}
        <button class="button button3" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        {/* <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms
        </button> */}
        <br></br>
        <button class="button buttonReset" onClick={() => this.resetArray()}>Generate New Array</button>
        

      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}