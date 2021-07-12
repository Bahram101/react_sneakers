import { Link } from "react-router-dom";

const Header = ({ onClickCart }) => {
    return (
        <header className="d-flex justify-content-between align-items-center">
            <Link to="/">
                <div className="d-flex align-items-center">
                    <img src="/img/logo.png" width={40} height={40} alt="logo" />
                    <div>
                        <h3 className="mb-0 text-uppercase">React Sneakers</h3>
                        <p className="logo-title m-0">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={onClickCart}>
                    <img src="/img/cart.svg" width={18} height={18} alt="Корзина" />
                    <span>1205 руб.</span>
                </li>
                <Link to="/favorites">
                    <li>
                        <img src="/img/heart.svg" width={18} height={18} alt="Закладки" />
                    </li>
                </Link>
                <Link to="/orders">
                    <li>
                        <img src="/img/user.svg" width={18} height={18} alt="Профиль" />
                    </li>
                </Link>

            </ul>
        </header>
    )
}

export default Header;