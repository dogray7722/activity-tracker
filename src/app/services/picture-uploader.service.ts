import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PictureUploaderService {

  constructor(private storage: AngularFireStorage) { }

  uploadPhoto(filePath: string, file: File) {
    this.storage.upload(filePath, file)
  }
}
