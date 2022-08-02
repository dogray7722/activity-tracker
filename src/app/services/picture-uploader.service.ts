import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureUploaderService {

  constructor(private storage: AngularFireStorage) { }

  uploadPhoto(filePath: string, file: File) {
    return this.storage.upload(filePath, file) 
  }

}
