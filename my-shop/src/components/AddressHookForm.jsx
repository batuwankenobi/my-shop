import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods';

export default function AddressHookForm({ submitFn, editFn, initialData }) {

    // useForm hook'u ile form kontrolü sağlanıyor.
    const {
        register, // Form inputlarını register etmek için
        handleSubmit, // Form submit işlemi için
        watch, // Belirli input alanlarını izlemek için (örneğin, şehir seçildiğinde ilçelerin değişmesi)
        formState: { errors, isValid }, // Form hataları ve geçerlilik durumu
    } = useForm({
        defaultValues: Object.keys(initialData).length ? initialData : { // Eğer düzenleme yapılıyorsa initialData kullan
            title: '',
            name: "",
            surname: "",
            phone: '',
            city: "",
            district: "",
            neighborhood: "",
            address: "",
        },
        mode: 'all', // Form validasyonunu anlık olarak kontrol et
    });

    // Tüm şehirleri getir
    const cities = getCities();
    
    // Kullanıcının seçtiği şehri izle
    const citySelected = watch("city");

    // Seçilen şehre bağlı olarak ilçeleri getir
    const districts = getDistrictsByCityCode(citySelected);

    return (
        <>
            {/* Form başlıyor */}
            <form 
                className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl" 
                onSubmit={Object.keys(initialData).length ? handleSubmit(editFn) : handleSubmit(submitFn)}
            >
                
                {/* Adres Başlığı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="title">Address Title</label>
                    <input
                        className="input-text w-full"
                        id="title"
                        type="text"
                        placeholder='Address Title'
                        {...register('title', {
                            required: 'Address Title is required'
                        })}
                    />
                    {errors.title && <p className="input-error">{errors.title.message}</p>}
                </div>

                {/* Kullanıcı Adı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="name">Name</label>
                    <input
                        className="input-text w-full"
                        id="name"
                        type="text"
                        placeholder='Name'
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="input-error">{errors.name.message}</p>}
                </div>

                {/* Kullanıcı Soyadı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="surname">Surname</label>
                    <input
                        className="input-text w-full"
                        id="surname"
                        type="text"
                        placeholder='Surname'
                        {...register('surname', { required: 'Surname is required' })}
                    />
                    {errors.surname && <p className="input-error">{errors.surname.message}</p>}
                </div>

                {/* Telefon Numarası */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="phone">Phone</label>
                    <input
                        className="input-text w-full"
                        id="phone"
                        type="text"
                        placeholder='Phone'
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^(?:\+90.?5|0090.?5|905|0?5)(?:[01345][0-9])\s?(?:[0-9]{3})\s?(?:[0-9]{2})\s?(?:[0-9]{2})$/,
                                message: "Phone is invalid"
                            }
                        })}
                    />
                    {errors.phone && <p className="input-error">{errors.phone.message}</p>}
                </div>

                {/* Şehir Seçimi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="city">City</label>
                    <select
                        id="city"
                        className='input-text w-full'
                        {...register('city', { required: "City is required" })}
                    >
                        <option value="">Select City</option>
                        {cities.map((item, index) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {/* İlçe Seçimi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="district">District</label>
                    <select
                        disabled={!citySelected} // Şehir seçilmezse ilçe seçimi kapalı olacak
                        id="district"
                        className='input-text w-full disabled:bg-light-gray-1'
                        {...register('district', { required: "District is required" })}
                    >
                        <option value="">Select District</option>
                        {districts.map((item, index) => (
                            <option key={index} value={index}>{item}</option>
                        ))}
                    </select>
                </div>

                {/* Mahalle Seçimi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="neighborhood">Neighborhood</label>
                    <input
                        className="input-text w-full"
                        id="neighborhood"
                        type="text"
                        placeholder='Neighborhood'
                        {...register('neighborhood', { required: 'Neighborhood is required' })}
                    />
                    {errors.neighborhood && <p className="input-error">{errors.neighborhood.message}</p>}
                </div>

                {/* Adres Bilgisi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="address">Address</label>
                    <textarea
                        className="input-text w-full"
                        id="address"
                        placeholder='Address'
                        {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <p className="input-error">{errors.address.message}</p>}
                </div>

                {/* Kaydet Butonu */}
                <div className="form-line w-full">
                    <div className='mx-auto'>
                        <button 
                            className="bg-primary-blue disabled:bg-gray text-white text-sm leading-7 py-2.5 px-12 rounded min-h-[50px] min-w-[150px] flex items-center justify-center"
                            type="submit"
                            disabled={!isValid} // Form geçerli değilse buton devre dışı olacak
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
