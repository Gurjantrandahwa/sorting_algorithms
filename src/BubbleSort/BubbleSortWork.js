import React, {useState} from "react";
import "./bubleSortWork.css";
import {BubbleSortAlgorithm} from "./BubbleSortAlgo";

export default function BubbleSortWork() {
    const PRIMARY_COLOUR = "#069A8E";
    const SECONDARY_COLOUR = "red";
    const [array, setArray] = useState([])

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    function resetArray() {
        const array = [];
        let Number_OF_Array = document.getElementById("ARRAY_SIZE").value;
        for (let i = 0; i < Number_OF_Array; i++) {
            array.push(randomIntFromInterval(5, 400));
            setArray(array)
        }

    }

    function bubbleSort() {
        let ANIMATION_SPEED = document.getElementById("DELAY").value;
        const animations = BubbleSortAlgorithm(array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColor = i % 4 !== 2 && i % 4 !== 3;
            if (isColor) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i]; //barTwoIdx== new height
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barTwoIdx}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }



    return <div>
        <div className="array-container">
            {array.map((value, index) => {
                    return <div
                        className="array-bar"
                        key={index}
                        style={{
                            backgroundColor: PRIMARY_COLOUR,
                            height: `${value}px`,
                        }}
                    />
                }
            )}
        </div>
        <div className="footer">
            <label htmlFor="array-size">Size</label>
            <input
                id="ARRAY_SIZE"
                name="array-size"
                type="range"
                min="5"
                max="80"
            />
            <label htmlFor="delay">Delay</label>
            <input id="DELAY" name="delay" type="range" min="3" max="100"/>
            <button onClick={() => resetArray()}>Generate Array</button>
            <button onClick={() => bubbleSort()}>Bubble Sort</button>
        </div>
    </div>
}