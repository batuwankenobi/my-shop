import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Clients from "../components/Clients";
import ProductCategories from "../components/ProductCategories";
import Products from "../components/Products";


export default function ProductList() {
    const { gender, category } = useParams()
    return (
        <>
            <ProductCategories />
            <Products genderParams={gender} categoryParams={category} />
            <Clients />
        </>
    )
}
