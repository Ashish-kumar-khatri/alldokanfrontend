import React,{
    useState
} from 'react'
import {
    Text
} from '@mantine/core';
import {Icon} from '@iconify/react'

function MyParagraphCollapsable({text,lineClamp}) {

    const [opened,setOpened] = useState(false);

    function toggleCollapsable(){
        setOpened(prev => !prev)
    }

  return (
    <>
        <Text
            lineClamp={opened ? 1000 : lineClamp}
        >
            {text}
        </Text>
        {
            <p
                onClick = {toggleCollapsable}
                style = {{
                    fontWeight : 500,
                    cursor : 'pointer',
                    display : "flex",
                    alignItems : "center",
                    gap : ".5em",
                    padding:".5em",
                    width : "fit-content",
                    borderRadius : "5px",
                    background : "var(--dark-gray)",
                    marginTop : "1em"
                }}
            >{
                !opened ?
                    <Icon icon = "material-symbols:add-box-outline" />:
                    <Icon icon = "ri:subtract-fill" />
                }
                <span>
                    {
                        opened ?
                            "see less":
                            "see more"
                    }
                </span>
            </p>
        }
    </>
  )
}

export default MyParagraphCollapsable