import { getStorage } from 'firebase-admin/storage'
import { getApp } from './app'

function getBucket() {
  const app = getApp()
  return getStorage(app).bucket()
}

export async function getStorageWriteStream(
  fileName: string,
  metadata = {contentType: "image/jpeg"}
) {

  const bucket = getBucket()
  const fileRef = bucket.file(fileName)
  const publicUrl = fileRef.publicUrl()
  
  const writeStream = fileRef.createWriteStream({resumable: false})
  writeStream.on('finish', () => {
    fileRef.setMetadata(metadata)
  })
  writeStream.on('error', (e) => console.log('error', e))
  
  return {writeStream, publicUrl}
}
