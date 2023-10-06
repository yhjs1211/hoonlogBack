import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../types/cloudinary.response';
import * as streamifier from 'streamifier';

@Injectable()
export default class ImageService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return rej(error);
          res(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
