import React from "react";
import Btn from "../Btn/Btn";
import "./cardInputForm.css";

class GameInputForm extends React.Component {
    questionRef = React.createRef();
    answerRef = React.createRef();

    inputHandle = ({ target: { value } }, type) => {
        this.props.changeInputsState(value, type);
    };

    handleButton1 = (inputRefs) => {
        this.props.handleButton1(inputRefs);
        this.clearInputs();
    };

    handleButton2() {
        this.props.handleButton2();
        this.clearInputs();
    }

    clearInputs = () => {
        this.props.clearInputs();
    };

    render() {
        const inputRefs = [
            [this.questionRef.current, "question"],
            [this.answerRef.current, "answer"],
        ];
        return (
            <div className="input-container">
                <div className="input-item">
                    Question:{" "}
                    <textarea
                        ref={this.questionRef}
                        onChange={(e) => this.inputHandle(e, "question")}
                        value={this.props.inputs.name}
                    ></textarea>
                </div>
                <div className="input-item">
                    Answer:{" "}
                    <textarea
                        ref={this.answerRef}
                        onChange={(e) => this.inputHandle(e, "answer")}
                        value={this.props.inputs.rating}
                    ></textarea>
                </div>
                <div className="input-btns">
                    <Btn
                        text="Add"
                        clickHandle={() => {
                            this.handleButton1(inputRefs);
                        }}
                    />
                    <Btn
                        text="Cancel"
                        clickHandle={() => {
                            this.handleButton2();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default GameInputForm;
