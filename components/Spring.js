import React from 'react';
import {
  Animated,
  View,
  Easing,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native'

export default class Spring extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(1);
    this.waveValue = new Animated.Value(0);
  }

  springIn = () => {
    this.springValue.setValue(1);
    Animated.spring(
      this.springValue,
      {
        toValue: 0.3,
        friction: 4,
      }
    ).start()
    this.wave();
  }

  springOut = () => {
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 4,
      }
    ).start();
  }

  wave = () => {
    this.waveValue.setValue(0);
    Animated.timing(
      this.waveValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.easeInEaseOut,
      }
    ).start();
  }

  render() {
    const size = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 300],
    });

    const color = 'rgba(253, 100, 76, 0)';
    // const color = this.springValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['rgba(253, 100, 76, 1)', 'rgba(253, 231, 76, 1)'],
    // });

    const waveSize = this.waveValue.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 1000],
    });

    const waveColor = this.waveValue.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: ['rgba(253, 100, 76, 0)', 'rgba(253, 100, 76, 1)', 'rgba(253, 100, 76, 0)'],
    });

    return (
      <View style={styles.root}>
        <Animated.View
          style={{
            borderWidth: 2,
            width: waveSize,
            height: waveSize,
            borderColor: waveColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
          }}
        >
          <Animated.View
            style={{
              height: size,
              width: size,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: 'rgba(253, 100, 76, 1)',
              backgroundColor: 'rgba(253, 100, 76, 0.25)',
              // alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableWithoutFeedback
              onPressIn={this.springIn}
              onPressOut={this.springOut}
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              />
            </TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
