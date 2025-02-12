"use client";

import { AuthorFormModal } from "@/components/modals/author-form-modal";
import { ReviewFormModal } from "@/components/modals/review-form-modal";
import { Author, Bakery } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [bakeries, setBakeries] = useState<Bakery[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const handleLogout = async () => {
    // Clear the cookie by setting it to expire
    document.cookie =
      "admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  const fetchBakeries = async () => {
    try {
      const response = await fetch("/api/admin/bakeries");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setBakeries(data);
    } catch (error) {
      console.error("Error fetching bakeries:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch("/api/admin/authors");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(`/api/admin/bakeries?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      // Refresh the list
      fetchBakeries();
    } catch (error) {
      console.error("Error deleting bakery:", error);
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const response = await fetch(`/api/admin/authors?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      // Refresh the list
      fetchAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchBakeries(), fetchAuthors()]).finally(() =>
      setIsLoading(false)
    );
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPriceRating = (rating: number) => "$".repeat(rating);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bakery Reviews Admin</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Authors Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Authors</h2>
          <button
            onClick={() => {
              setSelectedAuthor(null);
              setIsAuthorModalOpen(true);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add New Author
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : authors.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No authors yet
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {authors.map((author) => (
                    <tr key={author.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {author.image && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <img
                                src={author.image}
                                alt={`${author.firstName} ${author.lastName}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {author.firstName} {author.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* We'll add the review count here later */}-
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedAuthor(author);
                            setIsAuthorModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAuthor(author.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <button
            onClick={() => {
              setSelectedBakery(null);
              setIsReviewModalOpen(true);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add New Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">All Reviews</h2>
          </div>

          {/* Reviews Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : bakeries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No reviews yet
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bakery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ratings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bakeries.map((bakery) => (
                    <tr key={bakery.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {bakery.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {bakery.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>
                            Critic:{" "}
                            {"★".repeat(Math.round(bakery.criticRating))}
                            {"☆".repeat(5 - Math.round(bakery.criticRating))} (
                            {bakery.criticRating.toFixed(1)})
                          </div>
                          <div>
                            Member:{" "}
                            {"★".repeat(Math.round(bakery.memberRating))}
                            {"☆".repeat(5 - Math.round(bakery.memberRating))} (
                            {bakery.memberRating.toFixed(1)})
                          </div>
                          <div>
                            Price: {formatPriceRating(bakery.priceRating)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(bakery.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedBakery(bakery);
                            setIsReviewModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(bakery.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedBakery(null);
          fetchBakeries();
        }}
        initialData={selectedBakery}
      />

      <AuthorFormModal
        isOpen={isAuthorModalOpen}
        onClose={() => {
          setIsAuthorModalOpen(false);
          setSelectedAuthor(null);
          fetchAuthors();
        }}
        initialData={selectedAuthor}
      />
    </div>
  );
}
