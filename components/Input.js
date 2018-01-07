import React from 'react';
import {
  Animated,
  View,
  Easing,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Slider,
} from 'react-native'


export default class Spring extends React.Component {
  constructor() {
    super();
    this.sliderValue = new Animated.Value(0);
  }

  spring = (toValue) => {
    Animated.spring(
      this.sliderValue,
      {
        toValue,
        friction: 5,
        tension: 0,
      }
    ).start()
  }

  render() {

    // const size = this.sliderValue;
    const size = this.sliderValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 500],
    });

    return (
      <View style={styles.root}>
        <Animated.View
          style={{
            width: size,
            // height: size,
            flex: 1,
            alignSelf: 'stretch',
            backgroundColor: 'black',
          }}
        />
        <View
          style={{ alignSelf: 'stretch', flexDirection: 'row' }}
        >
          <Slider
            style={{ flex: 1 }}
            onValueChange={(value) => {
              this.spring(value);
              // this.sliderValue.setValue(value);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  }
});
