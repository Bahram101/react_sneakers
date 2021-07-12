import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import axios from 'axios';


const App = () => {

	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	React.useEffect(() => {

		axios.get("http://localhost:3007/products").then((res) => {
			setItems(res.data)
		})
		axios.get('http://localhost:3007/cart').then((res) => {
			setCartItems(res.data)
		})
		axios.get('http://localhost:3007/favorites').then((res) => {
			setFavorites(res.data)
		})
	}, [])


	const onAddToCart = (obj) => {
		if (cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id))) {
			axios.delete(`http://localhost:3007/cart/${obj.id}`)
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
		} else {
			axios.post('http://localhost:3007/cart', obj)
			setCartItems((prev) => [...prev, obj])
		}
	}

	const onAddToFavorite = (obj) => {
		if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
			axios.delete(`http://localhost:3007/favorites/${obj.id}`)
			setFavorites((prev)=> prev.filter((item)=> Number(item.id) !== Number(obj.id)))
		} else {
			axios.post('http://localhost:3007/favorites', obj)
			setFavorites((prev) => [...prev, obj])
		}

	}


	const onRemoveItem = (id) => {
		axios.delete(`http://localhost:3007/cart/${id}`)
		setCartItems((prev) => prev.filter(item => item.id !== id))
	}


	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}	


	return (
		<div className="wrapper">

			{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

			<Header onClickCart={() => setCartOpened(true)} />

			<Route exact path="/">
				<Home
					searchValue={searchValue}
					onChangeSearchInput={onChangeSearchInput}
					setSearchValue={setSearchValue}
					items={items}
					onAddToCart={onAddToCart}
					onAddToFavorite={onAddToFavorite}
				/>
			</Route>

			<Route path="/favorites">
				<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>

			<Route path="/orders">
				<Orders items={cartItems} />
			</Route>
		</div>
	)
}

export default App;
