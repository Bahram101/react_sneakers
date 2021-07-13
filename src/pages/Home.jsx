import React from "react";
import Card from "../components/Card";




const Home = ({
    searchValue,
    onChangeSearchInput,
    cartItems,
    favorites,
    setSearchValue,
    items,
    onAddToCart,
    onAddToFavorite,
    isloading }) => {


    const renderItems = () => {
        const filtredItems = items.filter((item) => 
                item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isloading ? [...Array(8)] : filtredItems).map((item) => (
            
                <Card
                    key={item.id}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    favorited={favorites.some(favorite => Number(favorite.id) === Number(item.id))}
                    loading={isloading}
                    {...item} />
            ))

    }

    return (
        <div className="content p-4 mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <h2>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h2>
                <div className="search-block">
                    <img src="img/search.svg" alt="search" />
                    <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
                    {searchValue && <img onClick={() => setSearchValue('')} src="/img/btn-remove.svg" alt="remove" className="searchClear" />}
                </div>
            </div>
            <div className="sneakers d-flex flex-wrap">
                { renderItems() }
            </div>
        </div>
    )
}

export default Home