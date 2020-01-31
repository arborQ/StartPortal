// import { RNCamera, FaceDetector } from 'react-native-camera';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import styles from './styles';

function displayAccessString(state: boolean | null): string {
    if (state === null) {
        return 'Czekam na dostep';
    }

    return state ? 'Dostępd dodany' : 'Brak dostępu';
}

export function CameraComponent() {
    const [hasAccessCamera, changeAccessCamera] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera>();

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            changeAccessCamera(status === 'granted');
        })();
    });
    return (
        <View>
            <Camera
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                style={styles.preview}
                ref={cameraRef}
            />
        </View>
    );

}