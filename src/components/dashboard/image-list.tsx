'use client';

import type { ListBlobResultBlob } from '@vercel/blob';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ImageListProps {
  blobs: ListBlobResultBlob[];
}

export function ImageList({ blobs }: ImageListProps) {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'Image link copied to clipboard.',
    });
  };
  
  if (blobs.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No images yet</h2>
        <p className="text-muted-foreground">Start by uploading your first image.</p>
      </div>
    )
  }

  return (
    <section>
        <h2 className="text-3xl font-bold mb-6 font-headline">Uploaded Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blobs.map((blob) => (
                <Card key={blob.pathname} className="overflow-hidden border-gray-800">
                    <CardContent className="p-0">
                        <div className="aspect-square relative w-full">
                            <Image
                                src={blob.url}
                                alt={blob.pathname}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="p-3 bg-secondary/20 flex-col items-start">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-xs text-muted-foreground truncate w-full">{blob.pathname}</p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{blob.pathname}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <div className="flex items-center w-full mt-2">
                            <input
                                type="text"
                                readOnly
                                value={blob.url}
                                className="text-xs bg-transparent border border-gray-600 rounded-l-md px-2 py-1 w-full focus:outline-none"
                            />
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopy(blob.url)}
                                className="p-2 h-auto border border-l-0 border-gray-600 rounded-l-none rounded-r-md hover:bg-gray-700"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </section>
  );
}
