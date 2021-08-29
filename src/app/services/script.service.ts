import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }

  public load(): void {
    const dynamicScripts = [
      '../../../assets/js/custom.js'
    ];
    for (const script of dynamicScripts) {
      const node = document.createElement('script');
      [node.src, node.type, node.async] = [script, 'text/javascript', false];
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
