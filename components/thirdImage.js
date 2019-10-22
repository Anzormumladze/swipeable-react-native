import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';




const thirdImage = () => {
    return (
        <View >
            <Image style={{ width: 350, height: 400 }} source={require('../assets/3.jpg')} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: { height: 50, width: 50, }
})

export default thirdImage