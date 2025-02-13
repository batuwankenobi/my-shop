import BestSellerProducts from "../components/BestsellerProducts"
import CarouselMainFirst from "../components/CarouselMainFirst"
import CarouselMainSecond from "../components/CarouselMainSecond"
import EditorsPick from "../components/EditorsPick"
import FeaturedPosts from "../components/FeaturedPosts"
import PartOfTheNeuralUniverse from "../components/PartOfTheNeuralUniverse"
import { firstCarouselContent, secondCarouselContent } from "../mock/carouselContentsData"

export default function HomePage() {
    return (
        <>
            <section className='w-screen bg-primary-blue'>
                <div className='max-w-[1440px] mx-auto'>
                    <div className="w-full aspect-[144/85] sm:aspect-[41/75] mx-auto" >
                        <CarouselMainFirst slides={firstCarouselContent} />
                    </div>
                </div>
            </section>

            <EditorsPick />
            {/*<BestSellerProducts />*/}
            <section className='w-screen bg-[#23856D]'>
                <div className='max-w-[1440px] mx-auto'>
                    <div className="w-full aspect-[144/85] sm:aspect-[41/75] mx-auto" >
                        <CarouselMainSecond slides={secondCarouselContent} />
                    </div>
                </div>
            </section>
            <PartOfTheNeuralUniverse />
            <FeaturedPosts />
        </>
    )
}