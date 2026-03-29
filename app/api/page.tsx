'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ApiDocs() {
  const [colorInput, setColorInput] = useState('royalblue')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `/api/convert?color=${encodeURIComponent(colorInput)}`
      )
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setError(
        'Failed to fetch: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pb-10 pt-10 md:pb-20 md:pt-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">API Documentation</h1>
          <p className="text-muted-foreground">
            Use our API to convert colors to different formats programmatically.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                  GET /api/convert
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Query Parameters</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-2 pb-2 text-left">Parameter</th>
                      <th className="px-2 pb-2 text-left">Type</th>
                      <th className="px-2 pb-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-2 py-2 font-mono">color</td>
                      <td className="px-2 py-2">string</td>
                      <td className="px-2 py-2">
                        Color value (hex, rgb, hsl, hwb, cmyk, or named color)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Example Request</h4>
                <code className="block rounded bg-muted p-2 font-mono text-sm">
                  GET /api/convert?color=royalblue
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Success Response (200)</h4>
                <pre className="max-h-48 overflow-auto rounded bg-muted p-2 font-mono text-xs [scrollbar-width:none]">
                  {`{
  "original": "royalblue",
  "name": "RoyalBlue",
  "rgb": "rgb(65, 105, 225)",
  "hex": "#4169e1",
  "hsl": "hsl(225, 100%, 57%)",
  "hwb": "hwb(225, 25%, 12%)",
  "cmyk": "cmyk(71%, 53%, 0%, 12%)",
  "rgb_array": [65, 105, 225],
  "hsl_array": [225, 100, 57],
  "hwb_array": [225, 25, 12],
  "cmyk_array": [71, 53, 0, 12]
}`}
                </pre>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Error Response (400)</h4>
                <pre className="max-h-32 overflow-auto rounded bg-muted p-2 font-mono text-xs [scrollbar-width:none]">
                  {`{
  "error": "Invalid color format. Please check your input."
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Try It Out</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Enter color (e.g., #ff0000, red, rgb(0,255,0))"
                className="max-w-md focus:outline-none"
              />
              <Button
                onClick={testApi}
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? 'Loading...' : 'Test API'}
              </Button>
            </div>
            <div className="min-h-[20px]">
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
            </div>
            <div className="min-h-[200px]">
              {response && (
                <div>
                  <h4 className="mb-2 font-semibold">Response:</h4>
                  <pre className="max-h-96 overflow-auto rounded bg-muted p-4 font-mono text-sm [scrollbar-width:none]">
                    {response}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
