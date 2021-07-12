import styles from './Card.module.css';
import React from 'react';

const Card = ({id, imgUrl, title, price, onFavorite, onPlus, favorited=false}) => {
 
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, imgUrl, title, price})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, imgUrl, title, price})
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styles.card}>
            <div className={styles.favorite} >
                <img src={ isFavorite ? "/img/liked.svg" : "/img/unliked.svg" } alt="unliked" onClick={onClickFavorite} />
            </div>
            <img width={133} height={112} src={imgUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={styles.plus} src={ isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg" } onClick={onClickPlus} alt="addToCart" />
            </div>
        </div>
    )
}

export default Card