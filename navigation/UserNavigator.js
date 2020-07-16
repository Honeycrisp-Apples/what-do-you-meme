import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserMain from '../screens/UserMain';
import PickAvatar from '../screens/PickAvatar';

export default function UserNavigator() {
	const UserStack = createStackNavigator();

	return (
		<UserStack.Navigator>
			<UserStack.Screen options={{ headerShown: false }} name="UserMain" component={UserMain} />
			<UserStack.Screen options={{ headerShown: false }} name="PickAvatar" component={PickAvatar} />
		</UserStack.Navigator>
	);
}
