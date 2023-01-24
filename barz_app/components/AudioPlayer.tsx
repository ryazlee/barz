import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Audio } from "expo-av";

export default function AudioPlayer() {
    async function playSong() {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../assets/trimmed.mp3'));
        await soundObject.playAsync();
    }

    return (
        <View>
            <Button title="Play Sound" onPress={playSong} />
        </View>
    );
}