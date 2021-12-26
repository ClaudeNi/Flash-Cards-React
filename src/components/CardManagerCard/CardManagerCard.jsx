import React from "react";
import Btn from "../Btn/Btn";
import "./cardManagerCard.css";

const GameManagerCard = (props) => {
    const handleClick = () => {
        props.handleChangeEdit(props.id);
        console.log(props);
    };

    return (
        <div className="game-manager-container">
            <div>
                Question: 
                <p>{props.question}</p>
            </div>
            <div>
                Answer: 
                <p>{props.answer}</p>
            </div>
            <div className="btns-container">
                <Btn text="Edit" clickHandle={handleClick} />
                <Btn
                    text="Delete"
                    clickHandle={() => {
                        props.handleButton2(props.id);
                    }}
                />
            </div>
        </div>
    );
};

export default GameManagerCard;
