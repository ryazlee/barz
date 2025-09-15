import { Audio } from "expo-av";
import { useMemo, useState } from "react";
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
	const [recordingUris, setRecordingUris] = useState<string[]>([]);

	const playSound = async () => {
		incrementListenCount();
		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/beat.mp3")
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
		if (uri) {
			setRecordingUris((prev) => [...prev, uri]);
		}
		setRecording(null);
		stopSound();
	}

	const shouldAllowRecording = useMemo(
		() => !recording && recordAttempts < 2,
		[recording, recordAttempts]
	);

	const shouldAllowSound = useMemo(
		() => !sound && recordAttempts < 2 && listenCount < 2,
		[sound, recordAttempts, listenCount]
	);

	return (
		<View style={{ marginTop: 100 }}>
			{shouldAllowSound ? (
				<Button title="Play Sound" onPress={playSound} />
			) : (
				<Button title="Stop Sound" onPress={stopSound} />
			)}

			{shouldAllowRecording ? (
				<Button title="Start Recording" onPress={startRecording} />
			) : (
				<Button title="Stop Recording" onPress={stopRecording} />
			)}

			{/* Display attempt and listen counts */}
			<View style={{ marginTop: 20 }}>
				<Button title={`Record Attempts: ${recordAttempts}`} disabled />
				<Button title={`Listens: ${listenCount}`} disabled />
			</View>

			{/* Display recorded URIs */}
			<View style={{ marginTop: 20 }}>
				{recordingUris.map((uri, index) => (
					<Button
						key={index}
						title={`Recording ${index + 1}: ${uri}`}
					/>
				))}
			</View>
		</View>
	);
}
