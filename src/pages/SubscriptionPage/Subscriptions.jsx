import React from 'react'

import {
    Link,
    useNavigate
} from 'react-router-dom'
import {Button,Card,Badge,Image,Group,Text} from '@mantine/core';


const subscriptionItems = [
    {
        name : "normal",
    },
    {
        name : "normal seller",
        path : "/subscription/seller"
    },
    {
        name : "premium seller",
        path : "/subscription/premium-seller"
    },
    {
        name : "company",
        path : "/subscription/company"
    }
]


function Subscriptions() {

    const navigate = useNavigate();

    return (
        <>
            <h2>Subscriptions</h2>
            <ul className="subscriptions-container">
                {/* <li>
                    <Link to = "/subscription/normal">
                        <Button>
                            normal
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to = "/subscription/seller">
                        <Button>
                            seller
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to = "/subscription/company">
                        <Button>
                            comoany
                        </Button>
                    </Link>
                </li> */}
                {
                    subscriptionItems.map(item => (
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section component="a" href="https://mantine.dev/">
                            <Image
                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                            height={160}
                            alt="Norway"
                            />
                        </Card.Section>
        
                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>
                                {item.name}
                            </Text>
                            <Badge color="pink" variant="light">
                            On Sale
                            </Badge>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, dicta?
                            </Text>
                        </Group>
                        <Button 
                            variant="light" 
                            color="blue" 
                            fullWidth 
                            mt="md" 
                            radius="md"
                            onClick = {() => navigate(item.path)}
                        >
                            {item.name}
                        </Button>
                    </Card>
                    ))
                }
            </ul>
        </>
    )
}

export default Subscriptions