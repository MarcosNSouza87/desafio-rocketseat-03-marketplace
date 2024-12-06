import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/app/Home';
import { AdsDetailsScreen } from '@screens/app/AdsDetails';

type HomeRoutes = {
	homeStack: undefined;
	adsDetailsHome: {AdsId: string};
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
			<Screen name="adsDetailsHome" component={AdsDetailsScreen} />
		</Navigator>
	);
}
