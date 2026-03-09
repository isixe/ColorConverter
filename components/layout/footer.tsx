import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {currentYear} ColorConverter. All rights reserved.</p>
          <p>
            Built by{' '}
            <Link
              href="https://github.com/isixe"
              className="font-medium transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              isixe
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
