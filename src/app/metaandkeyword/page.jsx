"use client"

import { useState } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { saveAs } from "file-saver"

export default function MetaAndKeywordPage() {
  // API form state
  const [formData, setFormData] = useState({
    documentURL: "",
    sheetURL: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  console.log(`res - `,response);
  
  const [error, setError] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const apiResponse = await fetch(
        "https://webnoxdigital.app.n8n.cloud/webhook/2edf87fb-6f9d-498c-97fc-d4e51773ea22",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      )

      const data = await apiResponse.json();
      console.log(`data - `,data);

      if (apiResponse.ok) {
        // Check if it's an error response with status: false
        if (data.status === false) {
          setError(data.message || "Request failed");
        } else {
          setResponse(data);
        }
      } else {
        setError(data.message || `HTTP error! status: ${apiResponse.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Function to download the template file as a blob
  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("https://docs.google.com/spreadsheets/d/1Y6qqp7mCGoFOGj-fvXdNKlN_Uk0oPrO--c1Y2IT3ZSc/export?format=xlsx", {
        method: "GET",
      })
      if (!response.ok) throw new Error("Failed to download template file")
      const blob = await response.blob()
      saveAs(blob, "Meta_Keyword_Template.xlsx")
    } catch (err) {
      alert("Could not download the template file. Please try again later.")
    }
  }

  const isFormValid = formData.sheetURL.trim() !== "" && formData.documentURL.trim() !== ""

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border border-gray-200">
        {/* Download Template Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition shadow"
          >
            Download Template File
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Meta & Keyword Generator</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Document URL</label>
            <input
              type="text"
              value={formData.documentURL}
              onChange={(e) => handleInputChange("documentURL", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter document URL"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Sheet URL</label>
            <input
              type="text"
              value={formData.sheetURL}
              onChange={(e) => handleInputChange("sheetURL", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter sheet URL"
              required
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Processing...' : 'Generate Meta & Keywords'}
          </button>
        </form>

        {/* Success Response */}
        {response && !isLoading && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Request Successful!</span>
            </div>
            <div className=" p-3 rounded text-sm text-green-600">
              <pre className="whitespace-pre-wrap overflow-auto max-h-40 ">
                {response?.message}
              </pre>
            </div>
            {response.sheet && (
              <div className="mt-3">
                <a
                  href={response.sheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium text-sm"
                >
                  Open Sheet
                </a>
              </div>
            )}
          </div>
        )}

        {/* Error Response */}
        {error && !isLoading && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">Request Failed</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="flex items-center">
              <Loader2 className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
              <span className="text-blue-800 font-medium">Generating meta tags and keywords...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}