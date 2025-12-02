import { Link2 } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Link2 className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">
              Koda Shortlink
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
