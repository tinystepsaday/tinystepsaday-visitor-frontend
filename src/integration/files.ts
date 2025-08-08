import apiClient from './apiClient'
import { storage } from '@/lib/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import type { 
  MediaFile, 
  FileQueryParams, 
  PaginatedFileResponse, 
  FileUploadData, 
  FileUpdateData, 
  FileStatistics, 
  BulkFileOperationData,
  UploadProgress,
  FileUploadResponse
} from '@/lib/types'

// File API endpoints
const FILE_ENDPOINTS = {
  files: '/api/files',
  statistics: '/api/files/statistics',
  search: '/api/files/search',
  myFiles: '/api/files/my-files',
  uploadUrl: '/api/files/upload-url',
  bulk: '/api/files/bulk',
} as const

// File type mapping
const FILE_TYPE_MAP = {
  'image/jpeg': 'IMAGE',
  'image/jpg': 'IMAGE',
  'image/png': 'IMAGE',
  'image/gif': 'IMAGE',
  'image/webp': 'IMAGE',
  'image/svg+xml': 'IMAGE',
  'video/mp4': 'VIDEO',
  'video/avi': 'VIDEO',
  'video/mov': 'VIDEO',
  'video/wmv': 'VIDEO',
  'video/flv': 'VIDEO',
  'video/webm': 'VIDEO',
  'application/pdf': 'DOCUMENT',
  'application/msword': 'DOCUMENT',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
  'text/plain': 'DOCUMENT',
  'audio/mpeg': 'AUDIO',
  'audio/wav': 'AUDIO',
  'audio/ogg': 'AUDIO',
  'audio/mp3': 'AUDIO',
} as const

// Get file type from MIME type
export const getFileType = (mimeType: string): "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | "OTHER" => {
  return (FILE_TYPE_MAP[mimeType as keyof typeof FILE_TYPE_MAP] || 'OTHER') as "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO" | "OTHER"
}

// Generate unique filename
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop() || ''
  return `${timestamp}_${randomString}.${extension}`
}

