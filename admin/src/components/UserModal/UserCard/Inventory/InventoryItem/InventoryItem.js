import React from 'react';
import './InventoryItem.css';

import Dinero from 'dinero.js';
import { useHistory } from 'react-router';

function InventoryItem(props) {
    const linkStack = useHistory();

    return (
        <div className="InventoryItem" >
            <img src={props.itemDetails && props.itemDetails.image} alt="" />
            <div className="Inv_Mid">
                <h3 className="Item_Name">{props.itemDetails && props.itemDetails.name}</h3>
                <p>{props.itemDetails && props.itemDetails.description}</p>
                <p><span>Ingredients:</span> {props.itemDetails && props.itemDetails.ingredients.join(', ')}</p>
                <p><span>Tags:</span> {props.itemDetails && props.itemDetails.tags.join(', ')} </p>
            </div>

            {props.type === "listing" ?
                <div className="Inv_Right">
                    <p className="Inv_Pricing">
                        <span>
                            {Dinero(props.itemDetails && props.itemDetails.listingPrice && props.itemDetails.listingPrice).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                            {Dinero(props.itemDetails && props.itemDetails.listingPrice && props.itemDetails.listingPrice).toUnit()}
                        </span>

                        {Dinero(props.itemDetails && props.itemDetails.price).getCurrency() === 'INR' ? '₹' : "$"}{' '}
                        {Dinero(props.itemDetails && props.itemDetails.price).toUnit()}

                    </p>
                    <p className="Expiry">
                       <span>Expiry: </span> {props.itemDetails && new Date(props.itemDetails.expiresOn).toLocaleTimeString()} | {props.itemDetails && new Date(props.itemDetails.expiresOn).toLocaleDateString()}
                    </p>
                </div>

                : null
            }

        </div>
    )
}

export default InventoryItem
