import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/app/Home';
import { AdsShowDetailsScreen } from '@screens/app/AdsShowDetails';
import { AdsCreateScreen } from '@screens/app/AdsCreate';
import { AdsEditScreen } from '@screens/app/AdsEdit';

type HomeRoutes = {
	homeStack: undefined;
	adsShowDetails: { AdsId: string };
	adsCreate: { ads?: any };
	adsEdit: { ads?: any };
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
			<Screen name="adsShowDetails" component={AdsShowDetailsScreen} />
			<Screen name="adsCreate" component={AdsCreateScreen} />
		</Navigator>
	);
}
