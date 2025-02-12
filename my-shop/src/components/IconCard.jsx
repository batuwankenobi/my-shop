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