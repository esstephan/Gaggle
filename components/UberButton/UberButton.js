import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Container, Header, Content, Text, Form, Item, Input, Button } from 'native-base';
import { getUberDeepLink, getUberUniversalLink } from './uberLinks';
import uberLogo from './uberLogo.png';

const styles = {
  uberButton: {
    width: 220,
    height: 40,
    backgroundColor: 'black',
    position: 'relative',
    top: 20,
    left: 5,
    justifyContent: 'flex-end',
  },
};

export default class UberButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0,
      destinationLatitude: 0,
      destinationLongitude: 0,
    };
    this._getUserLocation();
  }

  _getUserLocation() {
    const context = this;
    navigator.geolocation.getCurrentPosition((position) => {
      context.setState({
        currentLatitude: position.coords.latitude,
        currentLongitude: position.coords.longitude,
      });
    });
  }

  handleClick() {
    const deepLink = getUberDeepLink(
                      this.currentLatitude,
                      this.currentLongitude,
                      this.state.destinationLatitude,
                      this.state.destinationLongitude,
                    );
    const universalLink = getUberUniversalLink(
                            this.currentLatitude,
                            this.currentLongitude,
                            this.state.destinationLatitude,
                            this.state.destinationLongitude,
                          );
    Linking.canOpenURL(deepLink).then((supported) => {
      if (supported) {
        Linking.openURL(deepLink);
      } else {
        Linking.openURL(universalLink);
      }
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>Current: {this.state.currentLatitude}, {this.state.currentLongitude}</Text>
          <Text>
            Destination: {this.state.destinationLatitude}, {this.state.destinationLongitude}
          </Text>
          <Form style={{ width: 370 }}>
            <Item>
              <Input
                placeholder={'Destination Latitude'}
                onChangeText={t => this.setState({ destinationLatitude: t })}
              />
            </Item>
            <Item>
              <Input
                placeholder={'Destination Longitude'}
                onChangeText={t => this.setState({ destinationLongitude: t })}
              />
            </Item>
          </Form>
          <Button
            style={styles.uberButton}
            onPress={this.handleClick}
          >
            <Image
              source={uberLogo}
            />
            <Text style={{ color: 'white' }}>Ride There With Uber</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
