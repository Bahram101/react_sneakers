const Drawer = ({ onClose, onRemove, items = [] }) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <div className="drawer-top">
                    <h2 className="d-flex justify-content-between">
                        Корзина
                        <img src="/img/btn-remove.svg" alt="remove" className="removeBtn" onClick={onClose} />
                    </h2>
                    {
                        items.length > 0 ? (
                            items.map((obj) => (
                                <div className="items">
                                    <div className="cartItem d-flex align-items-center mb-3" >
                                        <img className="cartItemImg me-3" src={obj.imgUrl} width={70} height={70} alt="skeakers" />
                                        <div>
                                            <p>{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="remove" className="removeBtn" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                                <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty" />
                                <h2>Корзина пустая</h2>
                                <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                                <button onClick={onClose} className="greenButton">
                                    <img src="/img/arrow.svg" alt="Arrow" />
                                    Вернуться назад
                                </button>
                            </div>
                        )
                    }

                </div>

                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%</span>
                            <div></div>
                            <b>1074 руб.</b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                </div>
            </div>
        </div >
    )
}

export default Drawer;