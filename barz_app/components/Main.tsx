import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function Main({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Hello World, this is going to be BARz!</Text>
            <Button
                title="nav to cam"
                onPress={() =>
                    navigation.navigate('Camera', /* unused */{ name: 'Jane' })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});