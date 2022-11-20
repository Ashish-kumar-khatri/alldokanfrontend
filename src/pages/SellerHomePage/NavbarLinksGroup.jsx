import React,{
    useState
} from 'react'
import {
    Box,
    Text, UnstyledButton,
    Group,
    ChevronIcon,
    Collapse,
    createStyles
} from '@mantine/core'

import { Icon } from '@iconify/react'


const useStyles = createStyles(theme => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    
      link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        cursor : "pointer",
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
          color: "var(--primary)",
        },
      },
    
      chevron: {
        transition: 'transform 200ms ease',
      },
}))



export function LinksGroup({icon,label,initiallyOpened,links}){

    const { classes } = useStyles()

    console.log('links = ',links)
    const hasLinks = Array.isArray(links);
    const [opened,setOpened] = useState(initiallyOpened || false);

    const items = (hasLinks ? links : []).map(link => (
        <Text
            className = {classes.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ))

    return(
        <>
            <UnstyledButton
                onClick = {() => setOpened(prev => !prev)}
                className={classes.control}
            >
                <Group
                    position="apart" spacing={0}
                >
                    <Box
                        sx = {{
                            display : "flex",
                            gap : "1em",
                            padding : ".5em",
                            alignItems : "center"
                        }}
                    >
                        <Icon icon = {icon} style = {{
                            fontSize : "var(--fs-m)",
                            background : "var(--primary-light)",
                            height : "30px",
                            width : "30px",
                            padding : ".3em",
                            borderRadius : "5px",
                            color : "var(--primary)"
                        }}/>
                        <Box>
                            {label}
                        </Box>
                    </Box>
                    {
                        hasLinks && (
                            <ChevronIcon
                                style = {{
                                    transform : opened ? 'rotate(0deg)' : 'rotate(-90deg)'
                                }}
                            />
                        )
                    }
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse>:null}
        </>
    )
}


export function NavbarLinksGroup(){
    return(
        <div>
            NavbarLinksGroup
        </div>
    )
}
