import { list } from '@vercel/blob';
import type { ListBlobResult } from '@vercel/blob';
import { UploadForm } from '@/components/dashboard/upload-form';
import { ImageList } from '@/components/dashboard/image-list';
import { Header } from '@/components/dashboard/header';
import { Separator } from '@/components/ui/separator';

export const runtime = 'edge';

export default async function DashboardPage() {
  let blobsResult: ListBlobResult;
  try {
    blobsResult = await list({
      limit: 1000,
    });
  } catch (error) {
    blobsResult = { blobs: [], hasMore: false, cursor: '' };
  }

  const sortedBlobs = blobsResult.blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <UploadForm />
        <Separator className="my-8 md:my-12" />
        <ImageList blobs={sortedBlobs} />
      </main>
    </div>
  );
}
