import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Webcam } from 'react-webcam';

export const CameraFeed = () => {
    const getWebcam = () => {
        var cameraElement = document.createElement('canvas');
        var webcam = <Webcam />

        return setWebcam(webcam);
    }
    const initialImage = {
        image: null,
        isLoading: false,
        captured: false,
        webcam: null
    };
    const [capturedImage, setCapturedImage] = useState([initialImage]);
    const [webcam, setWebcam] = useState([]);

    useEffect(() =>{
        if (!capturedImage.image)
        {
            const currentState = [...capturedImage];
            currentState.webcam = getWebcam();
        }
        
    });

    useEffect(() => {
        if (capturedImage.captured) {

        }
    })

    const uploading = capturedImage.isLoading ?
        <div>
            <p>Uploading, hold on....</p>
        </div> :
        <span>{capturedImage.image}</span>

    const current = !capturedImage.captured ? 
        <input type="file" accept="image/*"/> 
        :
        capturedImage.image;
    return (
        <>
            <div>{uploading}</div>
            <div>{current}</div>
            <div>{capturedImage.webcam}</div>
            <Button className="captureButton">Upload Photo</Button>
            <Button className='takePicture'>Take Picture</Button>
        </>
    );
};

export default CameraFeed;