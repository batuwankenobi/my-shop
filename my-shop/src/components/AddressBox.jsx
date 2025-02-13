import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddressBox({ item, type, handleEdit, handleDelete }) {
    return (
        <div className="w-[45%] md:w-[80%] min-w-[320px]">
            {/* Adres Başlığı ve Düzenleme/Silme Butonları */}
            <div className="flex justify-between text-sm">
                
                {/* Radyo butonu ile adres seçimi */}
                <div className="flex items-center gap-1">
                    <input type="radio" id={type + item.id} name={type + "Address"} value={item.id} />
                    <label htmlFor={type + item.id}>{item.title}</label>
                </div>

                {/* Adresi düzenleme ve silme butonları */}
                <div className="flex gap-4">
                    {/* Düzenleme Butonu */}
                    <button id={item.id} onClick={handleEdit} className="hover:text-primary-blue">
                        Edit
                    </button>

                    {/* Silme Butonu */}
                    <button id={item.id} onClick={handleDelete} className="hover:text-[#800000]">
                        Delete
                    </button>
                </div>
            </div>

            {/* Adres Bilgileri Kartı */}
            <div>
                {/* Adresin tüm alanlarını içeren kutu */}
                <label htmlFor={type + item.id} className="block cursor-pointer">
                    <div className="w-full flex flex-col justify-center items-center rounded border mt-3 py-3 px-2 text-xs">
                        
                        {/* Kullanıcı Adı ve Telefon Numarası */}
                        <div className="flex justify-between w-full ">
                            {/* Kullanıcı Adı */}
                            <div>
                                <FontAwesomeIcon className="text-primary-blue" icon="fa-solid fa-user-large" /> {item.name} {item.surname}
                            </div>

                            {/* Telefon Numarası */}
                            <div>
                                <FontAwesomeIcon className="text-primary-blue" icon="fa-solid fa-phone" /> {item.phone}
                            </div>
                        </div>

                        {/* Adres Metni */}
                        <div className="w-full font-bold pt-2">
                            {item.address}
                        </div>

                    </div>
                </label>
            </div>
        </div>
    );
}
