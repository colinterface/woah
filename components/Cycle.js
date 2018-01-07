import React from 'react';
import {
  Animated,
  View,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

export default class Cycle extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0);
    this.gridSize = 5;
  }

  spin = () => {
    this.springValue.setValue(0);
    Animated.spring(
      this.springValue,
      {
        toValue: 0.5,
        friction: 3,
        tension: 0.1,
      }
    ).start();
  }

  spinBack = () => {
    this.springValue.setValue(0.5);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 3,
        tension: 0.1,
      }
    ).start();
  }

  render() {
    const spin = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const radius = this.springValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 100, 0],
    });

    const margin = this.springValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -100, 0]
    })

    const size = this.springValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [200, 200, 200],
    });

    const color = this.springValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['rgba(253, 231, 76, 1)', 'rgba(112, 248, 186, 0.5)', 'rgba(253, 231, 76, 1)' ]
    });

    const containerColor = this.springValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['rgba(112, 248, 186, 1)', 'rgba(253, 231, 76, 1)', 'rgba(112, 248, 186, 1)' ]
    });

    const grid = [];
    for (y = 0; y < this.gridSize; y++) {
      const row = []
      for (let x = 0; x < this.gridSize; x++) {
        row.push({});
      }
      grid.push(row);
    }

    return (
      <TouchableWithoutFeedback
        onPressIn={this.spin}
        onPressOut={this.spinBack}
      >
      <Animated.View
        style={[styles.root, {
          backgroundColor: containerColor,
        }]}
      >

        {
          grid.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{ flexDirection: 'row' }}
            >
              {
                row.map((item, i) => (
                  <Animated.View
                    key={i}
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      transform: [{ rotate: spin }],
                      borderRadius: radius,
                      margin,
                    }}
                  />
                ))
              }
            </View>
          ))
        }
      </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDE74C'
  }
})
