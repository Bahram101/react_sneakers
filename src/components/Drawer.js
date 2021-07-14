import React from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const Drawer = ({ onClose, onRemove, items = [] }) => {

    const baseUrl = 'http://localhost:3002';

    const { cartItems, setCartItems, totalPrice} = useCart()
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)

    const onClickOrder = async () => {
        try {
            axios.post(`${baseUrl}/orders`, cartItems)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${baseUrl}/cart/${item.id}`);
            }
        } catch (error) {
            alert('ОШИБКА')
        }

    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-content-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-items-center justify-content-between mb-20">
                                    <div className="cartItemImg">
                                        <img src={obj.imgUrl} alt="sneakers" />
                                    </div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src="/img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice * 5 / 100} руб. </b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">
                                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                        description={
                            isOrderComplete
                                ? `Ваш заказ #${2} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        image={isOrderComplete ? '/img/complete-order.jpg' : null}
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;