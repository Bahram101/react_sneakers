import Card from "../components/Card";


const Home = ({
    searchValue,
    onChangeSearchInput,
    setSearchValue,
    items,
    onAddToCart,
    onAddToFavorite}) => {


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
                {items
                    .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            imgUrl={item.imgUrl}
                            price={item.price}
                            onPlus={(obj) => onAddToCart(obj)} 
                            onFavorite={(obj) => onAddToFavorite(obj)} />
                    ))}
            </div>
        </div>
    )
}

export default Home