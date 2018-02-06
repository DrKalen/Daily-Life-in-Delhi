'use strict';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const VIDEOS = [
  'https://s3.amazonaws.com/bostondelhi/onboarding_screen.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V2_edited.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V3_edited.mp4', 
  'https://s3.amazonaws.com/bostondelhi/V4_edited.mp4']

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      currentVideo: 0, 
      mute: false,
      shouldPlay: true,
      backgroundColor: '#fff',
    };
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
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

  skipAhead = () => {
    this.setState({currentVideo: 1});
  }

  rightBranch = () => {
    this.setState({currentVideo: 3});
  }

  leftBranch = () => {
    this.setState({currentVideo: 2});
  }

  backToStory = () => {
    this.setState({currentVideo: 1});
  }

  render() {
    const { width } = Dimensions.get('window');
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

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
          <Text>SKIP to next Video</Text>
          <MaterialIcons 
            name={"fast-forward"}
            size={45} 
            color="black" 
            onPress={this.skipAhead} 
          />
        </View>

        <View style={{flex: .25, flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons 
            name={"navigate-before"} 
            size={45} 
            color="black" 
            onPress={this.leftBranch} 
          />
          <Text>Follow Reeta        Follow Shahina</Text>
          <MaterialIcons 
            name={"navigate-next"}
            size={45} 
            color="black" 
            onPress={this.rightBranch} 
          />
        </View>

        <View style={{flex: .25, flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons 
          name={"fast-rewind"}
          size={45} 
          color="black" 
          onPress={this.backToStory} 
        />
        <Text>SKIP back to story</Text>
      </View>

      <GestureRecognizer
      onSwipe={(direction, state) => this.onSwipe(direction, state)}
      onSwipeUp={(state) => this.onSwipeUp(state)}
      onSwipeDown={(state) => this.onSwipeDown(state)}
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      onSwipeRight={(state) => this.onSwipeRight(state)}
      config={config}
      style={{
        flex: .23,
        backgroundColor: this.state.backgroundColor
      }}
      >
      <Text>{this.state.myText}</Text>
      <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
    </GestureRecognizer>
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
