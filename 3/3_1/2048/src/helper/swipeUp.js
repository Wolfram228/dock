import cloneDeep from "lodash.clonedeep"
import addNumber from "./addNumber";

export const swipeUp = (data, score) => {
    let oldGrid = data
    let newGrid = cloneDeep(data)
    let checkGameOver = false;
    for (let i = 0; i < newGrid.length; i++) {
        let slow = 0, fast = slow + 1;
        while(slow < newGrid.length) {
            if(fast === newGrid.length){
                fast = slow + 1;
                slow++;
                continue;
            }
            if(newGrid[slow][i] === 0 && newGrid[fast][i] === 0){
                fast++;
            }else if(newGrid[slow][i] === 0 && newGrid[fast][i] !== 0){ 
                newGrid[slow][i] = newGrid[fast][i];
                newGrid[fast][i] = 0;
                fast++;
            }else if(newGrid[slow][i] !== 0 && newGrid[fast][i] === 0){
                fast++;
            }else if(newGrid[slow][i] !== 0 && newGrid[fast][i] !== 0){
                if(newGrid[slow][i] === newGrid[fast][i]){
                    newGrid[slow][i] = newGrid[slow][i] * 2;
                    score += newGrid[slow][i];
                    newGrid[fast][i] = 0;
                    slow++;
                    fast = slow + 1;
                }else{
                    slow++;
                    fast = slow + 1;
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