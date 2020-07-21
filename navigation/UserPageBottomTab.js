import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import UserMain from '../screens/UserMain';
import UserAwards from '../screens/UserAwards';
import UserFriends from '../screens/UserFriends';

const Tab = createMaterialBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="UserAwards" component={UserAwards} />
//       <Tab.Screen name="UserFriends" component={UserFriends} />
//       {/* <Tab.Screen name="UserEarnedMemes" component={UserEarnedMemes} /> */}
//     </Tab.Navigator>
//   );
// }

export default function UserTabs() {
	return (
		<Tab.Navigator activeColor="white" style={{ backgroundColor: 'white' } }
		// barStyle={{ backgroundColor: '#694fad' }}
		>
			<Tab.Screen
				name="UserMain"
				component={UserMain}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />
				}}
			/>
			<Tab.Screen
				name="UserAwards"
				component={UserAwards}
				options={{
					tabBarLabel: 'Awards',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="trophy-award" color={color} size={26} />
				}}
			/>
			<Tab.Screen
				name="UserFriends"
				component={UserFriends}
				options={{
					tabBarLabel: 'Friends',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" color={color} size={26} />
				}}
			/>
		</Tab.Navigator>
	);
}
