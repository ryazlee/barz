import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { AVPlaybackStatus, ResizeMode, Video, Audio } from 'expo-av';
import AudioPlayer from '../AudioPlayer';

export default function BarzCamera({ navigation }) {
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [record, setRecord] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({} as AVPlaybackStatus);


    async function playSong() {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../../assets/trimmed.mp3'));
        await soundObject.playAsync();
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.granted)

            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus.granted);

        })();
    }, []);

    const takeVideo = async () => {
        playSong();
        if (camera) {
            const data = await camera.recordAsync({
                maxDuration: 10
            })
            setRecord(data.uri);
            console.log(data.uri);
        }
    }

    const stopVideo = async () => {
        camera.stopRecording();
    }

    if (hasCameraPermission === null || hasAudioPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasAudioPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'4:3'} />
            </View>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: record,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.buttons}>
                <Button
                    title={status.isLoaded ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isLoaded ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View>
            <Button
                title="Flip Video"
                onPress={() => {
                    setType(
                        type === CameraType.back
                            ? CameraType.front
                            : CameraType.back
                    );
                }} />
            <Button title="Take video" onPress={() => takeVideo()} />
            <Button title="Stop Video" onPress={() => stopVideo()} />
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    video: {
        alignSelf: 'center',
        width: 350,
        height: 220,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})