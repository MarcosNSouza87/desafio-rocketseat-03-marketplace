type ProductDTO = {
	id: string;
	name: string;
	description: string;
	is_active: boolean;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	payment_methods: string[];
	created_at: string;
	product_images: any[];
	updated_at: string;
	user_id: string;
	user?: { avatar: string, name: string};
};

