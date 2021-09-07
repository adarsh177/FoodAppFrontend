import React, { useEffect, useState } from 'react';
import { GetCustomerDetails, GetMerchantDetails } from '../../../APIs/AdminManager';
import { GetOrderDetails } from '../../../APIs/OrderManager';
import './OrderCard.css';

import Dinero from 'dinero.js';

function OrderCard() {

    const [Order, setOrder] = useState();
    const [Customer, setCustomer] = useState();
    const [Merchant, setMerchant] = useState();

    const get = async (order) => {

        setCustomer(await GetCustomerDetails(order.customerId));
        setMerchant(await GetMerchantDetails(order.merchantId));
    }

    useEffect(() => {
        GetOrderDetails("6131a871479a13246459a261").then(order => {
            setOrder(order);
            get(order);
        })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Order_Card">
            <h1>Order</h1>
            <h3>#{Order && Order._id}</h3>
            <p className="Order_Date">Ordered At: {Order ? new Date(Order.timeOfOrder).toLocaleDateString() : null}</p>

            <div className="Order_Status">
                <p >Status</p>
                <p style={{ fontWeight: "bold" }}>{Order && Order.status}</p>
            </div>

            {Customer && <div className="Order_Customer">
                <p>Customer</p>
                {Customer && Customer.name}
                <a href={`tel:${Customer && Customer.phone}`}>Call</a>

            </div>}
            {Merchant &&
                <div className="Order_Merchant">
                    <p>Merchant</p>
                    {Merchant && Merchant.name}
                    <a href={`tel:${Merchant && Merchant.phone}`}>Call</a>
                </div>
            }

            <div className="Order_Breakup">
                <div className="Order_List">

                    {Order && Order.items.map((item) => {
                        return <p className="Order_item">{item.name} x{item.count}
                            <span>
                                {Dinero(item.price).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                                {Dinero(item.price).toUnit()}
                            </span>
                        </p>
                    })}

                    {Order && Order.promotion ? <p className="Promo">PROMO: {Order && Order.promotion.code}
                        <span>
                            -{Dinero(Order.promoValue).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                            {Dinero(Order.promoValue).toUnit()}
                        </span> </p> : null}
                </div>

                <div className="Order_taxes">
                    Tax
                    {Order && Order.taxes.map((tax) => {
                        return <p className="Order_tax">{tax.name} ({tax.percent})
                            <span>
                                {Dinero(tax.value).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                                {Dinero(tax.value).toUnit()}
                            </span>
                        </p>
                    })}


                </div>

                {Order ? <p className="Order_Total">
                    Total
                    <span>
                        {Dinero(Order.finalValue).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                        {Dinero(Order.finalValue).toUnit()}
                    </span>

                </p> : null}
            </div>


        </div>
    )
}

export default OrderCard
