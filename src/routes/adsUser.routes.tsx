import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { AdsUserScreen } from '@screens/app/AdsUser';
import { AdsDetailsScreen } from '@screens/app/AdsDetails';
import { AdsCreateEditScreen } from '@screens/app/AdsCreateEdit';

type HomeRoutes = {
	adsUserStack: undefined;
	adsDetails: {AdsId: string};
	adsCreateEdit: {AdsId?: string};
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
			<Screen name="adsDetails" component={AdsDetailsScreen} />
			<Screen name="adsCreateEdit" component={AdsCreateEditScreen} />
		</Navigator>
	);
}
