import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor(private ionHttp: HTTP,
              public toastController: ToastController
  ) { }

  backUrl = 'http://192.168.1.68:3000/api/public/';
  
  // Muestra mensajes que exito o error
  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: 2000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }
  
  // Petición GET
  async get(ruta: string) {
    const headers = {};
    return this.ionHttp.get(this.backUrl + ruta, {}, headers)
      .then((data: any) => {
        return JSON.parse(data.data);
      })
      .catch(error => {
        console.log(error);
        this.presentToast(JSON.parse(error.error).mensaje)
        throw error.error;
      });
  }

  // Petición POST
  async post(ruta: string, body?: {}, ) {
    const headers = {};
    return this.ionHttp.post(this.backUrl + ruta, body, headers)
      .then((data: any) => {
        const datos = JSON.parse(data.data);
        this.presentToast(datos.mensaje);
        return datos;
      })
      .catch(error => {
        console.log(error);
        this.presentToast(JSON.parse(error.error).mensaje)
        throw error;
      });
  }
 
}
