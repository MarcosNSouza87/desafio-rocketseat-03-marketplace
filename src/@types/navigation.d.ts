import { IStatistic } from '@screens/Statistic';
import { IForm } from './form';

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			home: undefined;
			signIn: undefined;
			signOut: undefined;
			adsDetails: undefined;
			adsUser: undefined;
			adsCreateEdit: undefined;
		}
	}
}
