import { OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Component } from '@angular/core';

@Component({
  selector: 'app-octfifth',
  templateUrl: './octfifth.component.html',
  styleUrls: ['./octfifth.component.scss']
})
export class OctfifthComponent implements OnInit, AfterContentInit {

  @ViewChild('termuxsetup', { static: true })
  termuxsetup!: TemplateRef<any>;
  tems: TemplateRef<any> = this.termuxsetup;

  @Input()
  myselectedtemp: string = 'termuxsetup';
  
  myContext = { $implicit: 'World', localSk: 'Svet' };

  ngAfterContentInit() {
  
    switch (this.myselectedtemp) {
      case 'termuxsetup':
        this.tems = this.termuxsetup;
        break;
      }
    }


  constructor() { }

  ngOnInit(): void {
  }

}
