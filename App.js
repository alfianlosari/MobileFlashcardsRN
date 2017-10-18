import React from 'react';
import { View, StyleSheet, AsyncStorage, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import reducer from './reducers';
import ListDeck from './components/ListDeck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import DeckDetail from './components/DeckDetail';
import Quiz from './components/Quiz';
import { Constants } from 'expo';
import { FontAwesome, Ionicons} from '@expo/vector-icons';
import { orange, white } from './utils/colors';
import { setLocalNotification, clearLocalNotification  } from './utils/helpers';


function CustomStatusBar({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props}/>
		</View>
	)
}

const Tabs = TabNavigator({
	ListDeck: {
		screen: ListDeck,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
			
		}
	}, 
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'Add Deck',
			tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
		}
	}
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? orange : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : orange,
			shadowColor: 'rgba(0,0,0,0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: orange
			}
		}
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: orange
			}
		}
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: orange
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: orange
			}
		}
	}
});

export default class App extends React.Component {

	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{flex: 1}}>
					<CustomStatusBar backgroundColor='#f26f28' barStyle="light-content"/>
					<MainNavigator />
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
