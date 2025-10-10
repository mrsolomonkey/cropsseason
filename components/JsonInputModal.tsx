"use client"

import { useState } from "react"

export default function JsonInputModal() {
  const [open, setOpen] = useState(false)
  const [jsonText, setJsonText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)

      const parsed = JSON.parse(jsonText) // validate JSON
      const res = await fetch("/api/coin-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      })

      if (!res.ok) {
        throw new Error("Failed to save data")
      }

      setJsonText("")
      setOpen(false)
      // Optionally trigger a refresh or revalidation
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add JSON Data
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add Coin Data (JSON)</h2>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='e.g. { "date": "2025-09-21", "btcCount": 0.52, "ethCount": 2.1, "solCount": 11 }'
              className="w-full h-40 border rounded-md p-2 font-mono text-sm"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
