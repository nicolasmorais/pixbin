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
      {pending ? 'Enviando...' : 'Enviar Imagem'}
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
        title: "Falha no Upload",
        description: state.message,
        variant: "destructive",
      });
      setUploadedBlob(null);
    }
    if (state?.blob) {
      toast({
        title: "Upload Concluído",
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
      title: 'Copiado!',
      description: 'Link da imagem copiado para a área de transferência.',
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
        fileInputRef.current.form?.requestSubmit();
      }
    }
  };

  return (
    <section>
        <form action={formAction}>
            <Card className={`border-2 border-dashed transition-colors duration-300 ${isDragging ? 'border-primary bg-accent' : ''}`}>
                <CardContent 
                    className="p-6 text-center"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <div className="flex text-sm text-muted-foreground">
                            <label
                                htmlFor="image"
                                className="relative cursor-pointer rounded-md font-medium text-primary underline-offset-4 hover:underline"
                            >
                                <span>Clique para enviar</span>
                                <input id="image" name="image" type="file" className="sr-only" ref={fileInputRef} accept="image/png, image/jpeg, image/gif" />
                            </label>
                            <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF até 10MB</p>
                    </div>
                </CardContent>
            </Card>
            <SubmitButton />
        </form>
        {uploadedBlob && (
            <div className="mt-8 p-4 rounded-lg bg-secondary/50 border">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-medium">Upload Concluído!</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Sua imagem agora está pública. Copie o link abaixo.</p>
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        readOnly
                        value={uploadedBlob.url}
                        className="text-sm bg-background border rounded-l-md px-3 py-2 w-full focus:outline-none"
                    />
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(uploadedBlob.url)}
                        className="p-2 h-auto border border-l-0 rounded-l-none rounded-r-md hover:bg-muted"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        )}
    </section>
  );
}
