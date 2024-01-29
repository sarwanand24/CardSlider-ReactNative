import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = (props) => {
  console.log(props);
  const [photos, setPhotos] = useState([]);
  const [isConnected, setisConnected] = useState(null);
  const navigation = useNavigation();

  const loadCachedPhotos = async () => {
    try {
      const cachedPhotos = await AsyncStorage.getItem('cachedPhotos');
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  useEffect(() => {

    NetInfo.addEventListener((state) => {
      setisConnected(state.isConnected);
      console.log(isConnected);
    });

    
      // Fetching recent images from Flickr API
     fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s",{
       method:"GET",
       headers:{
         'Content-Type': 'application/json'
       }
     })
     .then(res=>res.json())
     .then(async(data)=>{
     console.log(data);
       try {
         console.log(data.photos.photo);
         setPhotos(data.photos.photo)
         AsyncStorage.setItem('cachedPhotos', JSON.stringify(data.photos.photo));
       } catch (error) {
         console.log(error);
       }
     })

    //Getting the images link
 loadCachedPhotos();

  }, [isConnected]);

  const handlePhotoPress = (photo) => {
    console.log(photo);
   props.navigation.navigate("PhotoDetail", {photo: photo})
    
  };

  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.img} onPress={() => handlePhotoPress(item)}>
          <Image source={{ uri: item.url_s }} style={{ width: 150, height: 150, flex:1 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    flexDirection: 'row', // or 'column' based on your design
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-around', // Adjust as needed
    padding: 10,
  }
});

export default HomeScreen;
