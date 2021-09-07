import React, { useState, useEffect } from 'react';
import { GetMerchantCommodities, GetMerchantListing } from '../../../../APIs/AdminManager';
import './Inventory.css';

import InventoryItem from './InventoryItem/InventoryItem';

function Inventory(props) {

    const [Inventory, setInventory] = useState();
    const [Listing, setListing] = useState();

    useEffect(() => {
        console.log(props.type)
        if(props.type === "inventory") {

            GetMerchantCommodities("U6mWsqyFzgSHQaYozREIwS77MIp1").then(commodity=> {
                console.log(commodity);
                setInventory([...commodity]);
            })
            .catch(err=> {alert(err)});
        }
        if(props.type === "listing") {

            GetMerchantListing("FBDVZxjXGjTV5NdBbo3rXa1er8G3").then(listing=> {
                console.log(listing)
                setListing([...listing]);
            })
            .catch(err=> {alert(err)});
        }
    }, [])

    return (
        
        <div className="Inventory">
           

             {props.type === "inventory" && Inventory && 
                Inventory.map(item => {
                    return (<InventoryItem key={item._id}  type={props.type} itemDetails={item} />)
                })
            }
             {props.type === "listing" && Listing && 
                Listing.map(item => {
                    console.log(item);
                    return (<InventoryItem key={item._id} type={props.type} itemDetails={item} />)
                })
            }

        </div>
    )
}

export default Inventory
