import { list } from '@vercel/blob/server';
import { UploadForm } from '@/components/dashboard/upload-form';
import { ImageList } from '@/components/dashboard/image-list';
import { Header } from '@/components/dashboard/header';
import { Separator } from '@/components/ui/separator';

export const runtime = 'edge';

export default async function DashboardPage() {
  const { blobs } = await list({
    // Vercel Blob API has a limit of 1000 items per request.
    limit: 1000,
  });

  const sortedBlobs = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <UploadForm />
        <Separator className="my-8 md:my-12 bg-gray-800" />
        <ImageList blobs={sortedBlobs} />
      </main>
    </div>
  );
}
