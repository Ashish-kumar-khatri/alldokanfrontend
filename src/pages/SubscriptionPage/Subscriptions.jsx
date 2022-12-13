import React from 'react'

import {
    Link,
    useNavigate
} from 'react-router-dom'

import SubscriptionCard from './SubscriptionCard/';
import {useAuthContext} from '../../hooks/'

const subscriptionItems = [
    {
        title : "buyer",
        price : "0",
        features : [
            {
                type : "available",
                text : "Access to all basic features"
            },
            {
                type : "available",
                text : "Basic reporting and analytics"
            },
            {
                type : "available",
                text : "Upto 10 individual users"
            },
            {
                type : "available",
                text : "20 individual data each user"
            },
            {
                type : "available",
                text : "Basic chat and email service"
            },
            {
                type : "available",
                text : "Access to all basic features"
            }
        ]
    },
    {
        title : "normal seller",
        price : "0",
        link : "/seller",
        features : [
            {
                type : "available",
                text : "Access to all basic features"
            },
            {
                type : "available",
                text : "Basic reporting and analytics"
            },
            {
                type : "available",
                text : "Upto 10 individual users"
            },
            {
                type : "available",
                text : "20 individual data each user"
            },
            {
                type : "available",
                text : "Basic chat and email service"
            },
            {
                type : "available",
                text : "Access to all basic features"
            }
        ]
    },
    {
        title : "premium seller",
        price : "5000",
        link : "/premium-seller",
        features : [
            {
                type : "available",
                text : "Access to all basic features"
            },
            {
                type : "available",
                text : "Basic reporting and analytics"
            },
            {
                type : "available",
                text : "Upto 10 individual users"
            },
            {
                type : "available",
                text : "20 individual data each user"
            },
            {
                type : "available",
                text : "Basic chat and email service"
            },
            {
                type : "available",
                text : "Access to all basic features"
            }
        ]
    },
    {
        title : "company",
        price : "10000",
        link : "/company",
        features : [
            {
                type : "available",
                text : "Access to all basic features"
            },
            {
                type : "available",
                text : "Basic reporting and analytics"
            },
            {
                type : "available",
                text : "Upto 10 individual users"
            },
            {
                type : "available",
                text : "20 individual data each user"
            },
            {
                type : "available",
                text : "Basic chat and email service"
            },
            {
                type : "available",
                text : "Access to all basic features"
            }
        ]
    },
    
]


function Subscriptions() {

    const navigate = useNavigate();

    const {user} = useAuthContext();

    return (
        <div className = "subscription-wrapper">
            {/* <h3 className = "main-title">Subscriptions</h3> */}
            <div className="title-header">
                <h2 className='main-title'>
                    Pick the best plan for you
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ipsam amet maxime praesentium modi eum ipsa qui neque culpa? Sapiente?
                </p>
                <div className="wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#0099ff" fill-opacity="1" d="M0,160L60,154.7C120,149,240,139,360,122.7C480,107,600,85,720,74.7C840,64,960,64,1080,64C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    </svg>
                </div>
            </div>
            <ul className="subscriptions-container">
                {
                    subscriptionItems?.map((item,index) => (
                        <SubscriptionCard
                            active = {
                                (item?.title.toUpperCase() == user?.account_type) ? true : false
                            }
                            key = {index}
                            title = {item.title}
                            price = {item.price}
                            features = {item.features}
                            link = {item.link}
                            // onClick = {subscriptionNavigateHandler}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Subscriptions