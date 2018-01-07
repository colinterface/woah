import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Slider,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Cycle from './components/Cycle';
import Spring from './components/Spring';
import Sequence from './components/Sequence';
import Input from './components/Input';
import Bubble from './components/Bubble';


export default class App extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.3);
  }


  spring = () => {
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
      }
    ).start();
  }

  render() {
    return (
      <Swiper
        contentContainerStyle={styles.container}
        showsPagination={false}
      >
        <Bubble />
        <Input />
        <Sequence />
        <Cycle />
        <Spring />
      </Swiper>
    );
    // return <Input />
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
