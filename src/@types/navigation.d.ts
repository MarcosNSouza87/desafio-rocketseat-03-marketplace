import { IStatistic } from '@screens/Statistic';
import { IForm } from './form';

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			signIn: undefined;
			signOut: undefined;
			home: undefined;
			homeStack: undefined;
			adsUser: undefined;
			adsCreate: undefined;
			adsShowDetails: {productDetails: ProductDTO};
			adsEdit: {productEdit: ProductDTO};
			adsPreview: {productPreview: ProductDTO};
		}
	}
}
