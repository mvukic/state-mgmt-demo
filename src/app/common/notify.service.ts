import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  #toastr = inject(ToastrService);

  notify(message: string) {
    this.#toastr.show(message);
  }
}
