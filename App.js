import React from 'react';
import { Alert, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    uri: 'https://s3.amazonaws.com/bostondelhi/V1.mp4', 
    mute: false,
    shouldPlay: true,
  }

  handlePlayAndPause = () => { 
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }

  handleVolume = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute
    }));
  }

  /*
  videoUrl() {
    return(
      "Hello World"
    );
  }
  */

  _onPressButton1 = () => {
    this.setState({uri: 'https://s3.amazonaws.com/bostondelhi/V2.mp4'} ) 
  }
 

  _onPressButton2 = () => {
    Alert.alert('The user chose video #2!')
  }

  render() {
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: 'center' }}>React Native Video</Text>
          <Video
          source={{ uri: this.state.uri }}
          shouldPlay={this.state.shouldPlay}
          resizeMode="cover"
          style={{ width, height: 300 }}
          isMuted={this.state.mute}
          />
          <View style={styles.controlBar}>
            <MaterialIcons 
              name={this.state.mute ? "volume-mute" : "volume-up"}
              size={45} 
              color="white" 
              onPress={this.handleVolume} 
            />
            <MaterialIcons 
              name={this.state.shouldPlay ? "pause" : "play-arrow"} 
              size={45} 
              color="white" 
              onPress={this.handlePlayAndPause} 
            />
          </View>
        </View>
        <Text>Which video would you like to watch next?</Text>
        <Button
          onPress={this._onPressButton1}
          title="Video One - In the Morning"
          />
          <Button
          onPress={this._onPressButton2}
          title="Video Two - Out with Friends"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});
