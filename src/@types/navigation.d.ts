export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			signIn: undefined;
			signOut: undefined;
			home: undefined;
			homeStack: undefined;
			adsUserStack: undefined;
			adsUser: undefined;
			adsCreate: undefined;
			adsShowDetails: {productDetails: ProductDTO};
			adsEdit: {productEdit: ProductDTO};
			adsPreview: {productPreview: ProductCreateDTO, idEdit?: string};
		}
	}
}
