import { yupResolver } from "@hookform/resolvers/yup";
import { Link2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alert from "../components/Alert";

const RegisterFormSchema = yup.object({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function RegisterPage() {
  const [alertStatus, setAlertStatus] = useState({ type: "", message: "" });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterFormSchema),
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const onSubmit = async (data) => {
    setIsRegister(true);
    try {
      const body = new URLSearchParams({
        fullname: data.fullName,
        email: data.email,
        password: data.password,
      }).toString();

      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Registration failed");
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setAlertStatus({ type: "success", message: "Registration successful" });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      let errorMessage = "Registration failed";

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
      setIsRegister(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Continue with Google");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
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

        {/* register card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-sm">
              Start shortening links and tracking analytics
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* fullname input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="John Doe"
                    disabled={isRegister}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 sm:text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

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
                    disabled={isRegister}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    disabled={isRegister}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 sm:text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* confirm password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="••••••••"
                    disabled={isRegister}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 sm:text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* terms checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* create account button */}
              <button
                disabled={isRegister || !agreedToTerms}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:cursor-not-allowed">
                {isRegister ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* google sign up */}
          <button
            onClick={handleGoogleSignup}
            className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition flex items-center justify-center gap-3">
            <img src="/icons/google-icon.svg" alt="Icon Google" />
            <span className="text-gray-700">Continue with Google</span>
          </button>
        </div>

        {/* sign in link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
