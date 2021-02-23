import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor() { }
  uploadFile = () => {  }

  loadImage = async ( event ) => {
    return new Promise<string>((resolve, reject) => { 
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.toString());
      };

      reader.readAsDataURL(event.target.files[0]);
    })
  }

  loadFiles = async ( event ) => {
    console.log(event);
    
    return new Promise<string | ArrayBuffer>((resolve, reject) => { 
      const { files } = event.target
      const reader = new FileReader();

      
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    })
  }
}
