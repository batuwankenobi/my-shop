import { bestseller } from "../mock/bestSellerData"
import ProductCard from "./ProductCard"

export default function BestSellerProducts() {

    return (
        <section className="w-screen">
            <div className="my-0 mx-auto max-w-page-content flex flex-col items-center py-20">
                <div className="flex flex-col items-center gap-2.5 pb-20">
                    <h4 className="text-gray text-xl">Featured Products</h4>
                    <h3 className="text-main text-2xl font-bold leading-8">BESTSELLER PRODUCTS</h3>
                    <p className="text-sm text-gray leading-5">Problems trying to resolve the conflict between</p>
                </div>
                <div className="flex flex-wrap gap-x-7 gap-y-20 sm:gap-7 justify-center">
                    {bestseller.map((item, index) => {
                        return <ProductCard key={index} data={item} size={[240, 427]} />
                    })}
                </div>
            </div>
        </section>
    )
}