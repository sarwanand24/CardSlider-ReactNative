import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cards from './Screens/Cards';

const {width, height} = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.container}>
      <Cards color="#fcd299" cardWidth={width-150} cardHeight={height/1.55} />
      <Cards color="#d3d3d3" cardWidth={width-150} cardHeight={height/1.6} />
      <Cards color="pink" cardWidth={width-150} cardHeight={height/1.65} />
      <Cards color="#ADD8E6" cardWidth={width-150} cardHeight={height/1.7} />
      {/* Add more Cards components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height/5,
    left: width/5
  }
});

export default App;
