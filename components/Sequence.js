import React from 'react';
import {
  Animated,
  View,
  Easing,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native'

const array = [];
for (let i = 0; i < 3; i++) {
  array.push(i);
}

export default class Spring extends React.Component {
  constructor() {
    super();
    this.animatedValues = array.map((item) => new Animated.Value(0));
  }

  componentDidMount() {
    this.spring(1);
  }

  spring = (toValue) => {
    const animations = array.map((item, i) => Animated.spring(
      this.animatedValues[i],
      {
        toValue,
        friction: 5,
      }
    ));
    Animated.stagger(40, animations).start(() => this.spring(Number(!toValue)));
  }

  render() {
    const animations = array.map((animation, index) => {
      const size = this.animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [10, 60],
      });

      const marginTop = this.animatedValues[index].interpolate({
        inputRange: [0, 1],
        outputRange: [30, -30],
      });
      return (
        <Animated.View
          key={index}
          style={{
            opacity: this.animatedValues[index],
            width: size,
            height: size,
            backgroundColor: 'black',
            marginTop,
            marginLeft: 10,
            borderRadius: 999,
          }}
        />
      );
    })
    return (
      <View style={styles.root}>
        {animations}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
