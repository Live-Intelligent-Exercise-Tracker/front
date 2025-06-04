import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';

export default function FeedbackContainer({
    theme,      
    score,      
    mainText,   
    subText,   
    style,      
    ...restProps
}) {
    const slideAnim = useRef(new Animated.Value(100)).current;
    const slideOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.feedback,
                style,
                { opacity: slideOpacity, transform: [{ translateY: slideAnim }] }
            ]}
            {...restProps}
        >
            <LinearGradient
                colors={theme.gradient.colors}
                locations={theme.gradient.locations}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    StyleSheet.absoluteFill,
                    { borderRadius: moderateScale(15) }
                ]}
            />
            <Text style={{
                fontSize: moderateScale(27),
                fontWeight: '600',
                color: theme.textColor,
                marginBottom: moderateScale(45)
            }}>{mainText}</Text>
            <Image source={theme.character} />
            {score !== undefined && (
                <Text style={{
                    fontSize: moderateScale(28),
                    fontWeight: '700',
                    color: theme.textColor,
                    marginBottom: moderateScale(45)
                }}>{score}</Text>
            )}
            <Text style={{
                fontSize: moderateScale(15),
                fontWeight: '500',
                color: theme.textColor,
            }}>
                {subText}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    feedback: {
        width: moderateScale(302),
        height: moderateScale(401),
        borderRadius: 15,
        backgroundColor: 'rgba(244, 244, 244, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(30),
        marginBottom: moderateScale(37),
    },
});
