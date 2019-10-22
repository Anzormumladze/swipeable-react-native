import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';




const firstImage = () => {
    return (
        <View >
            <Image style={{ width: 350, height: 400 }} source={require('../assets/1.jpg')} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: { height: 800, width: 600, }
})

export default firstImage