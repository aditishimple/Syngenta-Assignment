import { useEffect, useState } from "react";

function Circles() {
    let balloonColorList = {
        1: "#a6dba6",
        2: "#d1c088 ",
        3: "#0000FF",
        4: "#ac9dda",
        5: "#86bcce",
    };

    const [colorList, setcolorList] = useState([]);
    const [inputNumber, setinputNumber] = useState("");
    const [circleDiv, setcircleDiv] = useState([]);
    const [originalPlace, setoriginalPlace] = useState([]);

    useEffect(() => {
        function randomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const randomColors = [];
        while (randomColors.length < 5) {
            const random_num = randomInteger(1, 5);
            if (randomColors.indexOf(random_num) === -1) {
                randomColors.push(random_num);
            }
        setcolorList(randomColors);
        setoriginalPlace(randomColors);
        }
    }, []);

    const handleBalloon = (e) => {
        e.preventDefault();
        let newColorList = [];
        if (inputNumber > colorList.length) {
            alert("Please select valid number");
        }
        for (var i = 0; i < colorList.length; i++) {
            if (i !== Number(inputNumber) - 1) {
                newColorList.push(colorList[i]);
            } else {
                setcircleDiv([...circleDiv, colorList[i]]);
            }
        }
        setcolorList(newColorList);
    };

    const returnBallons = (e, idx, el) => {
        let newDivList = circleDiv.filter((d, i) => {
            return i !== idx;
        });
        setcircleDiv(newDivList);

        let newColorsList = [];
        for (var j = 0; j < originalPlace.length; j++) {
            if (!newDivList.includes(originalPlace[j])) {
                newColorsList.push(originalPlace[j]);
            }
        }
        setcolorList(newColorsList);
    };

return (
    <div>
        <h1>Balloon App</h1>
        <h2 className="title" style={{textAlign: "left", marginLeft: "150px"}}>You will see the balloons here after shooting</h2>
        <div className="main-div">
            <div className="empty-div">
                {circleDiv.map((el, i) => {
                    return (
                        <div
                        onClick={(e) => returnBallons(e, i, el)}
                        style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: `${balloonColorList[el]}`,
                        borderRadius: "50%",
                        marginBottom: "10px",
                        border: `10px solid ${balloonColorList[el]}`,
                        }}
                        ></div>
                    );
                })}
            </div>
            <div className="circle-list">
                {colorList.map((el, i) => {
                    return (
                        <div
                        key={i}
                        style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: `${balloonColorList[el]}`,
                        borderRadius: "50%",
                        marginBottom: "10px",
                        border: `10px solid ${balloonColorList[el]}`,
                        }}
                        ></div>
                    );
                })}
            </div>
            <div className="shoot">
                <input
                type="number"
                min="1"
                max="5"
                value={inputNumber}
                placeholder="Enter a number between 1 to 5"
                className="input-number"
                onChange={(e) => setinputNumber(e.target.value)}
                />
                <button type="submit" onClick={(e) => handleBalloon(e)}>
                Shoot
                </button>
            </div>
        </div>
    </div>
);
}

export default Circles;