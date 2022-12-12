import {showNotification}  from '@mantine/notifications';
import {Icon} from '@iconify/react';
import toast from 'react-hot-toast';

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

    function createToast(data){
        switch(data.type){
            case "success":
                toast.success(data.message,{
                    position : "top-center",
                    icon : data.icon
                });
                break;
            
            case "error":
                toast.error(data.message,{
                    position : "top-center",
                    icon : data.icon
                });
                break;
        }
    }

    return {createNotification,createToast}

}

export default useCreateNotification;