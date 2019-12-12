# CareRing

![CareRing Logo](https://res.cloudinary.com/dssu5deur/image/upload/c_scale,w_219/v1576168066/capstone/imageedit_12_2515791467_exaq4p.png)

> Native application that helps small local nonprofits recruit volunteers for events

Built with: 
- React Native
- Expo
- Native Base
- React Native Navigation
- Redux
- Google Maps API
- PostgreSQL
- Neo4J
- Express
- Sequelize

## Installation

If you have succeeded you should see the following!

![CareRing Splashpage](https://res.cloudinary.com/dssu5deur/image/upload/c_thumb,w_200,g_face/v1576167771/capstone/screen_shot_2019-12-12_at_10.10.25_am_azscuk.png)

### Clone

- Clone this repo to your local machine using `https://github.com/volunteers-connect/care-ring/`

### Setup

Start your ngrok server, and create a secrets file containing your ngrok secret

```shell
$ ngrok http 8080
```

Download Neo4j, start the database named "volunteer-me" with the password "teamRadish" (or set your own). 
Neo4j server can be checked at localhost:7474 to make sure it is running properly.

Install devDependencies, run our seed data, start the server and the Expo environment.

```shell
$ npm install
$ npm run seed
$ npm run server
$ expo start
```

## Features

![Volunteer Interests](https://res.cloudinary.com/dssu5deur/image/upload/c_thumb,w_200,g_face/v1576168864/capstone/screen_shot_2019-12-12_at_10.11.04_am_rspogz.png) 
![Events List](https://res.cloudinary.com/dssu5deur/image/upload/c_thumb,w_200,g_face/v1576168864/capstone/screen_shot_2019-12-12_at_10.11.38_am_eqtah0.png) 
![Events Map](https://res.cloudinary.com/dssu5deur/image/upload/c_thumb,w_200,g_face/v1576168864/capstone/screen_shot_2019-12-12_at_10.12.00_am_v7ilki.png) 

- Two distinct user flows for nonprofits and volunteers
- Tabular and Stack navigation flow through React Native Navigation
- Recommendation engine built with Neo4j on top of PostgreSQL database
- Integration with location services, Google Maps 
- Clean UI/UX design with React Native and NativeBase
- Custom account validation

## Team

##### [Andrew Pratt](https://github.com/apratt957)
##### [Chris Pietka](https://github.com/CrispyQ7)
##### [Kate Murray](https://github.com/katemm11)
##### [Lihan Chen](https://github.com/lchen90)

## Wiki

Documentation and technologies used can be found in our Wiki. 

##### [Wiki](https://github.com/volunteers-connect/care-ring/wiki)
