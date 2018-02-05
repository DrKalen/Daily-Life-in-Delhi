import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  _onPressButton1() {
    Alert.alert('The user chose video #1!')
  }

  _onPressButton2() {
    Alert.alert('The user chose video #2!')
  }

  render() {
    return (
      <View style={styles.container}>
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
});
