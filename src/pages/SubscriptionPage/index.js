import OtherLayout from "../../layout/OtherLayout";
import {Nav,SearchBar} from '../../components/';
import { Button } from "@mantine/core";
import { Link,Outlet } from "react-router-dom";
import Subscriptions from './Subscriptions';
import './style.css';

const SubscriptionPage = () => {
    return(
        <>
            <OtherLayout
                >
                <div className = "main">
                    <Outlet />
                </div>
            </OtherLayout>
        </>
    )
}

export default SubscriptionPage;