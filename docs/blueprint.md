# **App Name**: Pixbin

## Core Features:

- Login Authentication: Authenticate users based on a pre-defined password stored in the environment variables. Protect the panel from unauthorized access using a single password.
- Image Upload to Vercel Blob: Allow users to upload images directly to Vercel Blob storage. Ensure images are stored securely and efficiently.
- Public Link Generation: Generate a public, direct link to the uploaded image stored in Vercel Blob. Enable easy sharing of images via a direct URL.
- Image Validation: Validate uploaded images to ensure they are within the acceptable file types (jpg, png, gif) and size limits (10MB). Display a user-friendly message if the validation fails.
- Copy to Clipboard: Add a button next to the generated link that allows users to quickly copy the URL to their clipboard. Simplify the process of sharing the image link.
- Image Listing: Display a simple list of already uploaded images, fetched from Vercel Blob's API, if possible. Allow users to manage and review previously uploaded images.

## Style Guidelines:

- Background: Pure black (#000000) to create a minimalist and stark backdrop.
- Text: Pure white (#FFFFFF) for primary text to ensure high contrast and readability.
- Buttons/Links: White text with a black border. On hover, invert colors to black background with white text.
- Font: 'Inter', a grotesque-style sans-serif, should be used for body and headline text. Its objective, neutral look aligns well with the app's clean and modern aesthetics.
- Clean and minimalist layout without gradients. Focus on simplicity and ease of use.
- Minimal icons for actions like 'copy link'. Use simple, outlined icons in white to match the text.
- Subtle, smooth transitions for UI elements. For example, a slight fade-in effect when displaying the upload link.