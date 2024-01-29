// PhotoDetail.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoDetail = ({ route }) => {
  // Access parameters passed from the previous screen
  console.log(route.params);

  return (
    <View style={styles.img}>
        <Image source={{ uri: route.params.photo.url_s }} style={{ width: route.params.photo.width_s, height: route.params.photo.height_s }} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  }
});

export default PhotoDetail;
