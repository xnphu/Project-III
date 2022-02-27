import React from 'react';
import PropTypes from 'prop-types';

//Import mini card widgets
import MiniCards from "../../components/Common/mini-card";

const TotalNumberCard = ({ miniCards }) => {
    return (
        <>
            {
                miniCards.map((card, key) =>
                    <MiniCards content={card} title={card.title} text={card.text} iconClass={card.iconClass} key={`_card_${card.id}` + card.text} />
                )
            }
        </>
    );
}

TotalNumberCard.propTypes = {
    miniCards: PropTypes.array.isRequired,
};

export default TotalNumberCard;