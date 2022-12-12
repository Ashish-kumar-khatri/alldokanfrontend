import React from 'react'
import { Icon } from '@iconify/react';

function FeatureList({
    text,
    type
}) {

    function getIcon(){
        switch(type){
            case "available":
                return <Icon icon = "material-symbols:check-circle-outline-rounded" />
                break;
        }
    }

    return (
        <li className = {`${type} featureListItem`}>
            {getIcon()}
            <span className="text">
                {text}
            </span>
        </li>
    )
}

export default FeatureList