'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { GithubIcon } from '../icons/github-icon'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          ColorConverter
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <Link
            href="https://github.com/isixe/ColorConverter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-muted"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
