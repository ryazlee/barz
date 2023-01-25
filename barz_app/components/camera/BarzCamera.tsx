import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { AVPlaybackStatus, ResizeMode, Video, Audio } from 'expo-av';
import AudioPlayer from '../AudioPlayer';

const config = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height
}

export default function BarzCamera({ navigation }) {
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [record, setRecord] = useState(null);
    const [type, setType] = useState(CameraType.front);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({} as AVPlaybackStatus);
    const t = status.isLoaded ? '../../assets/pause.png' : '../../assets/play.png'


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
        <View>
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
            <View style={styles.firstButtons}>
                <TouchableOpacity
                    onPress={() => {
                    setType(
                        type === CameraType.back
                            ? CameraType.front
                            : CameraType.back
                    );
                    } 
                    } 
                    style={[styles.secondaryButton]}>
                        <Image
                            source={require('../../assets/camera_flip_logo.png')}
                            style={styles.flipCameraImageIconStyle}
                        />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => takeVideo()} 
                    style={styles.takeVideoButton}>
                        <Image
                            source={require('../../assets/start_video.png')}
                            style={styles.videoImageIconStyle}
                        />
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => stopVideo()} 
                    style={styles.secondaryButton}>
                        <Image
                            source={require('../../assets/stop_video.png')}
                            style={styles.stopVideoImageIconStyle}
                        />
                </TouchableOpacity>
            </View>
            <View style={styles.secondButtons}>
                <TouchableOpacity
                    onPress={() =>
                        status.isLoaded ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    style={[styles.secondaryButton]}>
                        <Image
                                    
                            source={status.isLoaded ? require('../../assets/pause.png') : require('../../assets/play.png')}
                            style={styles.playPauseImageIconStyle}
                        />
                </TouchableOpacity>
            </View>
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
        flex: 1,
        alignSelf: 'center',
        width: 350,
        height: 220,
    },
    firstButtons: {
        marginTop: config.deviceHeight-350,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    secondButtons: {
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    takeVideoButton: {    
        flexDirection: 'row',
        marginTop: 5,
        width: 150,
        height: 150,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 5,
        borderColor: '#BF0000',
        backgroundColor: '#FF6961',
    },
    secondaryButton: {
        flexDirection: 'row',
        marginTop: 5,
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#C8D9F0',
        borderWidth: 4,
        borderColor: '#2E5984',
    },
    videoImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 75,
        width: 75,
        resizeMode: 'stretch',
    },
    flipCameraImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 30,
        resizeMode: 'stretch',
    },
    playPauseImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    stopVideoImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
})