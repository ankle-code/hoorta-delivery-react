import {useEffect} from "react";
import {useParams} from "react-router";
import {getOneStore} from "../../helper/stores";
import {useStores} from "../../providers/StoresContext";
import API from "../../services/api";
import ProductsSection from "../../components/organisms/ProductsSection";
import {useProducts} from "../../providers/ProductsContext";
import MenuDashboard from "../../components/template/MenuDashboard";

const Store = () => {
	const {id} = useParams();
	const {storeData, setStoreData} = useStores();
	const {productsData, setProductsData} = useProducts();

	const getStoreData = async (id) => {
		try {
			const response = await API.get(getOneStore(id), {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
				},
			});

			setStoreData(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	const getStoreProductsData = async (id) => {
		try {
			const productsResponse = await API.get(
				`/products?userId=${storeData.userId}&storeId=${id}`,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("token")
						)}`,
					},
				}
			);

			setProductsData(productsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getStoreData(id);
	}, []);

	useEffect(() => {
		getStoreProductsData(id);
	}, [storeData]);

	console.log(productsData);
	return (
		<MenuDashboard>
			<ProductsSection productsData={productsData} currentStoreId={id} />
		</MenuDashboard>
	);
};

export default Store;
