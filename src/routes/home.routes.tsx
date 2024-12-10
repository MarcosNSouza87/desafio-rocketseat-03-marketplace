import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/app/Home';
import { AdsDetailsScreen } from '@screens/app/AdsDetails';
import { AdsCreateEditScreen } from '@screens/app/AdsCreateEdit';

type HomeRoutes = {
	homeStack: undefined;
	adsDetails: {AdsId: string};
	adsCreateEdit: {ads?: any};
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function HomeRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="homeStack" component={HomeScreen} />
			<Screen name="adsDetails" component={AdsDetailsScreen} />
			<Screen name="adsCreateEdit" component={AdsCreateEditScreen} />
		</Navigator>
	);
}
