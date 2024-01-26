import React, {useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, Dimensions, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';

const {width, height} = Dimensions.get("window");

const Cards = ({color, cardWidth, cardHeight}) => {

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      pan.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {

      if (gestureState.dx > 120) { // Put some screen width here instead of 120
        Animated.spring(pan, {
          toValue: { x: width+100, y: gestureState.dy },
          useNativeDriver: false // Put some screen width here instead of width+100
        }).start()
      }
      else if (gestureState.dx < -120) {
        Animated.spring(pan, {
          toValue: { x: -width-100, y: gestureState.dy },
          useNativeDriver: false
        }).start()
      }
      else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false
        }).start()
      }
    }
  })
  
   const rotate = pan.x.interpolate({
      inputRange: [-width/2, 0,width/2],
      outputRange: ['-20deg', '0deg', '20deg'],
      extrapolate: 'clamp'
    })
  
   const animatedStyle = {
    transform: [{rotate : rotate}]
  };

  const likeOpacity = pan.x.interpolate({
    inputRange: [-width/2, 0,width/2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })
  const dislikeOpacity = pan.x.interpolate({
    inputRange: [-width/2, 0,width/2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View {...panResponder.panHandlers}
    style={[pan.getLayout(),animatedStyle, styles.card, {backgroundColor: color, width: cardWidth, height: cardHeight}]}>
      <Animated.View style={{
         opacity: dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 45, right: 30, zIndex: 1000
          }}>
  
            <FontAwesomeIcon icon={faCircleXmark} size={40} style={{color: "red"}} />
      </Animated.View>

      <Animated.View style={{
         opacity: likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 35, left: 30, zIndex: 1000
          }}>
          
            <FontAwesomeIcon icon={faCircleCheck} size={40} style={{color: "green",}} />
      </Animated.View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    flex: 1,
    position: 'absolute',
  },
});

export default Cards;
