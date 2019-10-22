import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import FirstImage from './components/firstImage'
import SecondImage from './components/secondimage'
import ThirdImage from './components/thirdImage'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
  [<FirstImage />],
  [<SecondImage />],
  [<ThirdImage />],
  [<FirstImage />]
]

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['0deg', '0deg', '0deg'],
      // extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }



    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers = () => {

    return Users.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={i} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>




            <View
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
            >
              {item}
            </View>


          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={i} style={[{

              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>




            <View
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
            >
              {item}
            </View>

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>

        </View>


      </View>

    );
  }
}