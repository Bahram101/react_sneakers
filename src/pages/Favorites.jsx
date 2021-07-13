import React from "react";
import Card from "../components/Card";
import AppContext from '../context';


const Favorites = () => {
 
    const { favorites, onAddToFavorite } = React.useContext(AppContext);
    

    return (
        <div className="content p-4 mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <h2>Мои закладки</h2>
            </div>
            <div className="sneakers d-flex flex-wrap">
                {favorites.map((item, index) => (
                        <Card
                            key={index} 
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            {...item}/>
                    ))}
            </div>
        </div>
    )
}

export default Favorites