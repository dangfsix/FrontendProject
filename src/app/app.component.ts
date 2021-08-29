import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendProject';

  ngAfterViewInit() {
    this.loadScripts();
  }

  private loadScripts(): void {
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
