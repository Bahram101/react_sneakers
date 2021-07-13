import styles from './Card.module.css';
import React from 'react';
import AppContext from "../../context";
import ContentLoader from 'react-content-loader';

const Card = ({
    id,
    imgUrl,
    title,
    price,
    onFavorite,
    onPlus,
    loading = false }) => {

    const { isItemAdded, favorites } = React.useContext(AppContext);

    const onClickFavorite = () => {
        onFavorite({ id, imgUrl, title, price })
    }

    const isFavorited = (id) => {
        return favorites.some((obj) => Number(obj.id) === Number(id))
    }

    const onClickPlus = () => {
        onPlus({ id, imgUrl, title, price })
    }


    return (
        <div className={styles.card}>

            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.favorite} >
                        <img src={isFavorited(id) ? "/img/liked.svg" : "/img/unliked.svg"}
                            alt="unliked"
                            onClick={onClickFavorite} />
                    </div>
                    <img width="100%" height="135px" src={imgUrl} alt="sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price}</b>
                        </div>
                        <img className={styles.plus}
                            src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                            onClick={onClickPlus} alt="addToCart" />
                    </div>
                </>
            )}


        </div >
    )
}

export default Card