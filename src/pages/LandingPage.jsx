import { Check, Copy, Shield, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

function LandingPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (url.trim()) {
      const randomCode = Math.random().toString(36).substring(2, 8);
      setShortUrl(`koda.link/${randomCode}`);
      setShowResult(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Shorten Your Links,{" "}
          <span className="text-blue-600">Amplify Your Reach</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Create short, memorable links in seconds. Track clicks, manage
          campaigns, and optimize your digital presence.
        </p>
      </div>

      {/* url input section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <button
            onClick={handleShorten}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition whitespace-nowrap">
            Shorten
          </button>
        </div>
      </div>

      {/* result section */}
      {showResult && (
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">
              Your shortened URL
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium"
              />
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition flex items-center gap-2">
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Sign in to track analytics and manage your links
            </p>
          </div>
        </div>
      )}

      {/* feature */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* lightning fast */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Lightning Fast
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Shorten short links instantly and share them across all your
            platforms in seconds.
          </p>
        </div>

        {/* advanced analytics */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-5">
            <TrendingUp className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Advanced Analytics
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Track every click with detailed analytics and insights to optimize
            your campaigns.
          </p>
        </div>

        {/* secure & reliable */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-5">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Secure & Reliable
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your links are protected with enterprise-grade security and 99.9%
            uptime.
          </p>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
