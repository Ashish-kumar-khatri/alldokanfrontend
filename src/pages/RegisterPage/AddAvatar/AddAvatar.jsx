import { 
	Button,
	Modal
 } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react';
import {showNotification} from '@mantine/notifications';

import './AddAvatar.css'

function AddAvatar({onChange,setCapturedAvatar,capturedAvatar}){

	const [modalOpened,setModalOpened] = useState(false);

	const [avatar,setAvatar] = useState(null);
	const [preview,setPreview] = useState(null);
	const [stream,setStream] = useState(null);

    const [imageCapture,setImageCapture] = useState(null);

	const [capturing,setCapturing] = useState(false);

	const inputRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	const captureAvatar = () => {
		setModalOpened(true);
		navigator.mediaDevices.getUserMedia({video : true})
			.then(stream => {
				setStream(stream);
				videoRef.current.srcObject = stream;
                const track = stream.getVideoTracks()[0];
                setImageCapture(new ImageCapture(track));
			})
	}

    function drawCanvas(canvas, img) {
        console.log('drawnig canvas',canvas,img,getComputedStyle(canvas).width)
        canvas.width = getComputedStyle(canvas).width.split('px')[0];
        canvas.height = getComputedStyle(canvas).height.split('px')[0];
        let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
        let x = (canvas.width - img.width * ratio) / 2;
        let y = (canvas.height - img.height * ratio) / 2;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
            x, y, img.width * ratio, img.height * ratio);
        let data = canvasRef.current.toDataURL('image/png');
        setPreview(data);
        setCapturedAvatar(data);
        videoRef.current.pause();
        setModalOpened(false);
        stream.getTracks().forEach((track) => {
            track.stop();
            stream.removeTrack(track);
        })
        setCapturing(false);
		showNotification({
			title : "success",
			message : 'avatar captured successfully',
			timer : 10000
		})
    }

	useEffect( () => {
		if(canvasRef && capturing){
            imageCapture.takePhoto()
                .then(blob => {
                    console.log('blob = ',blob)
                    setAvatar(blob);
                    return createImageBitmap(blob)
                })
                .then(imageBitmap => {
                    console.log('imageBitmap = ',imageBitmap)
                    drawCanvas(canvasRef.current,imageBitmap)
                })
		}
	},[capturing,imageCapture])


	useEffect(() => {
		if(avatar){
			onChange({
				name : "avatar",
				value : avatar
			})
		}
	},[avatar])

	
	return(
		<div className='avatar-upload-container'>
			{
				preview || capturedAvatar ?
					<img className = "img-area" src={preview ? preview : capturedAvatar} alt="" />:
					<div className="img-area">
						<Icon icon = "material-symbols:add-circle-outline" />
					</div>
			}
			<Button
				variant = "outline"
				// onClick = {() => inputRef.current.click()}
				onClick = {captureAvatar}
			>
				{
					preview ?
						"capture avatar":
						"capture avatar"
				}
			</Button>
			<Modal
				opened = {modalOpened}
				onClose = {() => {
					setModalOpened(false);
				}}
				title = "capture avatar"
			>
				<video 
					ref = {videoRef}
					autoPlay
					style = {{
						height : "400px",
						width : "400px"
					}}
				/>
				<Button
					fullWidth
					mt = "2em"
					onClick = {() => setCapturing(true)}
					loading = {capturing}
				>
					Capture
				</Button>
			</Modal>
			<small
				className='description important' 
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis tenetur nostrum dignissimos aspernatur harum consectetur 
			</small>
			<canvas 
				style = {{
					border: "1px solid red",
					height : "300px",
					width : "300px",
					marginInline : "auto",
					display : "none",
				}}
				ref = {canvasRef}
			/>
		</div>
	)

}

export default AddAvatar;
