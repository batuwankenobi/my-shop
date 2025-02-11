import React, { useState } from 'react'; // React ve useState hook'unu içe aktarıyoruz.
import { useHistory } from 'react-router-dom'; // Sayfa yönlendirme için useHistory hook'unu içe aktarıyoruz.

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Açılır menünün açık/kapalı durumunu yönetmek için state.
  const history = useHistory(); // Sayfa yönlendirmesi için useHistory hook'unu kullanıyoruz.

  // Menüye tıklanınca sayfa yönlendirmesi ve menüyü kapatma işlemi yapılır.
  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Menü kapatılır.
    history.push(path); // Belirtilen path'e yönlendirme yapılır.
  };
  return (
	<>