'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import color from 'color'
import { Check, Copy, HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ColorConverter() {
  const [colorObj, setColorObj] = useState(color('rgb(65, 105, 225)'))
  const [colorInput, setColorInput] = useState('royalblue')
  const [pickerColor, setPickerColor] = useState('#4169e1')
  const [copyStates, setCopyStates] = useState<Record<string, boolean>>({})
  const [inputError, setInputError] = useState<string | null>(null)
  const [isValidColor, setIsValidColor] = useState(true)

  // Format descriptions for tooltips
  const formatDescriptions = {
    name: "Named colors - Standard CSS color names like 'red', 'blue', etc.",
    rgb: 'RGB (Red, Green, Blue) - Color model based on adding red, green, and blue light.',
    hex: 'HEX - Hexadecimal color representation commonly used in web development.',
    hsl: 'HSL (Hue, Saturation, Lightness) - Represents colors by their hue, saturation, and lightness values.',
    hwb: 'HWB (Hue, Whiteness, Blackness) - Similar to HSL but uses whiteness and blackness instead of saturation and lightness.',
    cmyk: 'CMYK (Cyan, Magenta, Yellow, Key/Black) - Subtractive color model used in color printing.',
    ncol: 'NCol (Natural Color System) - A color system based on how humans perceive color with hue and whiteness/blackness.'
  }

  // Update all values when color changes
  useEffect(() => {
    try {
      setPickerColor(colorObj.hex())
    } catch (error) {
      console.error('Error updating picker color:', error)
    }
  }, [colorObj])

  // Handle color picker change
  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newColor = color(e.target.value)
      setColorObj(newColor)
      setColorInput(e.target.value)
      setIsValidColor(true)
      setInputError(null)
    } catch {
      setIsValidColor(false)
      setInputError('Invalid color format. Please check your input.')
    }
  }

  // Handle manual color input
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorInput = e.target.value
    setColorInput(colorInput)

    try {
      if (colorInput.indexOf('cmyk') > -1) {
        const regex = /^cmyk\((\d{1,3})%, (\d{1,3})%, (\d{1,3})%, (\d{1,3})%\)$/
        const match = colorInput.match(regex)
        if (match) {
          const c = Number.parseInt(match[1], 10)
          const m = Number.parseInt(match[2], 10)
          const y = Number.parseInt(match[3], 10)
          const k = Number.parseInt(match[4], 10)
          const newColor = color({ c, m, y, k })
          setColorObj(newColor)
          setInputError(null)
          setIsValidColor(true)
        } else {
          setInputError('Invalid CMYK format. Use cmyk(0%, 0%, 0%, 0%)')
          setIsValidColor(false)
        }
        return
      }

      const newColor = color(e.target.value)
      setColorObj(newColor)
      setInputError(null)
      setIsValidColor(true)
    } catch {
      setInputError('Invalid color format. Please check your input.')
      setIsValidColor(false)
    }
  }

  // Copy color value to clipboard
  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Set copy success state for this specific format
        setCopyStates((prev) => ({ ...prev, [format]: true }))

        // Reset after 2 seconds
        setTimeout(() => {
          setCopyStates((prev) => ({ ...prev, [format]: false }))
        }, 2000)
      },
      (err) => {
        console.error(err)
      }
    )
  }

  // Get color name
  const getColorName = () => {
    if (!isValidColor) return 'Unknown'

    try {
      if (colorInput.match(/^[a-zA-Z]+$/) && !colorInput.includes('#')) {
        return colorInput
      }
      return 'No name'
    } catch {
      return 'Unknown'
    }
  }

  // Format color values for different formats
  const getFormattedColor = (format: string) => {
    if (!isValidColor) return 'Unknown'

    try {
      switch (format) {
        case 'name':
          return getColorName()
        case 'rgb': {
          const rgb = colorObj.rgb().round().array()
          return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        }
        case 'hex':
          return colorObj.hex()
        case 'hsl': {
          const hsl = colorObj.hsl().round().array()
          return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
        }
        case 'hwb': {
          const hwb = colorObj.hwb().round().array()
          return `hwb(${hwb[0]}, ${hwb[1]}%, ${hwb[2]}%)`
        }
        case 'cmyk': {
          const cmyk = colorObj.cmyk().round().array()
          return `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`
        }
        default:
          return 'Format not supported'
      }
    } catch {
      return 'Unknown'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="relative">
              <div
                className="mb-4 aspect-square h-40 w-full cursor-pointer rounded-md border shadow-sm"
                style={{ backgroundColor: pickerColor }}
              />
              <input
                type="color"
                value={pickerColor}
                onChange={handlePickerChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Color Picker"
              />
            </div>

            <div>
              <label
                htmlFor="colorInput"
                className="mb-2 block text-sm font-medium"
              >
                Enter any color format:
              </label>
              <Input
                id="colorInput"
                value={colorInput}
                onChange={handleColorInputChange}
                placeholder="Enter color (name, hex, rgb, etc.)"
                className={`${
                  inputError ? 'border-red-500' : ''
                } outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Examples: red, #ff0000, rgb(255,0,0), hsl(0,100%,50%)...
              </p>
              <p
                className={`${inputError ? 'visible' : 'invisible'} mt-1 text-sm text-red-500`}
              >
                {inputError ? inputError : 'Invalid color format.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['name', 'rgb', 'hex', 'hsl', 'hwb', 'cmyk'].map((format) => (
          <Card key={format} className="relative overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center">
                <CardTitle className="text-lg capitalize">
                  {format.toUpperCase()}
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-6 w-6 p-0"
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {
                          formatDescriptions[
                            format as keyof typeof formatDescriptions
                          ]
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  copyToClipboard(getFormattedColor(format), format)
                }
                className="absolute right-3 top-3 h-8 w-8"
              >
                {copyStates[format] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {copyStates[format] ? 'Copied' : 'Copy'}
                </span>
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <code className="block overflow-x-auto rounded bg-muted p-2 text-sm">
                {getFormattedColor(format)}
              </code>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
