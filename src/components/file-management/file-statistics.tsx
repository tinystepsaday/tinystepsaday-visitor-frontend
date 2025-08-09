"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatBytes, formatDate } from "@/lib/utils"
import type { FileStatistics as FileStatisticsType } from "@/lib/types"

interface FileStatisticsProps {
  statistics: FileStatisticsType
}

const FILE_TYPE_COLORS = {
  IMAGE: "bg-blue-100 text-blue-800",
  VIDEO: "bg-red-100 text-red-800",
  AUDIO: "bg-green-100 text-green-800",
  DOCUMENT: "bg-orange-100 text-orange-800",
  OTHER: "bg-gray-100 text-gray-800",
}

const FILE_TYPE_ICONS = {
  IMAGE: "🖼️",
  VIDEO: "🎥",
  AUDIO: "🎵",
  DOCUMENT: "📄",
  OTHER: "📁",
}

export function FileStatistics({ statistics }: FileStatisticsProps) {
  const totalFiles = statistics.totalFiles
  const totalSize = statistics.totalSize
  const averageFileSize = statistics.averageFileSize

  const getFileTypePercentage = (count: number) => {
    return totalFiles > 0 ? Math.round((count / totalFiles) * 100) : 0
  }

  const getSizePercentage = (size: number) => {
    return totalSize > 0 ? Math.round((size / totalSize) * 100) : 0
  }

  return (
    <div className="space-y-6 overflow-y-auto max-h-[80vh]">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {formatBytes(totalSize)} total size
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average File Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(averageFileSize)}</div>
            <p className="text-xs text-muted-foreground">
              Per file average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.publicFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {getFileTypePercentage(statistics.publicFiles)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Private Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.privateFiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {getFileTypePercentage(statistics.privateFiles)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* File Types Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>File Types Distribution</CardTitle>
          <CardDescription>
            Breakdown of files by type and size
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(statistics.filesByType).map(([type, count]) => {
            const percentage = getFileTypePercentage(count)
            const icon = FILE_TYPE_ICONS[type as keyof typeof FILE_TYPE_ICONS] || "📁"
            const colorClass = FILE_TYPE_COLORS[type as keyof typeof FILE_TYPE_COLORS] || "bg-gray-100 text-gray-800"
            
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span className="font-medium">{type}</span>
                    <Badge variant="outline" className={colorClass}>
                      {count.toLocaleString()} files
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Notable Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Largest File */}
        <Card>
          <CardHeader>
            <CardTitle>Largest File</CardTitle>
            <CardDescription>
              The file with the biggest size
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statistics.largestFile ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {FILE_TYPE_ICONS[statistics.largestFile.type as keyof typeof FILE_TYPE_ICONS] || "📁"}
                  </span>
                  <div>
                    <p className="font-medium">{statistics.largestFile.filename}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatBytes(statistics.largestFile.size)}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {statistics.largestFile.type}
                </Badge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No files available</p>
            )}
          </CardContent>
        </Card>

        {/* Most Recent File */}
        <Card>
          <CardHeader>
            <CardTitle>Most Recent File</CardTitle>
            <CardDescription>
              The latest uploaded file
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statistics.mostRecentFile ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {FILE_TYPE_ICONS[statistics.mostRecentFile.type as keyof typeof FILE_TYPE_ICONS] || "📁"}
                  </span>
                  <div>
                    <p className="font-medium">{statistics.mostRecentFile.filename}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(statistics.mostRecentFile.createdAt)}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {statistics.mostRecentFile.type}
                </Badge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No files available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Size Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            How your storage is distributed across file types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Storage Used</span>
              <span className="text-sm text-muted-foreground">
                {formatBytes(totalSize)}
              </span>
            </div>
            
            {Object.entries(statistics.filesByType).map(([type, count]) => {
              // Estimate size for this type (this is a simplified calculation)
              // In a real implementation, you'd want to track actual sizes per type
              const estimatedSize = (totalSize / totalFiles) * count
              const percentage = getSizePercentage(estimatedSize)
              const icon = FILE_TYPE_ICONS[type as keyof typeof FILE_TYPE_ICONS] || "📁"
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatBytes(estimatedSize)} ({percentage}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium">File Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(statistics.filesByType).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different file types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium">Average Files per Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalFiles / Math.max(Object.keys(statistics.filesByType).length, 1))}
            </div>
            <p className="text-xs text-muted-foreground">
              Files per type average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium">Storage Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalFiles > 0 ? Math.round((totalFiles / (totalSize / (1024 * 1024))) * 100) / 100 : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Files per MB
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
