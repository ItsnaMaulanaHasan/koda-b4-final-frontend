import { yupResolver } from "@hookform/resolvers/yup";
import { Link2, Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollRestoration } from "react-router-dom";
import * as yup from "yup";
import Alert from "../components/Alert";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { apiClient } from "../utils/apiClient";

const LoginFormSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
  const [alertStatus, setAlertStatus] = useState({ type: "", message: "" });
  const [isLogginIn, setIsLogginIn] = useState(false);
  const { setAccessToken } = useContext(AuthContext);
  const { setProfile } = useContext(ProfileContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    setIsLogginIn(true);
    try {
      const body = new URLSearchParams({
        email: data.email,
        password: data.password,
      }).toString();

      const resLogin = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/v1/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      if (!resLogin.ok) {
        const resultLogin = await resLogin.json();
        throw new Error(resultLogin.error || "Login failed");
      }

      const resultLogin = await resLogin.json();

      if (!resultLogin.success) {
        throw new Error(resultLogin.message);
      }

      const token = resultLogin.data.accessToken;

      const resProfile = await apiClient(
        import.meta.env.VITE_BASE_URL + "/api/v1/users"
      );

      if (!resProfile.ok) {
        const resultProfile = await resProfile.json();
        throw new Error(resultProfile.error || "Login failed");
      }

      const resultProfile = await resProfile.json();

      if (!resultProfile.success) {
        throw new Error(resultProfile.message);
      }

      setAlertStatus({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        setAccessToken(token);
        setProfile(resultProfile.data);
      }, 1500);
    } catch (error) {
      let errorMessage = "Login failed";
      if (error.message) {
        errorMessage = error.message;
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection";
      }
      setAlertStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsLogginIn(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <ScrollRestoration />
      <Alert
        type={alertStatus.type}
        message={alertStatus.message}
        onClose={() => setAlertStatus({ type: "", message: "" })}
      />
      <div className="w-full max-w-md">
        {/* logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <Link2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-semibold text-gray-900">
              Koda Shortlink
            </span>
          </div>
        </div>

        {/* login card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* form */}
          <div className="space-y-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* email input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLogginIn}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 sm:text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLogginIn}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 sm:text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* forgot password */}
              <div className="text-right">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>

              {/* sign in button */}
              <button
                disabled={isLogginIn}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                {!isLogginIn ? "Sign In" : "Logging In..."}
              </button>
            </form>
          </div>

          {/* divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* google sign in */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition flex items-center justify-center gap-3">
            <img src="/public/icons/google-icon.svg" alt="Icon Google" />
            <span className="text-gray-700">Continue with Google</span>
          </button>
        </div>

        {/* sign up link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
