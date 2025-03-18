"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Copy, HelpCircle, Check } from "lucide-react";
import color from "color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export default function ColorConverter() {
	const { toast } = useToast();
	const [colorObj, setColorObj] = useState(color("rgb(65, 105, 225)"));
	const [colorInput, setColorInput] = useState("royalblue");
	const [pickerColor, setPickerColor] = useState("#4169e1");
	const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});
	const [inputError, setInputError] = useState<string | null>(null);
	const [isValidColor, setIsValidColor] = useState(true);

	// Format descriptions for tooltips
	const formatDescriptions = {
		name: "Named colors - Standard CSS color names like 'red', 'blue', etc.",
		rgb: "RGB (Red, Green, Blue) - Color model based on adding red, green, and blue light.",
		hex: "HEX - Hexadecimal color representation commonly used in web development.",
		hsl: "HSL (Hue, Saturation, Lightness) - Represents colors by their hue, saturation, and lightness values.",
		hwb: "HWB (Hue, Whiteness, Blackness) - Similar to HSL but uses whiteness and blackness instead of saturation and lightness.",
		cmyk: "CMYK (Cyan, Magenta, Yellow, Key/Black) - Subtractive color model used in color printing.",
		ncol: "NCol (Natural Color System) - A color system based on how humans perceive color with hue and whiteness/blackness.",
	};

	// Update all values when color changes
	useEffect(() => {
		try {
			setPickerColor(colorObj.hex());
		} catch (error) {
			console.error("Error updating picker color:", error);
		}
	}, [colorObj]);

	// Handle color picker change
	const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const newColor = color(e.target.value);
			setColorObj(newColor);
			setColorInput(e.target.value);
			setIsValidColor(true);
			setInputError(null);
		} catch {
			setIsValidColor(false);
			setInputError("Invalid color format. Please check your input.");
		}
	};

	// Handle manual color input
	const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const colorInput = e.target.value;
		setColorInput(colorInput);

		try {
			if (colorInput.indexOf("cmyk") > -1) {
				const regex = /^cmyk\((\d{1,3})%, (\d{1,3})%, (\d{1,3})%, (\d{1,3})%\)$/;
				const match = colorInput.match(regex);
				if (match) {
					const c = Number.parseInt(match[1], 10);
					const m = Number.parseInt(match[2], 10);
					const y = Number.parseInt(match[3], 10);
					const k = Number.parseInt(match[4], 10);
					const newColor = color({ c, m, y, k });
					setColorObj(newColor);
					setInputError(null);
					setIsValidColor(true);
				} else {
					setInputError("Invalid CMYK format. Use cmyk(0%, 0%, 0%, 0%)");
					setIsValidColor(false);
				}
				return;
			}

			const newColor = color(e.target.value);
			setColorObj(newColor);
			setInputError(null);
			setIsValidColor(true);
		} catch {
			setInputError("Invalid color format. Please check your input.");
			setIsValidColor(false);
		}
	};

	// Copy color value to clipboard
	const copyToClipboard = (text: string, format: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				// Set copy success state for this specific format
				setCopyStates((prev) => ({ ...prev, [format]: true }));

				// Reset after 2 seconds
				setTimeout(() => {
					setCopyStates((prev) => ({ ...prev, [format]: false }));
				}, 2000);

				toast({
					title: "Copied!",
					description: `${text} copied to clipboard`,
					duration: 2000,
				});
			},
			(err) => {
				console.error(err);
			}
		);
	};

	// Get color name
	const getColorName = () => {
		if (!isValidColor) return "Unknown";

		try {
			if (colorInput.match(/^[a-zA-Z]+$/) && !colorInput.includes("#")) {
				return colorInput;
			}
			return "No name";
		} catch {
			return "Unknown";
		}
	};

	// Format color values for different formats
	const getFormattedColor = (format: string) => {
		if (!isValidColor) return "Unknown";

		try {
			switch (format) {
				case "name":
					return getColorName();
				case "rgb": {
					const rgb = colorObj.rgb().round().array();
					return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
				}
				case "hex":
					return colorObj.hex();
				case "hsl": {
					const hsl = colorObj.hsl().round().array();
					return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
				}
				case "hwb": {
					const hwb = colorObj.hwb().round().array();
					return `hwb(${hwb[0]}, ${hwb[1]}%, ${hwb[2]}%)`;
				}
				case "cmyk": {
					const cmyk = colorObj.cmyk().round().array();
					return `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`;
				}
				default:
					return "Format not supported";
			}
		} catch {
			return "Unknown";
		}
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8 text-center">Color Converter</h1>

			<div className="mb-8">
				<div className="flex flex-col p-6 border rounded-lg bg-white shadow-sm">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
						<div className="relative">
							<div
								className="w-full h-40 cursor-pointer aspect-square rounded-md border shadow-sm mb-4"
								style={{ backgroundColor: pickerColor }}
							/>
							<input
								type="color"
								value={pickerColor}
								onChange={handlePickerChange}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								aria-label="Color Picker"
							/>
						</div>

						<div>
							<label htmlFor="colorInput" className="text-sm font-medium mb-2 block">
								Enter any color format:
							</label>
							<Input
								id="colorInput"
								value={colorInput}
								onChange={handleColorInputChange}
								placeholder="Enter color (name, hex, rgb, etc.)"
								className={`${
									inputError ? "border-red-500" : ""
								} outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
							/>
							<p className="text-sm text-muted-foreground mt-3">
								Examples: red, #ff0000, rgb(255,0,0), hsl(0,100%,50%)...
							</p>
							<p className={`${inputError ? "visible" : "invisible"} text-sm text-red-500 mt-1`}>
								{inputError ? inputError : "Invalid color format."}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{["name", "rgb", "hex", "hsl", "hwb", "cmyk"].map((format) => (
					<Card key={format} className="overflow-hidden relative">
						<CardHeader className="p-4 pb-2">
							<div className="flex items-center">
								<CardTitle className="text-lg capitalize">{format.toUpperCase()}</CardTitle>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
												<HelpCircle className="h-4 w-4" />
												<span className="sr-only">Info</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p className="max-w-xs">{formatDescriptions[format as keyof typeof formatDescriptions]}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => copyToClipboard(getFormattedColor(format), format)}
								className="h-8 w-8 absolute top-3 right-3">
								{copyStates[format] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
								<span className="sr-only">{copyStates[format] ? "Copied" : "Copy"}</span>
							</Button>
						</CardHeader>
						<CardContent className="p-4 pt-2">
							<code className="bg-muted p-2 rounded text-sm block overflow-x-auto">{getFormattedColor(format)}</code>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
