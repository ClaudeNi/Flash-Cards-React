import React from "react";
import CardManagerCard from "../CardManagerCard/CardManagerCard";
import niStore from "../../api/niStore";

class HomePage extends React.Component {
    state = {cardsList: []}

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

    render() {
        return <div>
            Cards
            {this.displayCards()}
        </div>;
    }
    
};

export default HomePage;
