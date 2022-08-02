import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureUploaderService {

  constructor(private storage: AngularFireStorage) { }

  uploadPhoto(filePath: string, file: File) {
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          url
        })
      })
    ) 
  }

}
