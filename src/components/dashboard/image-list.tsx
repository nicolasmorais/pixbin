'use client';

import type { ListBlobResultBlob } from '@vercel/blob';
import Image from 'next/image';
import { Copy, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteImage } from '@/app/actions';

interface ImageListProps {
  blobs: ListBlobResultBlob[];
}

export function ImageList({ blobs }: ImageListProps) {
  const { toast } = useToast();

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copiado!',
      description: 'Link da imagem copiado para a área de transferência.',
    });
  };

  const handleDelete = async (url: string) => {
    const result = await deleteImage(url);
    if (result.error) {
      toast({
        title: 'Erro!',
        description: result.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: result.message,
      });
    }
  };
  
  if (blobs.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">Nenhuma imagem ainda</h2>
        <p className="text-muted-foreground">Comece fazendo o upload da sua primeira imagem.</p>
      </div>
    )
  }

  return (
    <section>
        <h2 className="text-3xl font-bold mb-6 font-headline">Imagens Carregadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blobs.map((blob) => (
                <Card key={blob.url} className="overflow-hidden">
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

                        <div className="flex items-center w-full mt-2 justify-between">
                            <div className="flex items-center">
                              <input
                                  type="text"
                                  readOnly
                                  value={blob.url}
                                  className="text-xs bg-transparent border rounded-l-md px-2 py-1 w-full focus:outline-none"
                              />
                              <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleCopy(blob.url)}
                                  className="p-2 h-auto border border-l-0 rounded-l-none rounded-r-md hover:bg-muted"
                              >
                                  <Copy className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="ghost" asChild>
                                        <a href={blob.downloadUrl} download>
                                          <Download className="h-4 w-4" />
                                        </a>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Baixar</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <AlertDialog>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Excluir</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente a imagem
                                        dos nossos servidores.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(blob.url)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </section>
  );
}