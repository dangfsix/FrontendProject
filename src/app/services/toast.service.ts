import { Injectable } from '@angular/core';
import { ScriptService } from './script.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: any[] = [];

  constructor(private scriptService: ScriptService) { }

  public show(text: string, options: any = {}) {
    let toast = { text, ...options };
    this.toasts.push(toast);
    this.scriptService.load();
    setTimeout(() => {
      this.remove(toast);
    }, 5500)
  }

  public remove(toast: any) {
    if (this.toasts.length !== 0) {
      this.toasts = this.toasts.filter(t => t !== toast);
    }
  }
}
