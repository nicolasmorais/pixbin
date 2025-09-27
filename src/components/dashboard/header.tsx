import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-center">
            <Image 
              src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2026%20de%20set.%20de%202025%2C%2022_19_04%20%281%29-WRduHS9M8L1lSjQ5AuZGseL9pJDAhl.png" 
              alt="Pixbin Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
        </div>
    </header>
  );
}
