import {showNotification}  from '@mantine/notifications';
import {Icon} from '@iconify/react';

function useCreateNotification(){

    function createNotification(data){
        let config = {
            autoClose : data.timer,
            title : data.title,
            message : data.message,
            icon : <Icon icon = {data.icon} />
        }

        switch(data.type){
            case "success":
                config["color"] = "green";
                break;

            case "failure":
                config["color"] = "red";
                break;
        }

        console.log('creating notification')
        showNotification(config)
    }

    return createNotification

}

export default useCreateNotification;