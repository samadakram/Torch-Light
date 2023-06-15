import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Torch from 'react-native-torch';

const TorchLight = () => {

    const [isTorchOn, setIsTorchOn] = useState(false);
    const gradientOpacity = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (isTorchOn) {
            Animated.timing(gradientOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(gradientOpacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }
    }, [isTorchOn]);

    const handleTorch = () => {
        Torch.switchState(!isTorchOn);
        setIsTorchOn(!isTorchOn);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#8852ee" />
            <View style={styles.btnContainer}>
                {isTorchOn ? (
                    <Animated.View
                        style={[
                            styles.gradient,
                            { opacity: gradientOpacity },
                        ]}
                    >
                        <LinearGradient
                            colors={['rgba(93, 32, 125, 0.2)', 'rgba(93, 32, 125, 0)']}
                            style={styles.gradient}
                        >
                            <TouchableOpacity onPress={handleTorch}>
                                <View style={styles.circle}>
                                    <Icon name="power-sharp" size={150} />
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    </Animated.View>
                ) : (
                    <TouchableOpacity onPress={handleTorch}>
                        <View style={[styles.circle, { borderWidth: isTorchOn ? 20 : 0 }]}>
                            <Icon name="power-sharp" size={150} color="black" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default TorchLight

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#2d1342',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 280,
        borderRadius: 150,
        borderColor: 'rgba(93, 32, 125, 1)',
    },
    circle: {
        backgroundColor: '#a133d0',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 20,
        borderColor: 'rgba(93,32,125,255)',
    }
});