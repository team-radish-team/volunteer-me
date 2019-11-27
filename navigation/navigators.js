// Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

// EventStack screens
import EventList from '../components/EventList'
import EventPage from '../components/EventPage'
import EventCard from '../components/EventCard'
import Signup from '../components/Signup'

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
    EventList: EventList,
    EventPage: EventPage,
    EventCard: EventCard
  },
  {
    initialRouteName: 'EventList'
  }
)

// stack for Map tab
export const MapStack = createStackNavigator(
  {
    ReactMap: ReactMap,
    EventPage: EventPage,
    EventCard: EventCard
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

//stack for sign up page
export const SignupStack = createStackNavigator(
  {
    SignupPage: Signup
  },
  {
    initialRouteName: 'SignupPage'
  }
)

export const VolunteerTabs = createBottomTabNavigator(
  {
    Events: EventsStack,
    Map: MapStack,
    // Profile: SignupStack
    Profile: VolunteerProfileStack
  },
  {
    order: ['Events', 'Map', 'Profile']
  }
)
