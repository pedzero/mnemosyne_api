import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import s3 from './minio'
import { AppError } from './errors'

const {
    MINIO_BUCKET,
    MINIO_USE_SSL,
    MINIO_ENDPOINT,
    MINIO_PORT,
} = process.env

const BUCKET_NAME = MINIO_BUCKET

interface UploadedFile {
    originalname: string
    mimetype: string
    buffer: Buffer
}

export async function uploadImage(file: UploadedFile): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`.replace(/ /g, '-')

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    }

    try {
        await s3.send(new PutObjectCommand(params))

        const fileUrl = `http${MINIO_USE_SSL === 'true' ? 's' : ''}://${MINIO_ENDPOINT}:${MINIO_PORT}/${BUCKET_NAME}/${fileName}`
        return fileUrl
    } catch (error) {
        throw new AppError('Something went wrong. Try again later.', 503)
    }
}

export async function deleteImage(fileName: string): Promise<void> {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
    }

    try {
        await s3.send(new DeleteObjectCommand(params))
    } catch (error) {
        throw new AppError('Something went wrong. Try again later.', 503)
    }
}
