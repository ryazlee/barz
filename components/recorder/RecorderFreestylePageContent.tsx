import { Audio } from "expo-av";
import { useState } from "react";
import { useRecordFreestyle } from "../../context/RecordFreestyleContext";
import { Button, View } from "react-native";

export default function RecorderFreestylePageContent() {
	const {
		recordAttempts,
		listenCount,
		incrementRecordAttempts,
		incrementListenCount,
	} = useRecordFreestyle();

	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [recording, setRecording] = useState<Audio.Recording | null>(null);

	const playSound = async () => {
		incrementListenCount();
		const { sound } = await Audio.Sound.createAsync(
			require("../pages/assets/beat.mp3")
		);
		setSound(sound);
		await sound.playAsync();
	};

	const stopSound = async () => {
		if (sound) {
			console.log("Stopping Sound");
			await sound.stopAsync();
			await sound.unloadAsync();
			setSound(null);
		}
	};

	async function startRecording() {
		if (recording) return;
		incrementRecordAttempts();
		playSound();
		try {
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			setRecording(recording);
		} catch (err) {
			console.error("Recording failed", err);
		}
	}

	async function stopRecording() {
		if (!recording) return;
		await recording.stopAndUnloadAsync();
		const uri = recording.getURI();
		// save these locally and display 2
		setRecording(null);
		stopSound();
	}

	return (
		<View style={{ marginTop: 100 }}>
			{sound ? (
				<Button title="Stop Sound" onPress={stopSound} />
			) : (
				<Button title="Play Sound" onPress={playSound} />
			)}

			{recording ? (
				<Button title="Stop Recording" onPress={stopRecording} />
			) : (
				<Button title="Start Recording" onPress={startRecording} />
			)}

			{/* Display attempt and listen counts */}
			<View style={{ marginTop: 20 }}>
				<Button title={`Record Attempts: ${recordAttempts}`} disabled />
				<Button title={`Listens: ${listenCount}`} disabled />
			</View>
		</View>
	);
}
