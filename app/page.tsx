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

  const colorNameMap: Record<string, string> = {
    '#F0F8FF': 'AliceBlue',
    '#FAEBD7': 'AntiqueWhite',
    '#00FFFF': 'Aqua',
    '#7FFFD4': 'Aquamarine',
    '#F0FFFF': 'Azure',
    '#F5F5DC': 'Beige',
    '#FFE4C4': 'Bisque',
    '#000000': 'Black',
    '#FFEBCD': 'BlanchedAlmond',
    '#0000FF': 'Blue',
    '#8A2BE2': 'BlueViolet',
    '#A52A2A': 'Brown',
    '#DEB887': 'BurlyWood',
    '#5F9EA0': 'CadetBlue',
    '#7FFF00': 'Chartreuse',
    '#D2691E': 'Chocolate',
    '#FF7F50': 'Coral',
    '#6495ED': 'CornflowerBlue',
    '#FFF8DC': 'Cornsilk',
    '#DC143C': 'Crimson',
    '#00008B': 'DarkBlue',
    '#008B8B': 'DarkCyan',
    '#B8860B': 'DarkGoldenRod',
    '#A9A9A9': 'DarkGray',
    '#006400': 'DarkGreen',
    '#BDB76B': 'DarkKhaki',
    '#8B008B': 'DarkMagenta',
    '#556B2F': 'DarkOliveGreen',
    '#FF8C00': 'Darkorange',
    '#9932CC': 'DarkOrchid',
    '#8B0000': 'DarkRed',
    '#E9967A': 'DarkSalmon',
    '#8FBC8F': 'DarkSeaGreen',
    '#483D8B': 'DarkSlateBlue',
    '#2F4F4F': 'DarkSlateGray',
    '#00CED1': 'DarkTurquoise',
    '#9400D3': 'DarkViolet',
    '#FF1493': 'DeepPink',
    '#00BFFF': 'DeepSkyBlue',
    '#696969': 'DimGray',
    '#1E90FF': 'DodgerBlue',
    '#D19275': 'Feldspar',
    '#B22222': 'FireBrick',
    '#FFFAF0': 'FloralWhite',
    '#228B22': 'ForestGreen',
    '#FF00FF': 'Fuchsia',
    '#DCDCDC': 'Gainsboro',
    '#F8F8FF': 'GhostWhite',
    '#FFD700': 'Gold',
    '#DAA520': 'GoldenRod',
    '#808080': 'Gray',
    '#008000': 'Green',
    '#ADFF2F': 'GreenYellow',
    '#F0FFF0': 'HoneyDew',
    '#FF69B4': 'HotPink',
    '#CD5C5C': 'IndianRed',
    '#4B0082': 'Indigo',
    '#FFFFF0': 'Ivory',
    '#F0E68C': 'Khaki',
    '#E6E6FA': 'Lavender',
    '#FFF0F5': 'LavenderBlush',
    '#7CFC00': 'LawnGreen',
    '#FFFACD': 'LemonChiffon',
    '#ADD8E6': 'LightBlue',
    '#F08080': 'LightCoral',
    '#E0FFFF': 'LightCyan',
    '#FAFAD2': 'LightGoldenRodYellow',
    '#D3D3D3': 'LightGrey',
    '#90EE90': 'LightGreen',
    '#FFB6C1': 'LightPink',
    '#FFA07A': 'LightSalmon',
    '#20B2AA': 'LightSeaGreen',
    '#87CEFA': 'LightSkyBlue',
    '#8470FF': 'LightSlateBlue',
    '#778899': 'LightSlateGray',
    '#B0C4DE': 'LightSteelBlue',
    '#FFFFE0': 'LightYellow',
    '#00FF00': 'Lime',
    '#32CD32': 'LimeGreen',
    '#FAF0E6': 'Linen',
    '#FF00FF': 'Magenta',
    '#800000': 'Maroon',
    '#66CDAA': 'MediumAquaMarine',
    '#0000CD': 'MediumBlue',
    '#BA55D3': 'MediumOrchid',
    '#9370D8': 'MediumPurple',
    '#3CB371': 'MediumSeaGreen',
    '#7B68EE': 'MediumSlateBlue',
    '#00FA9A': 'MediumSpringGreen',
    '#48D1CC': 'MediumTurquoise',
    '#C71585': 'MediumVioletRed',
    '#191970': 'MidnightBlue',
    '#F5FFFA': 'MintCream',
    '#FFE4E1': 'MistyRose',
    '#FFE4B5': 'Moccasin',
    '#FFDEAD': 'NavajoWhite',
    '#000080': 'Navy',
    '#FDF5E6': 'OldLace',
    '#808000': 'Olive',
    '#6B8E23': 'OliveDrab',
    '#FFA500': 'Orange',
    '#FF4500': 'OrangeRed',
    '#DA70D6': 'Orchid',
    '#EEE8AA': 'PaleGoldenRod',
    '#98FB98': 'PaleGreen',
    '#AFEEEE': 'PaleTurquoise',
    '#D87093': 'PaleVioletRed',
    '#FFEFD5': 'PapayaWhip',
    '#FFDAB9': 'PeachPuff',
    '#CD853F': 'Peru',
    '#FFC0CB': 'Pink',
    '#DDA0DD': 'Plum',
    '#B0E0E6': 'PowderBlue',
    '#800080': 'Purple',
    '#FF0000': 'Red',
    '#BC8F8F': 'RosyBrown',
    '#4169E1': 'RoyalBlue',
    '#8B4513': 'SaddleBrown',
    '#FA8072': 'Salmon',
    '#F4A460': 'SandyBrown',
    '#2E8B57': 'SeaGreen',
    '#FFF5EE': 'SeaShell',
    '#A0522D': 'Sienna',
    '#C0C0C0': 'Silver',
    '#87CEEB': 'SkyBlue',
    '#6A5ACD': 'SlateBlue',
    '#708090': 'SlateGray',
    '#FFFAFA': 'Snow',
    '#00FF7F': 'SpringGreen',
    '#4682B4': 'SteelBlue',
    '#D2B48C': 'Tan',
    '#008080': 'Teal',
    '#D8BFD8': 'Thistle',
    '#FF6347': 'Tomato',
    '#40E0D0': 'Turquoise',
    '#EE82EE': 'Violet',
    '#D02090': 'VioletRed',
    '#F5DEB3': 'Wheat',
    '#FFFFFF': 'White',
    '#F5F5F5': 'WhiteSmoke',
    '#FFFF00': 'Yellow',
    '#9ACD32': 'YellowGreen'
  }

  const getColorName = () => {
    if (!isValidColor) {
      return 'Unknown'
    }

    try {
      const hexValue = colorObj.hex().toUpperCase()
      return colorNameMap[hexValue] || 'No name'
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
