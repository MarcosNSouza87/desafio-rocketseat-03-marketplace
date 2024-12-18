import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from '@screens/app/Home';
import { AdsShowDetailsScreen } from '@screens/app/AdsShowDetails';
import { AdsCreateScreen } from '@screens/app/AdsCreate';
import { AdsPreviewScreen } from '@screens/app/AdsPreview';

type HomeRoutes = {
	homeStack: undefined;
	adsCreate: undefined;
	adsShowDetails: { productDetails: ProductDTO };
	adsEdit: { productEdit: ProductDTO };
	adsPreview: { productPreview: ProductCreateDTO, idEdit?: string};
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
			<Screen name="adsPreview" component={AdsPreviewScreen} />

		</Navigator>
	);
}
