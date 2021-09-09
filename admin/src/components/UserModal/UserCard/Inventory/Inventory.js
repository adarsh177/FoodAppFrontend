import React, { useState, useEffect, useContext } from 'react';
import { GetMerchantCommodities, GetMerchantListing } from '../../../../APIs/AdminManager';
import { UserCardContext } from '../../../../pages/UserManagement';
import { IsUserCardLoading } from '../UserCard';
import './Inventory.css';

import InventoryItem from './InventoryItem/InventoryItem';

function Inventory(props) {

    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);
    const  [isUserCardLoading, setIsUserCardLoading] = useContext(IsUserCardLoading);

    const [Inventory, setInventory] = useState();
    const [Listing, setListing] = useState();

    useEffect(() => {
        if(!userData) {
            alert("Unable to fetch data!");
            return
        }
        if(props.type === "inventory") {
            setIsUserCardLoading(true);

            GetMerchantCommodities(userData.userId).then(commodity=> {
                commodity.length < 1 ? alert("No commodity yet!"): null
                setInventory([...commodity]);
                setIsUserCardLoading(false);

            })
            .catch(err=> {alert(err)});
        }
        if(props.type === "listing") {
            setIsUserCardLoading(true);

            GetMerchantListing(userData.userId).then(listing=> {
                listing.length < 1 ? alert("No Listing yet!"): null
                setListing([...listing]);
                setIsUserCardLoading(false);

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
