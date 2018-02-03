import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  _onPressButton1() {
    Alert.alert('The user chose video #1!')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Let's add a clickable button:</Text>
        <Button
          onPress={this._onPressButton1}
          title="Video One - In the Morning"
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
});
