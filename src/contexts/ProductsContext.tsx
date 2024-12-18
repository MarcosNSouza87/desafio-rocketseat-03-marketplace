import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@services/api';

export type ProductsContextDataProps = {
	productsGeneral: ProductDTO[];
	productsUser: ProductDTO[];
	loadProductsList: () => void;
	// create: (createProduct: ProductDTO) => Promise<void>;
	// getList: () => Promise<void>;
};

export const ProductsContext = createContext<ProductsContextDataProps>(
	{} as ProductsContextDataProps,
);

type ProductsContextProviderProps = {
	children: ReactNode;
};

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
	const [productsGeneral, setProductsGeneral] = useState<ProductDTO[]>([]);
	const [productsUser, setProductsUser] = useState<ProductDTO[]>([]);
	async function loadProductsList() {
		try {
			const respAll = await api.get('/products/');
			console.log(respAll.data.length)
			if (respAll.data.length > 0) {
				setProductsGeneral(respAll.data);
			}
			const { data } = await api.get('/users/products');
			if (data.length > 0) {
				setProductsUser(data);
			}
		} catch (error) {
			throw error;
		}
	}

	useEffect(() => {
		loadProductsList();
	}, []);

	return (
		<ProductsContext.Provider
			value={{
				productsGeneral,
				productsUser,
				loadProductsList,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
}
