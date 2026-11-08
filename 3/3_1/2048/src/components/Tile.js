import React from 'react'
import { getTileColors } from '../helper/getTileColors';

function Tile({ num }) {
    const { tileStyle } = style;
    return (
        <div
            style={{
                ...tileStyle,
                background: getTileColors(num),
                color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
            }}
        >
            {num !== 0 ? num : ""}
        </div>
    )
}

const style = {
    tileStyle: {
        height: 107,
        width: 107,
        background: "lightgray",
        margin: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 55,
        fontWeight: "800",
        color: "white",
        borderRadius: 5
    }
}

export default Tile