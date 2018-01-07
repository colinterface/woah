import React from 'react';
import {
  Animated,
  View,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import Animation from 'lottie-react-native';

export default class Bubble extends React.Component {

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <Animation
        ref={animation => this.animation = animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../animations/bubble.json')}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FDE74C'
  }
})
