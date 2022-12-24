import { 
	Button,
	Modal
 } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react';
import {showNotification} from '@mantine/notifications';

import './AddAvatar.css'

function AddAvatar({onChange,setAvatarDataImg,avatarDataImg,setAlreadyUploadedAvatar}){

	const [localAvatar,setLocalAvatar] = useState(null);

	const [modalOpened,setModalOpened] = useState(false);
	// stores the state of capturing image from video in modal
	const [capturing,setCapturing] = useState(false);
	// stores the stream of the video inside modal
	const [videoStream,setVideoStream] = useState(null);

	const [imagePreview,setImagePreview] = useState(null);

	const [imageForCapturing,setImageForCapturing] = useState(null);

	const canvasRef = useRef(null);
	const videoRef = useRef(null);

	// gets user stream and puts into the videRef
	const getUserStream = () => {
		setModalOpened(true);
		navigator.mediaDevices.getUserMedia({
			video : true
		})
			.then(stream => {
				setVideoStream(stream);
				videoRef.current.srcObject = stream;
				const track = stream.getVideoTracks()[0];
				setImageForCapturing(new ImageCapture(track))
			})
	}

	// drawing on a canvas
	const drawOnCanvas = (canvas,img) => {
		canvas.width = getComputedStyle(canvas).width.split('px')[0];
		canvas.height = getComputedStyle(canvas).height.split('px')[0];
		let ratio = Math.min(canvas.width / img.width,canvas.height / img.height);
		let x = (canvas.width - img.width * ratio) / 2;
		let y = (canvas.height - img.height * ratio) / 2;
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		canvas.getContext('2d').drawImage(img,0,0,img.width,img.height,x,y,img.width * ratio,img.height * ratio);
		let data = canvasRef.current.toDataURL('image/png');
		setImagePreview(data);
		setAvatarDataImg(data)
		videoRef.current.pause();
		setModalOpened(false);
		videoStream.getTracks().forEach(track => {
			track.stop();
			videoStream.removeTrack(track);
		})
		setCapturing(false);
		showNotification({
			title : "success",
			message : 'avatar captured successfully',
			timer : 10000
		})
	}

	useEffect(() => {
		if(canvasRef && capturing && imageForCapturing){
			// sometimes canvas Ref is null so checking  it for possible error
			imageForCapturing.takePhoto()
				.then(blob => {
					console.log('blob = ',blob)
					setLocalAvatar(blob);
					onChange({
						name : "avatar",
						value : blob
					})
					setAlreadyUploadedAvatar(false);
					return createImageBitmap(blob);
				})
				.then(imageBitmap => {
					console.log('imageBitMap = ',imageBitmap);
					drawOnCanvas(canvasRef.current,imageBitmap);
				})
			}
	},[capturing,imageForCapturing])
	
	return(
		<div className='avatar-upload-container'>
			{
				imagePreview || avatarDataImg ?
					<img className = "img-area" src={imagePreview ? imagePreview : avatarDataImg} alt="" />:
					<div className="img-area">
						<Icon icon = "material-symbols:add-circle-outline" />
					</div>
			}
			<Button
				variant = "outline"
				onClick = {getUserStream}
				autoFocus = {true}
			>
				{/* { */}
					{/* preview ? */}
						{/* "capture avatar": */}
						"capture avatar"
				{/* } */}
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
			
			{/* for displaying captured image */}
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
