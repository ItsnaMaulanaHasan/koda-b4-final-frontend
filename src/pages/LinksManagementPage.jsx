import {
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Filter,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function LinksManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const links = [
    {
      id: 1,
      shortUrl: "koda.link/V9hvvr",
      destination: "https://example.com/page-1",
      visits: 981,
      created: "11/12/2024",
      status: "active",
    },
    {
      id: 2,
      shortUrl: "koda.link/Una1z",
      destination: "https://example.com/page-2",
      visits: 412,
      created: "11/27/2024",
      status: "active",
    },
    {
      id: 3,
      shortUrl: "koda.link/4f8R1t",
      destination: "https://example.com/page-3",
      visits: 815,
      created: "11/16/2024",
      status: "active",
    },
    {
      id: 4,
      shortUrl: "koda.link/khnzfw",
      destination: "https://example.com/page-4",
      visits: 804,
      created: "11/1/2024",
      status: "active",
    },
    {
      id: 5,
      shortUrl: "koda.link/vczz2x7",
      destination: "https://example.com/page-5",
      visits: 185,
      created: "11/17/2024",
      status: "active",
    },
    {
      id: 6,
      shortUrl: "koda.link/uatlli",
      destination: "https://example.com/page-6",
      visits: 703,
      created: "11/12/2024",
      status: "active",
    },
    {
      id: 7,
      shortUrl: "koda.link/5Xja5",
      destination: "https://example.com/page-7",
      visits: 98,
      created: "11/22/2024",
      status: "inactive",
    },
    {
      id: 8,
      shortUrl: "koda.link/lk1fsy",
      destination: "https://example.com/page-8",
      visits: 15,
      created: "11/16/2024",
      status: "inactive",
    },
    {
      id: 9,
      shortUrl: "koda.link/5sjiro",
      destination: "https://example.com/page-9",
      visits: 256,
      created: "11/20/2024",
      status: "active",
    },
    {
      id: 10,
      shortUrl: "koda.link/whyv6n",
      destination: "https://example.com/page-10",
      visits: 371,
      created: "11/6/2024",
      status: "active",
    },
  ];

  const totalPages = 3;

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this link?")) {
      console.log("Delete link:", id);
    }
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Link Management
          </h1>
          <p className="text-gray-600">
            Browse, search, and manage all your shortened links.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">All Status</span>
            </button>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Short URL
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Visits
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50 transition">
                    {/* Short URL */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">
                          {link.shortUrl}
                        </span>
                        <button
                          onClick={() => handleCopy(link.shortUrl, link.id)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                          title="Copy to clipboard">
                          <Copy
                            className={`w-4 h-4 ${
                              copiedId === link.id
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                    </td>

                    {/* Destination */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 max-w-xs">
                        <span className="text-gray-700 truncate">
                          {link.destination}
                        </span>
                        <button
                          onClick={() => handleOpenLink(link.destination)}
                          className="p-1 hover:bg-gray-100 rounded transition shrink-0"
                          title="Open link">
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>

                    {/* Visits */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{link.visits}</span>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{link.created}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          link.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                        {link.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete link">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing 1 to 10 of 25 links
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="px-4 py-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinksManagementPage;
