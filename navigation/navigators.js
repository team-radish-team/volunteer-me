// Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

// EventStack screens
import EventList from '../components/EventList'
import EventPage from '../components/EventPage'
import EventCard from '../components/EventCard'

// MapStack screens
import ReactMap from '../components/ReactMap'
import HomeScreen from '../components/HomeScreen'

//OrgStack Screens
import OrgProfile from '../components/OrgProfile'
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

export const OrganizationProfileStack = createStackNavigator(
  {
    OrgProfile: OrgProfile
  },
  {initialRouteName: 'OrgProfile'}
)

export const OrganizationTabs = createBottomTabNavigator(
  {
    Profile: OrganizationProfileStack
  },
  {order: ['Profile']}
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
