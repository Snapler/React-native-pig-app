import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class Firststall extends Component {
  _onPressButton() {
    alert('You tapped the button!');
  }

  _onLongPressButton() {
    alert('You long-pressed the button!');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Pig Environment Tracking & Control System
          </Text>
          <View style={styles.buttonRow}>
            {/* <TouchableOpacity onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>First Stall</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableNativeFeedback
              onPress={this._onPressButton}
              background={
                Platform.OS === 'android'
                  ? TouchableNativeFeedback.SelectableBackground()
                  : ''
              }>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  First Stall
                  {Platform.OS !== 'android' ? '(Android only)' : ''}
                </Text>
                <Text style={styles.buttonSubText}>Current Temp : </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={this._onPressButton}
              background={
                Platform.OS === 'android'
                  ? TouchableNativeFeedback.SelectableBackground()
                  : ''
              }>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Second Stall
                  {Platform.OS !== 'android' ? '(Android only)' : ''}
                </Text>
                <Text style={styles.buttonSubText}>Current Temp : </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#242325',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: '5%',
    fontFamily: 'Roboto-Bold',
  },
  button: {
    width: 180,
    height: 180,
    backgroundColor: '#707070',
    borderRadius: 6,
    elevation: 20,
    shadowColor: '#52006A',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
  },
  buttonSubText: {
    color: '#fff',
    fontSize: 14,
    padding: 8,
  },
});
