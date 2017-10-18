import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { orange, white } from '../utils/colors';

export default function TextButton({ children, onPress, viewStyle = {}, buttonColor = orange, textColor = white, style = {}}) {
    return (
        <View style={[styles.container, {backgroundColor: buttonColor}, viewStyle]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.reset, style, {color: textColor}]}>{children}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        justifyContent: 'center',
        height: 40 
    },
    reset: {
        textAlign: 'center'
    }
})