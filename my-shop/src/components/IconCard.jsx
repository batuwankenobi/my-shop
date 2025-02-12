import React from 'react';

// Tek bir ikon kartını temsil eden bileşen
const IconCard = ({ imageSrc, link, altText }) => {
	return (
		// Harici bir bağlantıya yönlendiren kapsayıcı (yeni sekmede açılması için target="_blank" kullanıldı)
		<a href={link} target="_blank" rel="noopener noreferrer">
		<div className="flex justify-center items-center">
		  {/* İkon resmi - Grayscale filtresiyle gri tonlarda gösteriliyor */}
		  <img
		    src={imageSrc}
		    alt={altText}
		    className="filter grayscale"
		  />
		</div>
	    </a>
	  );
	};
	// Birden fazla ikon kartını listeleyen bileşen
const IconList = () => {
	// Kullanılacak ikonların bilgilerini içeren dizi
	const icons = [
	  {
	    imageSrc: './images/gry1.png', // İkonun resmi
	    link: '#', // İkonun yönlendireceği bağlantı (şimdilik boş)
	    altText: 'Icon 1', // Alternatif metin (Erişilebilirlik için önemli)
	  },
	  {
	    imageSrc: './images/gry2.png',
	    link: '#',
	    altText: 'Icon 2',
	  },
	  {
	    imageSrc: './images/gry3.png',
	    link: '#',
	    altText: 'Icon 3',
	  },
	  {
	    imageSrc: './images/gry4.png',
	    link: '#',
	    altText: 'Icon 4',
	  },
	  {
	    imageSrc: './images/gry5.png',
	    link: '#',
	    altText: 'Icon 5',
	  },
	  {
	    imageSrc: './images/gry6.png',
	    link: '#',
	    altText: 'Icon 6',
	  },
	];