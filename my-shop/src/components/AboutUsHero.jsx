export default function AboutUsHero() {

    return (
        <div className="w-screen">
            <div className="max-w-page-content my-0 mx-auto flex lg:flex-col lg:text-center lg:gap-[180px] lg:pt-[140px] justify-between xl:justify-center items-center">
                <div className="flex flex-col gap-9 max-w-[370px] px-2">
                    <h4 className="font-bold leading-6 text-main lg:hidden">ABOUT COMPANY</h4>
                    <h1 className="font-bold text-6xl leading-20 text-main">ABOUT US</h1>
                    <p className="text-gray text-xl leading-7.5">We know how large objects will act, but things on a small scale</p>
                    <div>
                        <button className="bg-primary-blue text-white text-sm leading-5 rounded px-10 py-[14px] ">Get Quote Now</button>
                    </div>
                </div>
                <div>
                    <img src="./img/about-us-hero.svg" className="max-w-[632px] max-h-[612px] lg:w-full  mr-[-128px]" />
                </div>
            </div>
        </div>
    )
}