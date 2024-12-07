import {
	createBottomTabNavigator,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import { gluestackUIConfig } from '../../config/gluestack-ui.config';
import { Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { HomeRoutes } from './home.routes';
import { AdsUserRoutes } from './adsUser.routes';
import { Icon } from '@gluestack-ui/themed';

import { LayoutGrid, Tag, LogOut } from 'lucide-react-native';

type AppRoutes = {
	home: undefined;
	logout: undefined;
	adsUser: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	const { tokens } = gluestackUIConfig;

	const handleLogout = () => {
		// Adicione aqui a lógica de logout
		console.log('Logout efetuado!');
	};

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: tokens.colors.gray700,
					borderTopWidth: 1,
					height: Platform.OS === 'android' ? 'auto' : 86,
					paddingBottom: tokens.space['6'],
					paddingTop: tokens.space['4'],
				},
			}}
		>
			<Screen
				name="home"
				component={HomeRoutes}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon
							as={LayoutGrid}
							color={focused ? '$gray100' : '$gray400'}
							size="xl"
						/>
					),
				}}
			/>
			<Screen
				name="adsUser"
				component={AdsUserRoutes}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icon as={Tag} color={focused ? '$gray100' : '$gray400'} size="xl" />
					),
				}}
			/>
			<Screen
				name="logout"
				component={HomeRoutes}
				options={{
					tabBarIcon: () => (
						<TouchableWithoutFeedback onPress={handleLogout}>
							<Icon as={LogOut} color="$red500" size="xl" />
						</TouchableWithoutFeedback>
					),
				}}
			/>
		</Navigator>
	);
}
