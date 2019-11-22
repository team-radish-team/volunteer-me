import React from 'react';
import { Text, Image } from 'react-native';
import {
  Content,
  Container,
  Header,
  Left,
  Right,
  Button,
  Body,
  Footer,
  FooterTab,
  Grid,
  Col,
  Title,
  Row,
  Card,
} from 'native-base';

export default function Account() {
  return (
    <Container style={{ backgroundColor: '#FB8B24' }}>
      <Header>
        <Content>
          <Title>My Profile</Title>
        </Content>
      </Header>
      <Content>
        <Grid>
          <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
            <Image
              source={require('./troll-face.jpeg')}
              style={{ width: 100, height: 100 }}
            />
          </Col>
          <Col style={{ backgroundColor: '#00CE9F', height: 200 }}>
            <Text>Name: Susan</Text>
            <Text>Address: 10 Main Street, Chicago IL 60647</Text>
            <Text>Email: susan@susan.com</Text>
          </Col>
        </Grid>
        <Card style={{ width: 370, height: 160, backgroundColor: '#9A031E' }}>
          <Text>Interests: Animals, Arts</Text>
        </Card>
        <Card style={{ width: 370, height: 160, backgroundColor: '#9A031E' }}>
          <Text>Interests: Animals, Arts</Text>
        </Card>
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
