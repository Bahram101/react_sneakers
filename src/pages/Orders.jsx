import axios from "axios";
import React from "react";
import Card from "../components/Card";



const Orders = ({ }) => {

    const baseUrl = 'http://localhost:3002';

    const [ orders, setOrders ] = React.useState([])
    
    React.useEffect(() => {
        (async () =>{
            const {data} = await axios.get(`${baseUrl}/orders`) 
        })()
    }, [])

    return (
        <div className="content p-4 mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <h2>Мои заказы</h2>
            </div>
            <div className="sneakers d-flex flex-wrap">
                {[].map((item, index) => (
                        <Card
                            key={index}                             
                            {...item}/>
                    ))}
            </div>
        </div>
    )
}

export default Orders