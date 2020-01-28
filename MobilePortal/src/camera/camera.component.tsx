import { RNCamera, FaceDetector } from 'react-native-camera';
import React, { useRef } from 'react';

export function CameraComponent() {
    const cameraRef = useRef<RNCamera>(null);
    return (
        <RNCamera 
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
         />
    );
}