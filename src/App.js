import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import axios from 'axios';
import AppContext from './context';


const App = () => {

	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const baseUrl = 'http://localhost:3002';

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get(`${baseUrl}/cart`)
			const favoritesResponse = await axios.get(`${baseUrl}/favorites`)
			const itemsResponse = await axios.get(`${baseUrl}/products`)

			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavorites(favoritesResponse.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, [])


	const onAddToCart = (obj) => {
		if (cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id))) {
			axios.delete(`${baseUrl}/cart/${obj.id}`)
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
		} else {
			axios.post(`${baseUrl}/cart`, obj)
			setCartItems((prev) => [...prev, obj])
		}
	}

	const onAddToFavorite = (obj) => {
		if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
			axios.delete(`${baseUrl}/favorites/${obj.id}`)
			setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
		} else {
			axios.post(`${baseUrl}/favorites`, obj)
			setFavorites((prev) => [...prev, obj])
		}

	}

	const onRemoveItem = (id) => {
		axios.delete(`${baseUrl}/cart/${id}`)
		setCartItems((prev) => prev.filter(item => item.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const isItemAdded = (id) =>{
		return cartItems.some((obj) => Number(obj.id) === Number(id))
	}



	return (
		<AppContext.Provider value={{ items, cartItems, favorites, onAddToFavorite, isItemAdded, setCartOpened }}>
			<div className="wrapper">

				{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

				<Header onClickCart={() => setCartOpened(true)} />

				<Route exact path="/">
					<Home
						searchValue={searchValue}
						cartItems={cartItems}
						onChangeSearchInput={onChangeSearchInput}
						setSearchValue={setSearchValue}
						items={items}
						favorites={favorites}
						onAddToCart={onAddToCart}
						onAddToFavorite={onAddToFavorite}
						isLoading={isLoading}
					/>
				</Route>

				<Route path="/favorites">
					<Favorites />
				</Route>

				<Route path="/orders">
					<Orders items={cartItems} />
				</Route>
			</div>

		</AppContext.Provider>
	)
}

export default App;
