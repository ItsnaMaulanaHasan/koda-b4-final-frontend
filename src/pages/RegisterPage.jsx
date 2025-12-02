import { Link2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Register:", { fullName, email, password });
  };

  const handleGoogleSignup = () => {
    console.log("Continue with Google");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
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
          <div className="space-y-5">
            {/* fullname input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* password input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* confirm password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
              Create Account
            </button>
          </div>

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
            <img src="/public/icons/google-icon.svg" alt="Icon Google" />
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
