import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import axios from 'axios';


const App = () => {

	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	React.useEffect(() => {
		axios.get('https://60e6f48a15387c00173e49a5.mockapi.io/items').then((res) => {
			setItems(res.data)
		})
		axios.get('https://60e6f48a15387c00173e49a5.mockapi.io/cart').then((res) => {
			setCartItems(res.data)
		})
		axios.get('https://60e6f48a15387c00173e49a5.mockapi.io/favorites').then((res) => {
			setFavorites(res.data)
		})

	}, [])

	const onAddToCart = (obj) => {
		axios.post('https://60e6f48a15387c00173e49a5.mockapi.io/cart', obj)
		setCartItems((prev) => [...prev, obj])
	}

	const onRemoveItem = (id) => {
		axios.delete(`https://60e6f48a15387c00173e49a5.mockapi.io/cart/${id}`)
		setCartItems((prev) => prev.filter(item => item.id !== id))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const onAddToFavorite = (obj) => {
		if(favorites.find((favObj) => favObj.id === obj.id)){
			axios.delete(`https://60e6f48a15387c00173e49a5.mockapi.io/favorites/${obj.id}`)
		}
		axios.post('https://60e6f48a15387c00173e49a5.mockapi.io/favorites', obj)
		setFavorites((prev) => [...prev, obj])
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
		</div>
	)
}

export default App;
