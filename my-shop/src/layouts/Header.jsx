import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { addToCartAction, removeFromCartAction } from '../store/actions/ShoppingCartActions';
import { logoutAction } from '../store/actions/UserActions';

export default function Header() {
    // Dropdown menü ve sepet açılıp/kapanma durumları için state tanımlıyoruz.
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [pagesMenuOpen, setPagesMenuOpen] = useState(false);

    // Redux store'dan kullanıcı, kategoriler ve sepet verisini alıyoruz.
    const user = useSelector(store => store.user.user);
    const categories = useSelector(store => store.global.categories);
    const cart = useSelector(store => store.shoppingCart.cart);

    const dispatch = useDispatch();
    const history = useHistory(); // Sayfa yönlendirme işlemleri için

    // Dropdown menü açma-kapama fonksiyonları
    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleCartToggle = () => setCartOpen(!cartOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);

    // Mobil menü açma-kapama fonksiyonu
    const handleClick = () => {
        setPagesMenuOpen(!pagesMenuOpen);
    };

    // Sepete ürün ekleme ve çıkarma fonksiyonu
    const handleCart = (id, type) => {
        for (const product of cart) {
            if (product.product.id === id) {
                if (type === "add") {
                    dispatch(addToCartAction(product.product));
                } else {
                    dispatch(removeFromCartAction(product.product));
                }
                break;
            }
        }
    };

    // Kullanıcıyı oturumdan çıkaran fonksiyon
    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <>
            {/* Üst Bilgilendirme Çubuğu */}
            <div className='w-screen h-[60px] bg-main text-white px-5 lg:hidden'>
                <div className='max-w-[1500px] flex justify-between mx-auto h-full items-center text-sm font-bold'>
                    <div className='flex items-center gap-5 '>
                        <div className='flex items-center gap-1'>
                            <FontAwesomeIcon icon="fa-solid fa-phone" /> 
                            <p>(225) 555-0118</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <FontAwesomeIcon icon="fa-regular fa-envelope" /> 
                            <p>michelle.rivera@example.com</p>
                        </div>
                    </div>
                    <p>Follow Us and get a chance to win 80% off</p>
                    <div className='flex items-center gap-3'>
                        <p>Follow Us:</p>
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                        <FontAwesomeIcon icon="fa-brands fa-youtube" />
                        <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        <FontAwesomeIcon icon="fa-brands fa-twitter" />
                    </div>
                </div>
            </div>

            {/* Header Ana Bölümü */}
            <div className='w-screen py-[30px] px-5 text-gray'>
                <div className='max-w-[1440px] flex justify-between mx-auto h-full items-center'>
                    
                    {/* Logo ve Menü */}
                    <div className='flex items-center gap-5'>
                        {/* Logo */}
                        <div onClick={() => history.push("/")}>
                            <p className='font-bold text-2xl leading-8 text-main cursor-pointer'>Bandage</p>
                        </div>

                        {/* Menü Linkleri */}
                        <nav className='flex gap-3 text-sm leading-6 items-center lg:hidden'>
                            <Link to="/">Home</Link>

                            {/* Shop Dropdown */}
                            <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle}>
                                <DropdownToggle className="text-sm border-0 text-gray flex items-center gap-2">
                                    <Link to="/shop">Shop</Link> 
                                    <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                </DropdownToggle>
                                <DropdownMenu className="min-w-[200px]">
                                    <div className='flex gap-6 px-2'>
                                        <div>
                                            <DropdownItem header className="text-lg font-bold">Kadın</DropdownItem>
                                            {categories.map((item, index) => {
                                                const gender = item.gender === "k" ? "kadin" : "erkek";
                                                const itemCode = item.code.slice(2);
                                                return item.gender === "k" && (
                                                    <Link to={`/shop/${gender}/${itemCode}`} key={index}>
                                                        <DropdownItem className='text-sm'>{item.title}</DropdownItem>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <DropdownItem header className="text-lg font-bold">Erkek</DropdownItem>
                                            {categories.map((item, index) => {
                                                const gender = item.gender === "k" ? "kadin" : "erkek";
                                                const itemCode = item.code.slice(2);
                                                return item.gender === "e" && (
                                                    <Link to={`/shop/${gender}/${itemCode}`} key={index}>
                                                        <DropdownItem className='text-sm'>{item.title}</DropdownItem>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>

                            <Link to="/about">About</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>

                    {/* Kullanıcı ve Sepet Bölümü */}
                    <div className='flex gap-4 text-sm leading-6 text-main items-center'>
                        {/* Kullanıcı Girişi veya Çıkışı */}
                        {Object.keys(user).length !== 0 ? (
                            <div className='flex gap-2 items-center'>
                                <img className='w-[35px] aspect-square' src={user.img} alt="User" />
                                <p className='text-main text-sm'>{user.name}</p>
                                <button className='size-10' onClick={handleLogout}>
                                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/signup">
                                <FontAwesomeIcon icon="fa-regular fa-user" /> 
                                <span className='md:hidden'>Login / Register</span>
                            </Link>
                        )}

                        {/* Sepet Butonu */}
                        <Dropdown isOpen={cartOpen} toggle={handleCartToggle}>
                            <DropdownToggle className="text-sm border-0 text-main hover:bg-main hover:text-white flex items-center gap-2">
                                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> {cart.length}
                            </DropdownToggle>
                            <DropdownMenu className="w-[500px]">
                                {cart.length === 0 ? (
                                    <div className='text-center py-5 text-2xl text-main'>Your Cart is Empty</div>
                                ) : (
                                    <div className='flex justify-end py-4 px-2'>
                                        <Link onClick={handleCartToggle} to="/shoppingCart" className='bg-primary-blue text-white py-3 px-4 rounded'>Sepete Git</Link>
                                    </div>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
}
