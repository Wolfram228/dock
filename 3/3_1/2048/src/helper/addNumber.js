/* Add 2 or 4 randomly on GRID */
const addNumber = (newGrid) => {
    let added = false;
    let attempts = 0;
    while (!added) {
        attempts++;
        let rand1 = Math.floor(Math.random() * 4);
        let rand2 = Math.floor(Math.random() * 4);
        if (newGrid[rand1][rand2] === 0) {
            newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
            added = true;
        }
        if (attempts > 50) {
            break;
        }
    }
};

export default addNumber;
