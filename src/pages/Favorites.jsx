import Card from "../components/Card";
const Favorites = ({ items, onAddToFavorite }) => {

    return (
        <div className="content p-4 mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <h2>Мои закладки</h2>
            </div>
            <div className="sneakers d-flex flex-wrap">
                {items.map((item, index) => (
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