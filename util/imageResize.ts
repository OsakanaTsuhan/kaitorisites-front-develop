// util/imageResize.ts

export interface ResizeOptions {
  maxSizeInMB: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export interface ResizeResult {
  success: boolean;
  file: File | null;
  originalSize: number;
  newSize: number;
  error?: string;
}

/**
 * Resize image file if it exceeds the maximum size limit
 * @param file - The image file to resize
 * @param options - Resize options
 * @returns Promise<ResizeResult>
 */
export const resizeImageIfNeeded = async (
  file: File,
  options: ResizeOptions = {
    maxSizeInMB: 10,
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.8
  }
): Promise<ResizeResult> => {
  const maxSizeInBytes = options.maxSizeInMB * 1024 * 1024;
  
  // If file is already under the limit, return as is
  if (file.size <= maxSizeInBytes) {
    return {
      success: true,
      file: file,
      originalSize: file.size,
      newSize: file.size
    };
  }

  try {
    // Create canvas to resize image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    // Create image element
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        try {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = calculateDimensions(
            img.width,
            img.height,
            options.maxWidth || 1920,
            options.maxHeight || 1080
          );

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw resized image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve({
                  success: false,
                  file: null,
                  originalSize: file.size,
                  newSize: 0,
                  error: 'Failed to create resized image'
                });
                return;
              }

              // Create new file with resized image
              const resizedFile = new File(
                [blob],
                file.name,
                {
                  type: file.type,
                  lastModified: Date.now()
                }
              );

              resolve({
                success: true,
                file: resizedFile,
                originalSize: file.size,
                newSize: resizedFile.size
              });
            },
            file.type,
            options.quality || 0.8
          );
        } catch (error) {
          resolve({
            success: false,
            file: null,
            originalSize: file.size,
            newSize: 0,
            error: `Resize error: ${error instanceof Error ? error.message : 'Unknown error'}`
          });
        }
      };

      img.onerror = () => {
        resolve({
          success: false,
          file: null,
          originalSize: file.size,
          newSize: 0,
          error: 'Failed to load image'
        });
      };

      // Load image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  } catch (error) {
    return {
      success: false,
      file: null,
      originalSize: file.size,
      newSize: 0,
      error: `Resize error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Calculate new dimensions while maintaining aspect ratio
 */
const calculateDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  let width = originalWidth;
  let height = originalHeight;

  // Scale down if width exceeds maxWidth
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }

  // Scale down if height exceeds maxHeight
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }

  return { width: Math.round(width), height: Math.round(height) };
};

/**
 * Resize multiple images
 */
export const resizeMultipleImages = async (
  files: File[],
  options: ResizeOptions = {
    maxSizeInMB: 10,
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.8
  }
): Promise<ResizeResult[]> => {
  const results: ResizeResult[] = [];
  
  for (const file of files) {
    const result = await resizeImageIfNeeded(file, options);
    results.push(result);
  }
  
  return results;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
