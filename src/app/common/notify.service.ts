import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor() {
    Notification.requestPermission();
  }

  notify(message: string) {
    console.log(message);
    new Notification('Notification', { body: message, requireInteraction: true});
  }
}
