import cloneDeep from "lodash.clonedeep"
import addNumber from "./addNumber";

export const swipeRight = (data, score) => { 
    let oldGrid = data
    let newGrid = cloneDeep(data)
    let checkGameOver = false;
    for (let i = 0; i < newGrid.length; i++) {
        let arr = newGrid[i];
        let slow = arr.length - 1, fast = slow - 1;
        while(slow > -1){
            if(fast === -1){ 
                fast = slow - 1;
                slow--;
                continue;
            }
            if(arr[slow] === 0 && arr[fast] === 0){
                fast--;
            }else if(arr[slow] === 0 && arr[fast] !== 0){
                arr[slow] = arr[fast];
                arr[fast] = 0;
                fast--;
            }else if(arr[slow] !== 0 && arr[fast] === 0){
                fast--;
            }else if(arr[slow] !== 0 && arr[fast] !== 0){
                if(arr[slow] === arr[fast]){
                    arr[slow] = arr[slow] + arr[fast];
                    score += arr[slow];
                    arr[fast] = 0;
                    slow--;
                    fast = slow - 1;
                }else {
                    slow--;
                    fast = slow - 1;
                }
            }
        }
    }
    if(JSON.stringify(oldGrid) !== JSON.stringify(newGrid)){ 
        addNumber(newGrid)
    } else {
        checkGameOver = true;
    }
    return {newGrid, checkGameOver, score};
}