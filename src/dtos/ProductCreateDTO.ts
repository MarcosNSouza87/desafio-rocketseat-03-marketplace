type ProductCreateDTO = {
	name: string;
	description: string;
	is_active: boolean;
	is_new: boolean;
	price: number;
	accept_trade: boolean;
	payment_methods: string[];
	product_images: any[];
}