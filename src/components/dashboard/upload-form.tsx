'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadImage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Copy, CheckCircle } from 'lucide-react';
import type { PutBlobResult } from '@vercel/blob';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full btn-main transition-colors duration-300 mt-4">
      {pending ? 'Uploading...' : 'Upload Image'}
    </Button>
  );
}

export function UploadForm() {
  const [state, formAction] = useActionState(uploadImage, null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedBlob, setUploadedBlob] = useState<PutBlobResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        title: "Upload Failed",
        description: state.message,
        variant: "destructive",
      });
      setUploadedBlob(null);
    }
    if (state?.blob) {
      toast({
        title: "Upload Successful",
        description: state.message,
      });
      setUploadedBlob(state.blob);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [state, toast]);
  
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'Image link copied to clipboard.',
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
        // Trigger form submission
        fileInputRef.current.form?.requestSubmit();
      }
    }
  };

  return (
    <section>
        <form action={formAction}>
            <Card className={`border-2 border-dashed border-gray-600 transition-colors duration-300 ${isDragging ? 'border-foreground bg-secondary/30' : ''}`}>
                <CardContent 
                    className="p-6 text-center"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <UploadCloud className="h-12 w-12 text-gray-500" />
                        <div className="flex text-sm text-gray-500">
                            <label
                                htmlFor="image"
                                className="relative cursor-pointer rounded-md font-medium text-primary-foreground underline-offset-4 hover:underline"
                            >
                                <span>Click to upload</span>
                                <input id="image" name="image" type="file" className="sr-only" ref={fileInputRef} accept="image/png, image/jpeg, image/gif" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </CardContent>
            </Card>
            <SubmitButton />
        </form>
        {uploadedBlob && (
            <div className="mt-8 p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-medium">Upload Complete!</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Your image is now public. Copy the link below.</p>
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        readOnly
                        value={uploadedBlob.url}
                        className="text-sm bg-background border border-gray-600 rounded-l-md px-3 py-2 w-full focus:outline-none"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(uploadedBlob.url)}
                        className="p-2 h-auto border border-l-0 border-gray-600 rounded-l-none rounded-r-md hover:bg-gray-700"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        )}
    </section>
  );
}
