import { Video, ResizeMode } from "expo-av";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ReplayVideo({ navigation, route }) {
    const video = React.useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: route.params.record,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
            />
            <Text>This is video playback.  you should only see this screen after recording a video</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: 350,
        height: 220,
    },
})