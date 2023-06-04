import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Express } from 'express';
import { google } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  public CLIENT_ID = process.env.CLIENT_ID;
  public CLIENT_SECRET = process.env.CLIENT_SECRET;
  public REDIRECT_URI = process.env.REDIRECT_URI;
  public REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  private client = new google.auth.OAuth2(
    this.CLIENT_ID,
    this.CLIENT_SECRET,
    this.REDIRECT_URI,
  );

  private drive;

  constructor() {
    this.client.setCredentials({ refresh_token: this.REFRESH_TOKEN });
    this.drive = google.drive({
      version: 'v3',
      auth: this.client,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    // check img type
    const accessTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!accessTypes.includes(file.mimetype)) {
      throw new HttpException(
        'File format not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileUpload = await this.drive.files.create({
      requestBody: {
        name: file.filename,
        mimetype: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    const link = (await this.generatePublicLink(fileUpload.data.id)).data
      .webContentLink;
    // if (payload.resourceType === 'user') {
    //   repo = this.userRepo;
    // } else if (payload.resourceType === 'service') {
    //   repo = this.serviceRepo;
    // }

    // const resource = await repo.findOne(payload.resourceId);

    // if (!resource)
    //   throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);

    // resource.avatar = link;

    // await repo.save(resource);

    return {
      message: 'Upload successfully',
      data: {
        imageLink: link,
      },
    };
  }

  async uploadPDF(name, path, reportId) {
    const fileUpload = await this.drive.files.create({
      requestBody: {
        name,
        mimetype: 'application/pdf',
      },
      media: {
        mimetype: 'application/pdf',
        body: fs.createReadStream(path),
      },
    });

    const link = (await this.generatePublicLink(fileUpload.data.id)).data
      .webContentLink;

    return link
  }

  async generatePublicLink(fileId: string) {
    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const res = await this.drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    });

    return res;
  }
}
