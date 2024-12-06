import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { AdsUserScreen } from '@screens/app/AdsUser';
import { AdsDetailsScreen } from '@screens/app/AdsDetails';

type HomeRoutes = {
	adsUserStack: undefined;
	adsDetailsUser: {AdsId: string};
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function AdsUserRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="adsUserStack" component={AdsUserScreen} />
			<Screen name="adsDetailsUser" component={AdsDetailsScreen} />
		</Navigator>
	);
}
