// Navigators
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

// LoginStack screens
import UserSelect from '../components/UserSelect'
import VolLogin from '../components/VolLogin'
import OrgLogin from '../components/OrgLogin'

// EventStack screens
import EventList from '../components/EventList'
import EventPage from '../components/EventPage'
import EventCard from '../components/EventCard'

// MapStack screens
import ReactMap from '../components/Map'
import HomeScreen from '../components/HomeScreen'

//stack for login page
export const LoginStack = createStackNavigator(
  {
    UserSelect: UserSelect,
    VolLogin: VolLogin,
    OrgLogin: OrgLogin
  },
  {
    initialRouteName: 'UserSelect'
  }
)

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
