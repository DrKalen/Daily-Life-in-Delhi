import React from 'react';
import { Alert, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

const VIDEOS = [
  'https://s3.amazonaws.com/bostondelhi/onboarding_screen.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V2_edited.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V3_edited.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V4_edited.mp4']

export default class App extends React.Component {
  state = {
    currentVideo: 0, 
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

  forwardButton = () => {
    this.setState({currentVideo: 3});
  }

  backButton = () => {
    this.setState({currentVideo: 2});
  }

  render() {
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.container}>
        <View >
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Daily Life in Delhi</Text>
          <Video
            source= {{uri: VIDEOS[this.state.currentVideo]}}
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

        <View style={{flex: .25, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons 
            name={"navigate-before"} 
            size={45} 
            color="black" 
            onPress={this.backButton} 
          />
          <Text>Next Video</Text>
          <MaterialIcons 
            name={"navigate-next"}
            size={45} 
            color="black" 
            onPress={this.forwardButton} 
          />
        </View>
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
