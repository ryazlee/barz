import React, { useState, useEffect } from 'react';
import { Camera, CameraType, PermissionStatus } from 'expo-camera';
import { Button, Text, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';


export default function BarzCamera() {
    const [hasAudioPermission, setHasAudioPremission] = useState(null)
    const [hasCameraPermission, setHasCameraPremission] = useState(null)
    const [camera, setCamera] = useState(null);
    const [record, setRecord] = useState(null);
    const [type, setType] = useState(CameraType.front)
    const video = React.useRef(null);
    const [status, setStatus] = useState({} as AVPlaybackStatus);


    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPremission(cameraStatus.granted)
            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPremission(audioStatus.granted)



        })();
    }, []);


    const takeVideo = async () => {
        if (camera) {
            const data = await camera.recordAsync({
                maxDuration: 10
            })
            setRecord(data.uri)
            console.log(data.uri)
        }
    }

    const stopVideo = async () => {
        camera.stopRecording();
    }

    if (hasCameraPermission === null || hasAudioPermission === null) {
        return <View />
    }

    // Add error checks here for camera/audio permissions

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={ref => setCamera(ref)}
                type={type}
                ratio={'4:3'}
                style={{ flex: 1, aspectRatio: 1 }}
            />
            <Video
                ref={video}
                source={{
                    uri: record,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

            <Button
                title={status.isLoaded ? 'Pause' : "Play"}
                onPress={() => status.isLoaded ? video.current.pauseAsync() : video.current.playAsync()
                }
            />
            <Button
                title="Take Video"
                onPress={() => takeVideo()}
            />
            <Button
                title="Stop Video"
                onPress={() => stopVideo()}
            />

        </View>

    )
}