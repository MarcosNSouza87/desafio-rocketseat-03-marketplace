import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { AdsUserScreen } from '@screens/app/AdsUser';
import { AdsShowDetailsScreen } from '@screens/app/AdsShowDetails';
import { AdsCreateScreen } from '@screens/app/AdsCreate';
import { AdsEditScreen } from '@screens/app/AdsEdit';
import { AdsPreviewScreen } from '@screens/app/AdsPreview';

type HomeRoutes = {
	adsUserStack: undefined;
	adsShowDetails: { Ads: ProductDTO };
	adsCreate: {};
	adsEdit: { Ads?: ProductDTO };
	adsPreview: { Ads?: ProductDTO };
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
			<Screen name="adsShowDetails" component={AdsShowDetailsScreen} />
			<Screen name="adsCreate" component={AdsCreateScreen} />
			<Screen name="adsEdit" component={AdsEditScreen} />
			<Screen name="adsPreview" component={AdsPreviewScreen} />
		</Navigator>
	);
}
