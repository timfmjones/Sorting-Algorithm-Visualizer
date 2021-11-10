export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }

  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // push indexes of compared values to change colour
      animations.push([i, j]);
      // push indexes of compared values to revert colour
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // overite value at index k with value at index i in auxiliary array
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // overite value at index k of original array with value at index j of auxiliary array
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // Indexes of compared values to change colour 
      animations.push([i, i]);
      // Indexes of compared values to revert colour
      animations.push([i, i]);
      // overite value at index k of original array with value at index k of auxiliary array
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // Indexes of compared values to change colours
      animations.push([j, j]);
      // Indexes of compared values to revert colours
      animations.push([j, j]);
      // overwrite value at index k of original array with value at index j of auxiliary array
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getBubbleSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    bubbleSortHelper(array, animations, auxiliaryArray);
    return animations;
  }
  

  function bubbleSortHelper(mainArray, animations){
    for (let i = 0; i < mainArray.length ; i++)
        {
        for (let j = 0; j < mainArray.length-i; j++)
            {
            if (mainArray[j] > mainArray[j+1])
            {
                animations.push([j, mainArray[j+1]]);
                animations.push([j+1, mainArray[j]]);
                const temp = mainArray[j];
                mainArray[j] = mainArray[j+1];
                mainArray[j+1] = temp;
         
            }
        }
 
}   
  }



  function selectionSortHelper(mainArray, animations, auxiliaryArray){

    for (let i = 0; i <mainArray.length; i++){
        let max = 0;
        let maxIndex = 0;
        //search for max bar
        for (let j = 0; j < mainArray.length-i; j++){
            if (mainArray[j] > max) {
                max = mainArray[j];
                maxIndex = j;
            }
        }
        
        //highlight maximum bar
        animations.push([maxIndex, 0]);
        //move max bar to end of array
        animations.push([mainArray.length-i-1, max])
        let num =mainArray[mainArray.length-i-1];
        //move array at end of array to max bar's index
        animations.push([maxIndex, num]);
        // change array
        mainArray[maxIndex] = mainArray[mainArray.length-i-1];
        mainArray[mainArray.length-i-1] = max;
    }

  }

  function comparison(array, start, animations){
      let cont = true;
      let index = start;
     
  }

  export function getSelectionSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    selectionSortHelper(array, animations, auxiliaryArray);
    return animations;
  }
  
