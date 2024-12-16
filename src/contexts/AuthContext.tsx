import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import {
	storageUserSave,
	storageUserGet,
	storageUserRemove,
} from '@storage/storageUser';
import {
	storageAuthTokenGet,
	storageAuthTokenSave,
} from '@storage/storageAuthToken';

export type AuthContextDataProps = {
	user: UserDTO;
	updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: ({ email, password, avatar, name, tel }: any) => void;
	signOut: () => void;
	isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false);

	async function userAndTokenUpdate(userData: UserDTO, token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setUser(userData);
	}

	async function storageUserAndTokenSave(
		userData: UserDTO,
		token: string,
		refresh_token: string,
	) {
		try {
			setIsLoadingUserStorageData(true);
			await storageUserSave(userData);
			await storageAuthTokenSave({ token, refresh_token });
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			console.log('sign in');
			const { data } = await api.post('/sessions', { email, password });
			console.log(data.user);
			if (data.user && data.token && data.refresh_token) {
				setIsLoadingUserStorageData(true);

				await storageUserAndTokenSave(data.user, data.token, data.refresh_token);

				userAndTokenUpdate(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signUp({ email, password, avatar, name, tel }: any) {
		const bodySignUpForm: any = new FormData();

		// Adiciona o avatar, se existir
		if (avatar) {
			bodySignUpForm.append('avatar', avatar);  // Usa .append() para adicionar o arquivo
		}
	
		// Adiciona os outros campos (textuais)
		bodySignUpForm.append('email', email);
		bodySignUpForm.append('name', name);
		bodySignUpForm.append('tel', tel);
		bodySignUpForm.append('password', password);
		try {
			const resp = await api.post('/users', bodySignUpForm, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('resp ', resp);
			await signIn(email, password);
		} catch (error) {
			console.log(error);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);
			setUser({} as UserDTO);
			await storageUserRemove();
			await storageUserRemove();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function updateUserProfile(userUpdated: UserDTO) {
		try {
			setUser(userUpdated);
			await storageUserSave(userUpdated);
		} catch (error) {
			throw error;
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageData(true);
			const userLogged = await storageUserGet();
			const { token } = await storageAuthTokenGet();

			if (token && userLogged) {
				userAndTokenUpdate(userLogged, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		const subscribe = api.registerInterceptTokenManager(signOut);

		return () => {
			subscribe();
		};
	}, [signOut]);

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signUp,
				signOut,
				updateUserProfile,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
