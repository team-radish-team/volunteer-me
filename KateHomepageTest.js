import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Icon,
} from 'react-native';
import {
  Header,
  Container,
  Footer,
  Content,
  Left,
  Button,
  Right,
  Body,
  Card,
  CardItem,
  FooterTab,
} from 'native-base';
// import { Icon } from 'react-native-vector-icons';

export default function App() {
  return (
    <Container>
      <Header>
        <Left>
          <Button hasText transparent>
            <Text>For You</Text>
          </Button>
        </Left>
        <Body>
          <Button hasText transparent>
            <Text>Filter</Text>
          </Button>
        </Body>
        <Right>
          <Button hasText transparent>
            <Text>Discover</Text>
          </Button>
        </Right>
      </Header>

      <Content>
        <ScrollView>
          <Card>
            <CardItem header>
              <Text>Help dogs!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>January 10th at 5PM</Text>
                <Image
                  style={{ width: 325, height: 160 }}
                  source={require('./dogs.jpg')}
                />
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Sign up</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Help cats!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>January 12th at 3PM</Text>
                <Image
                  style={{ width: 325, height: 160 }}
                  source={require('./cats.jpeg')}
                />
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Sign up</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Help pigs!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>January 13th at 12PM</Text>
                <Image
                  style={{ width: 325, height: 160 }}
                  source={require('./pigs.jpeg')}
                />
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Sign up</Text>
            </CardItem>
          </Card>
        </ScrollView>
      </Content>

      <Footer>
        <FooterTab>
          <Button vertical>
            <Text>Map</Text>
          </Button>
          <Button vertical>
            <Text>Search</Text>
          </Button>
          <Button vertical>
            <Text>Account</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
