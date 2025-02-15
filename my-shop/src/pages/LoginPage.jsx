import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Form yönetimi için react-hook-form kullanıyoruz.
import { useDispatch } from "react-redux"; // Redux için useDispatch hook'u.
import { useHistory, Link } from "react-router-dom"; // Sayfa yönlendirmesi için useHistory, yönlendirme için Link.
import { toast } from "react-toastify"; // Kullanıcıya bildirim göstermek için react-toastify.

import api from "../api/axios"; // API çağrıları için axios.
import { setUser, loginUser } from "../store/actions/clientActions"; // Redux kullanıcı aksiyonları.
import { Input } from "@/components/ui/input"; // UI bileşenlerinden input.
import { Checkbox } from "@/components/ui/checkbox"; // UI bileşenlerinden checkbox.
import { Button } from "@/components/ui/button"; // UI bileşenlerinden buton.
import { Label } from "@/components/ui/label"; // UI bileşenlerinden label.
import { Loader2 } from "lucide-react"; // Yüklenme animasyonu için Lucide React'ten Loader2.

const LoginPage = () => {
  // 📝 React Hook Form kullanarak form durumunu yönetiyoruz.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false); // Kullanıcının "Beni Hatırla" seçeneğini takip eden state.

  const dispatch = useDispatch();
  const history = useHistory();

  // 🟢 Kullanıcı giriş işlemi.
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", data); // API'ye giriş isteği gönderiyoruz.

      // Kullanıcı bilgilerini Redux'a kaydet.
      dispatch(loginUser(response.data, rememberMe));

      // Başarılı giriş bildirimini göster.
      toast.success(`Welcome, ${response.data.name}!`);

      // Kullanıcının daha önce olduğu sayfayı al.
      const prevPath = localStorage.getItem("prevPath");
      history.push(prevPath || "/"); // Kullanıcıyı önceki sayfasına veya ana sayfaya yönlendir.
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during login. Please try again later.";
      toast.error(errorMessage); // Hata mesajını göster.
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {/* 🔒 Giriş Formu */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto my-8 max-w-75vw md:max-w-sm text-left space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold text-dark-gray mb-4">
          Login
        </h2>

        {/* 📧 Email Alanı */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* 🔑 Şifre Alanı */}
        <div className="space-y-2">
          <Label htmlFor="password" className="font-medium">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* ✅ Beni Hatırla Seçeneği */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked)}
          />
          <Label
            htmlFor="rememberMe"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>

        {/* 🔘 Giriş Butonu */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* 🔗 Kayıt Ol Linki */}
      <p className="text-center mt-4">
        Don't have an account yet?{" "}
        <Link to="/signup" className="underline text-primary-color">
          Signup
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