// File API class
class FileAPI {
  // Get files with pagination and filtering
  async getFiles(params: FileQueryParams = {}): Promise<PaginatedFileResponse> {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','))
        } else {
          searchParams.append(key, String(value))
        }
      }
    })

    const url = `${FILE_ENDPOINTS.files}?${searchParams.toString()}`
    return apiClient.get<PaginatedFileResponse>(url)
  }

  // Get file by ID
  async getFileById(id: string): Promise<MediaFile> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile }>(
      `${FILE_ENDPOINTS.files}/${id}`
    )
    return response.data
  }

  // Create file record
  async createFile(fileData: Omit<MediaFile, 'id' | 'createdAt' | 'updatedAt'>): Promise<MediaFile> {
    const response = await apiClient.post<{ success: boolean; message: string; data: MediaFile }>(
      FILE_ENDPOINTS.files,
      fileData
    )
    return response.data
  }

  // Update file
  async updateFile(id: string, updateData: FileUpdateData): Promise<MediaFile> {
    const response = await apiClient.put<{ success: boolean; message: string; data: MediaFile }>(
      `${FILE_ENDPOINTS.files}/${id}`,
      updateData
    )
    return response.data
  }

  // Delete file
  async deleteFile(id: string): Promise<{ success: boolean; message: string; deletedFileId: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string; data: { success: boolean; message: string; deletedFileId: string } }>(
      `${FILE_ENDPOINTS.files}/${id}`
    )
    return response.data
  }

  // Search files
  async searchFiles(query: string, limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.search}?q=${encodeURIComponent(query)}&limit=${limit}`
    )
    return response.data
  }

  // Get file statistics
  async getFileStatistics(): Promise<FileStatistics> {
    const response = await apiClient.get<{ success: boolean; message: string; data: FileStatistics }>(
      FILE_ENDPOINTS.statistics
    )
    return response.data
  }

  // Get my files
  async getMyFiles(limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.myFiles}?limit=${limit}`
    )
    return response.data
  }

  // Get files by type
  async getFilesByType(type: string, limit: number = 10): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.files}/type/${type}?limit=${limit}`
    )
    return response.data
  }

  // Get files by MIME type
  async getFilesByMimeType(mimeType: string, limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.files}/mime-type/${encodeURIComponent(mimeType)}?limit=${limit}`
    )
    return response.data
  }

  // Get files by size range
  async getFilesBySizeRange(minSize: number, maxSize: number, limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.files}/size-range?minSize=${minSize}&maxSize=${maxSize}&limit=${limit}`
    )
    return response.data
  }

  // Get files by date range
  async getFilesByDateRange(startDate: string, endDate: string, limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.files}/date-range?startDate=${startDate}&endDate=${endDate}&limit=${limit}`
    )
    return response.data
  }

  // Get files by tags
  async getFilesByTags(tags: string[], limit: number = 20): Promise<MediaFile[]> {
    const response = await apiClient.get<{ success: boolean; message: string; data: MediaFile[] }>(
      `${FILE_ENDPOINTS.files}/tags?tags=${tags.join(',')}&limit=${limit}`
    )
    return response.data
  }

  // Bulk file operations
  async bulkFileOperation(operationData: BulkFileOperationData): Promise<{ affectedCount: number; affectedFileIds: string[] }> {
    const response = await apiClient.post<{ success: boolean; message: string; data: { affectedCount: number; affectedFileIds: string[] } }>(
      FILE_ENDPOINTS.bulk,
      operationData
    )
    return response.data
  }

  // Get upload URL for cloud storage
  async getUploadUrl(fileData: {
    originalName: string
    mimeType: string
    size: number
    type: string
    alt?: string
    caption?: string
    isPublic?: boolean
    tags?: string[]
    metadata?: Record<string, unknown>
  }): Promise<FileUploadResponse> {
    const response = await apiClient.post<FileUploadResponse>(
      FILE_ENDPOINTS.uploadUrl,
      fileData
    )
    return response
  }

  // Upload file to Firebase with progress tracking
  async uploadFileToFirebase(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; filename: string }> {
    return new Promise((resolve, reject) => {
      const filename = generateUniqueFilename(file.name)
      const storageRef = ref(storage, `files/${filename}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      const startTime = Date.now()
      let lastUploaded = 0
      let lastTime = startTime

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          const currentTime = Date.now()
          const timeDiff = (currentTime - lastTime) / 1000 // seconds
          const uploadedDiff = snapshot.bytesTransferred - lastUploaded
          const speed = timeDiff > 0 ? uploadedDiff / timeDiff : 0 // bytes per second
          const remainingBytes = snapshot.totalBytes - snapshot.bytesTransferred
          const timeRemaining = speed > 0 ? remainingBytes / speed : 0

          onProgress?.({
            progress,
            uploaded: snapshot.bytesTransferred,
            total: snapshot.totalBytes,
            speed,
            timeRemaining,
          })

          lastUploaded = snapshot.bytesTransferred
          lastTime = currentTime
        },
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve({ url: downloadURL, filename })
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  // Complete file upload process
  async uploadFile(
    uploadData: FileUploadData,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<MediaFile> {
    try {
      // 1. Upload to Firebase
      const { url, filename } = await this.uploadFileToFirebase(uploadData.file, onProgress)

      // 2. Create file record in backend
      const fileType = getFileType(uploadData.file.type)
      const fileRecord: Omit<MediaFile, 'id' | 'createdAt' | 'updatedAt'> = {
        url,
        alt: uploadData.alt,
        type: fileType,
        caption: uploadData.caption,
        filename,
        originalName: uploadData.file.name,
        mimeType: uploadData.file.type,
        size: uploadData.file.size,
        isPublic: uploadData.isPublic ?? true,
        tags: uploadData.tags || [],
        metadata: uploadData.metadata || {},
      }

      // Add image dimensions if it's an image
      if (fileType === 'IMAGE') {
        const dimensions = await this.getImageDimensions(uploadData.file)
        if (dimensions) {
          fileRecord.width = dimensions.width
          fileRecord.height = dimensions.height
        }
      }

      // Add video duration if it's a video
      if (fileType === 'VIDEO') {
        const duration = await this.getVideoDuration(uploadData.file)
        if (duration) {
          fileRecord.duration = duration
        }
      }

      const createdFile = await this.createFile(fileRecord)
      return createdFile
    } catch (error) {
      console.error('File upload failed:', error)
      throw error
    }
  }

  // Get image dimensions
  private getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        resolve(null)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  // Get video duration
  private getVideoDuration(file: File): Promise<number | null> {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.onloadedmetadata = () => {
        resolve(Math.round(video.duration))
      }
      video.onerror = () => {
        resolve(null)
      }
      video.src = URL.createObjectURL(file)
    })
  }
}

// Export singleton instance
export const fileAPI = new FileAPI()
