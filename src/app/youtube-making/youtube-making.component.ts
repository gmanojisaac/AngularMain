import {
  Component,
  Input,
  OnInit,
  AfterContentInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-youtube-making',
  templateUrl: './youtube-making.component.html',
  styleUrls: ['./youtube-making.component.scss'],
})
export class YoutubeMakingComponent implements OnInit {
  @ViewChild('usingngxs', { static: true })
  usingngxs!: TemplateRef<any>;

  @ViewChild('usingmermaid', { static: true })
  usingmermaid!: TemplateRef<any>;

  @ViewChild('usingmarkdown', { static: true })
  usingmarkdown!: TemplateRef<any>;

  @ViewChild('pagedesign', { static: true })
  pagedesign!: TemplateRef<any>;

  @ViewChild('storybookdesign', { static: true })
  storybookdesign!: TemplateRef<any>;

  @ViewChild('angularsetup', { static: true })
  angularsetup!: TemplateRef<any>;

  @ViewChild('angularComp', { static: true })
  angularComp!: TemplateRef<any>;

  tems: TemplateRef<any> = this.usingngxs;

  myContext = {$implicit: 'World', localSk: 'Svet'};
  
  @Input()
  myselectedtemp: string = 'first';

  constructor() {}

  ngOnInit(): void {}
  ngAfterContentInit() {
    switch (this.myselectedtemp) {
      case 'usingmermaid':
        this.tems = this.usingmermaid;
        break;

      case 'usingmarkdown':
        this.tems = this.usingmarkdown;
        break;
      case 'pagedesign':
        this.tems = this.pagedesign;
        console.log('reached');
        break;
      case 'storybookdesign':
        this.tems = this.storybookdesign;
        break;
      case 'angularsetup':
        this.tems = this.angularsetup;
        break;
      case 'angularComp':
        this.tems = this.angularComp;
        break;
      case 'usingngxs':
        this.tems = this.usingngxs;
        break;
    }
  }
}
