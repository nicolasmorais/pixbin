export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="flex-1">
                <h1 className="text-2xl font-bold font-headline">Pixbin</h1>
            </div>
        </div>
    </header>
  );
}
