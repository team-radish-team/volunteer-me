// Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

// EventStack screens
import EventList from '../components/EventList'
//import SingleEventModal from ...

// MapStack screens
import ReactMap from '../components/Map'
import HomeScreen from '../components/HomeScreen'

//stack for Not Logged In
// export const NotLoggedInStack = createStackNavigator(
//   {
//     //LoginPage: LoginPage
//   },
//   {
//     //initialRouteName: 'LoginPage'
//   }
// )

// stack for VolunteerEvents tab
export const EventsStack = createStackNavigator(
  {
    EventList: EventList
    //EventPage: EventPage
  },
  {
    initialRouteName: 'EventList'
  }
)

// stack for Map tab
export const MapStack = createStackNavigator(
  {
    ReactMap: ReactMap
  },
  {
    initialRouteName: 'ReactMap'
  }
)

// stack for Volunteer Profile tab
export const VolunteerProfileStack = createStackNavigator(
  {
    // VolunteerProfile: VolunteerProfile,
    // VolunteerProfileEdit: VolunteerProfileEdit
    HomePage: HomeScreen
  },
  {
    // initialRouteName: "VolunteerProfile"
  }
)

export const VolunteerTabs = createBottomTabNavigator(
  {
    Events: EventsStack,
    Map: MapStack,
    Profile: VolunteerProfileStack
  },
  {
    order: ['Events', 'Map', 'Profile']
  }
)
