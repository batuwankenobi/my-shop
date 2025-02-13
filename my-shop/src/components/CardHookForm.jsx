import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

// Gelecek 15 yıl için yıl listesi oluşturuluyor
const yearList = [];
const currentYear = new Date().getFullYear();
for (let i = 0; i < 15; i++) {
    yearList.push(currentYear + i);
}

// Ay listesi (01 - 12) olarak tanımlanıyor
const monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export default function CardHookForm({ submitFn, editFn, initialData }) {

    // React Hook Form kullanılarak form kontrol ediliyor
    const {
        register, // Form inputlarını yönetmek için
        handleSubmit, // Form gönderme işlemi için
        watch, // Seçili alanları izlemek için
        formState: { errors, isValid }, // Form hataları ve geçerlilik durumu
    } = useForm({
        defaultValues: Object.keys(initialData).length ? initialData : { // Eğer düzenleme yapılıyorsa initialData kullan
            card_no: '',
            expire_month: "",
            expire_year: "",
            name_on_card: '',
            cvv: ""
        },
        mode: 'all', // Form validasyonunu anlık olarak kontrol et
    });

    return (
        <>
            {/* Form Başlangıcı */}
            <form 
                className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl"
                onSubmit={Object.keys(initialData).length ? handleSubmit(editFn) : handleSubmit(submitFn)}
            >
                
                {/* Kart Numarası Alanı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="card_no">Card No</label>
                    <input
                        className="input-text w-full"
                        id="card_no"
                        type="text"
                        placeholder='Card No'
                        {...register('card_no', {
                            required: 'Card No is required'
                        })}
                    />
                    {errors.card_no && <p className="input-error">{errors.card_no.message}</p>}
                </div>

                {/* Son Kullanma Ayı Seçimi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="expire_month">Expire Month</label>
                    <select
                        id="expire_month"
                        className='input-text w-full'
                        {...register('expire_month', {
                            required: "Expire Month is required"
                        })}
                    >
                        <option value="">Select Month</option>
                        {monthList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                {/* Son Kullanma Yılı Seçimi */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="expire_year">Expire Year</label>
                    <select
                        id="expire_year"
                        className='input-text w-full'
                        {...register('expire_year', {
                            required: "Expire Year is required"
                        })}
                    >
                        <option value="">Select Year</option>
                        {yearList.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                {/* Kart Üzerindeki İsim Alanı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="name_on_card">Name on Card</label>
                    <input
                        className="input-text w-full"
                        id="name_on_card"
                        type="text"
                        placeholder='Name on Card'
                        {...register('name_on_card', {
                            required: 'Name is required',
                        })}
                    />
                    {errors.name_on_card && <p className="input-error">{errors.name_on_card.message}</p>}
                </div>

                {/* CVV Alanı */}
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="cvv">CVV</label>
                    <input
                        className="input-text w-full"
                        id="cvv"
                        type="text"
                        placeholder='CVV'
                        {...register('cvv', {
                            pattern: {
                                value: /^\d{3}$/, // 3 haneli sayı olmalı
                                message: "CVV is invalid"
                            },
                            required: 'CVV is required'
                        })}
                    />
                    {errors.cvv && <p className="input-error">{errors.cvv.message}</p>}
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
