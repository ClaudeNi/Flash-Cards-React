import React from "react";
import CardManagerCard from "../CardManagerCard/CardManagerCard";
import GameInputForm from "../CardInputForm/CardInputForm";
import Spinner from '../Spinner/Spinner';
import niStore from "../../api/niStore";

class ManagerPage extends React.Component {
    state = {
        cardsList: [],
        isEditing: false,
        inputs: {
            question: "",
            answer: "",
        },
        spinner: false,
    };

    componentDidMount() {
        this.fetchCards();
    }

    fetchCards = async () => {
        this.setState({spinner: true})
        try {
            const cards = await niStore.get("flashcards");
            this.setState({ cardsList: cards.data, spinner: false });
        } catch (e) {
            console.log(e);
        }
    };

    fetchCard = async (id) => {
        const card = await niStore.get(`flashcards/${id}`);
        this.setState({
            inputs: {
                question: card.data.question,
                answer: card.data.answer,
            },
        });
    };

    displayCards = () => {
        return this.state.cardsList.map((card, i) => {
            return (
                <CardManagerCard
                    key={i}
                    id={card.id}
                    question={card.question}
                    answer={card.answer}
                    handleChangeEdit={this.startEditing}
                    handleButton2={this.handleDelete}
                />
            );
        });
    };

    handleButton1 = (inputRefs) => {
        const newCard = {};
        for (let data of inputRefs) {
            newCard[data[1]] = data[0].value;
        }
        if (!this.state.isEditing) {
            this.addToApi(newCard);
        } else {
            this.updateApi(newCard, this.state.currentCard);
            this.stopEditing();
        }
    };

    handleDelete = (id) => {
        this.deleteFromApi(id);
    };

    startEditing = (id) => {
        this.setState({ isEditing: true, currentCard: id });
        this.fetchCard(id);
    };

    stopEditing = () => {
        this.setState({ isEditing: false });
    };

    addToApi = async (newCard) => {
        try {
            await niStore.post("flashcards", newCard);
            this.fetchCards();
        } catch (e) {
            console.log(e);
        }
    };

    deleteFromApi = async (id) => {
        try {
            await niStore.delete(`flashcards/${id}`);
            const data = this.state.cardsList.filter((card) => card.id !== id);
            this.setState({ cardsList: data });
        } catch (e) {
            console.log(e);
        }
    };

    updateApi = async (newCard, id) => {
        try {
            await niStore.put(`flashcards/${id}`, newCard);
            const newList = [...this.state.cardsList];
            const index = this.state.cardsList.findIndex(
                (card) => card.id === id
            );
            newCard.id = id;
            newList[index] = newCard;
            this.setState({ cardsList: newList });
        } catch (e) {
            console.log(e);
        }
    };

    changeInputsState = (value, type) => {
        this.setState({ inputs: { [type]: value } });
    };

    clearInputs = () => {
        this.setState({
            inputs: {
                question: "",
                answer: "",
            },
        });
    };

    render() {
        if (this.state.spinner) {
            return <Spinner />
        } else
        return (
            <div className="manager-page-container">
                <div className="manager-page-input-container">
                    <GameInputForm
                        handleButton1={this.handleButton1}
                        handleButton2={this.stopEditing}
                        currentCard={this.state.currentCard}
                        changeInputsState={this.changeInputsState}
                        clearInputs={this.clearInputs}
                        inputs={this.state.inputs}
                    />
                </div>
                <div className="manager-pages-items-container">
                    {this.displayCards()}
                </div>
            </div>
        );
    }
}

export default ManagerPage;
