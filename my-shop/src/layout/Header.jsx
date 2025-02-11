// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// // Navbar bileşeni
// const Navbar = () => {
// // Menü açık/kapalı durumu için state tanımlama
// const [isMenuOpen, setIsMenuOpen] = useState(false);
// // Sayfa yönlendirme için useHistory hook'unu kullanma
// const history = useHistory();
// // Menü öğelerine tıklandığında yönlendirme yapma fonksiyonu
// const handleNavigation = (path) => {
// 	setIsMenuOpen(false); // Menü kapat
// 	history.push(path); // Belirtilen sayfaya yönlendir
// 	};
// };

function Header() {

	return (
		<main>
		  <div>
			<p>Bandage</p>
			
		  </div>
		</main>
	);
}

export default Header;