import React, { useContext, useEffect, useState } from 'react';
import './PaginateUserList.css';
import SingleUser from './SingleUser/SingleUser';

import TablePagination from '@material-ui/core/TablePagination';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TimelineIcon from '@material-ui/icons/Timeline';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';


import iflag from '../../assets/indianFlag.png';
import cflag from '../../assets/canadianFlag.png';
import gl from '../../assets/globe.png';
import { UserCardContext } from '../../pages/UserManagement';
import { GetAllCustomers, GetAllMerchants, GetCanadianCustomers, GetCanadianMerchants, GetIndianCustomers, GetIndianMerchants } from '../../APIs/AdminManager';
import { IsMainLoading } from '../../pages/UserManagement';


function PaginateUserList() {

    const [customerPhone, setCustomerPhone, merchantPhone, setMerchantPhone, userType, setUserType, userData, setUserData] = useContext(UserCardContext);
    const [isLoading, setIsLoading] = useContext(IsMainLoading);


    const [usersList, setUsersList] = React.useState();

    const [page, setPage] = React.useState(0);
    const [pageALL, setPageALL] = React.useState(0);
    const [pageINDIA, setPageINDIA] = React.useState(0);
    const [pageCANADA, setPageCANADA] = React.useState(0);

    const [count, setCount] = useState(100);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowsPerPageALL, setRowsPerPageALL] = React.useState(10);
    const [rowsPerPageINDIA, setRowsPerPageINDIA] = React.useState(10);
    const [rowsPerPageCANADA, setRowsPerPageCANADA] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if ((newPage - 1) * rowsPerPage >= count) {
            alert("All users loaded.")
            return;
        }
        if (value === 'all') {

            setPageALL(newPage);

            (userType === 'customer') ? AllCustomers() : AllMerchants();
        }
        else if (value === 'india') {

            setPageINDIA(newPage);
            (userType === 'customer') ? IndianCustomers() : IndianMerchants()
        }
        else if (value === 'canada') {

            setPageCANADA(newPage);
            (userType === 'customer') ? CanadianCustomers() : CanadianMerchants();
        }

    };


    const handleChangeRowsPerPage = (event) => {
        if (rowsPerPage >= count) {
            alert("All users loaded.")
            return;
        }
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);

        if (value === 'all') {

            setRowsPerPageALL(parseInt(event.target.value, 10));
            setPageALL(1);
            (userType === 'customer') ? AllCustomers() : AllMerchants();
        }
        else if (value === 'india') {
            setRowsPerPageINDIA(parseInt(event.target.value, 10));
            setPageINDIA(1);

            (userType === 'customer') ? IndianCustomers() : IndianMerchants()
        }
        else if (value === 'canada') {
            setRowsPerPageCANADA(parseInt(event.target.value, 10));
            setPageCANADA(1);
            (userType === 'customer') ? CanadianCustomers() : CanadianMerchants();
        }
    };



    useEffect(() => {
        console.log("rendered");
        setRowsPerPage(rowsPerPageALL);
        (userType === 'customer') ? AllCustomers() : AllMerchants();
    }, [])


    const [value, setValue] = useState('all');

    const handleChange = async (event, newValue) => {
        setValue(newValue);

        if (newValue === 'all') {
            //GETALL USERS with rowperpageAll, pageAll 
            (userType === 'customer') ? AllCustomers() : AllMerchants();

            setPage(pageALL);
            setRowsPerPage(rowsPerPageALL);
        }
        else if (newValue === 'india') {
            //GETALL indian USERS

            (userType === 'customer') ? IndianCustomers() : IndianMerchants()

            setPage(pageINDIA);
            setRowsPerPage(rowsPerPageINDIA);
        }
        else if (newValue === 'canada') {
            //GETALL canadian USERS

            (userType === 'customer') ? CanadianCustomers() : CanadianMerchants();

            setPage(pageCANADA);
            setRowsPerPage(rowsPerPageCANADA);
        }

    };



    const IndianFlag = (<img src={iflag} ></img>);
    const CanadianFlag = (<img src={cflag} ></img>);
    const Globe = (<img src={gl} ></img>);


    const AllCustomers = () => {
        setIsLoading(true);

        GetAllCustomers(rowsPerPageALL, pageALL).then((data) => {
            setCount(data.count);
            if (data.customers.length < 1) {
                alert("No More users found!")
                return
            };
            setUsersList(data.customers);

        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }

    const IndianCustomers = () => {
        setIsLoading(true);

        GetIndianCustomers(rowsPerPageINDIA, pageINDIA).then(data => {
            setCount(data.count);
            if (data.customers.length < 1) {
                alert("No More users found!")
                return
            };
            console.log(data.customers, data.count);
            setUsersList(data.customers);
        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }

    const CanadianCustomers = () => {
        setIsLoading(true);

        GetCanadianCustomers(rowsPerPageCANADA, pageCANADA).then(data => {
            setCount(count);
            if (data.customers.length < 1) {
                alert("No More users found!")
                return
            };
            console.log(data.customers, data.count);
            setUsersList(data.customers);
        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }

    const AllMerchants = () => {
        setIsLoading(true);

        GetAllMerchants(rowsPerPageALL, pageALL).then(data => {
            setCount(data.count);
            if (data.merchants.length < 1) {
                alert("No More users found!")
                return
            };

            setUsersList(data.merchants);
        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }

    const IndianMerchants = () => {
        setIsLoading(true);

        GetIndianMerchants(rowsPerPageINDIA, pageINDIA).then(data => {
            setCount(data.count);
            if (data.merchants.length < 1) {
                alert("No More users found!")
                return
            };
            console.log(data.merchants, data.count);
            setUsersList(data.merchants);
        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }

    const CanadianMerchants = () => {
        setIsLoading(true);


        GetCanadianMerchants(rowsPerPageCANADA, pageCANADA).then(data => {
            setCount(count);
            if (data.merchants.length < 1) {
                alert("No More users found!")
                return
            };
            console.log(data.merchants, data.count);
            setUsersList(data.merchants);
        }).catch((err) => alert("Merchant not found" + err))
            .finally(() => setIsLoading(false));
    }


    return (
        <div className="PaginateUserList">


            <section className="Country_Filter">
                <BottomNavigation value={value} onChange={handleChange} >
                    <BottomNavigationAction label="All" value="all" icon={Globe} />
                    <BottomNavigationAction label="India" value="india" icon={IndianFlag} />
                    <BottomNavigationAction label="Canada" value="canada" icon={CanadianFlag} />
                </BottomNavigation>
            </section>


            <div className="Pagination">

                <TablePagination
                    component="div"
                    count={count ? count : 50}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </div>
            <div className="USERLIST">
                {isLoading ? <CircularProgress disableShrink /> : null}


                {
                    usersList && usersList.map(user => {
                        return <SingleUser key={user._id} user={user} />
                    })
                }
            </div>
        </div>
    )
}

export default PaginateUserList
