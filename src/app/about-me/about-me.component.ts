import { OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterContentInit {

  @ViewChild('Introduction', { static: true })
  Introduction!: TemplateRef<any>;

  @ViewChild('Career', { static: true })
  Career!: TemplateRef<any>;

  @ViewChild('Development', { static: true })
  Development!: TemplateRef<any>;

  @ViewChild('Lecturer', { static: true })
  Lecturer!: TemplateRef<any>;

  @ViewChild('Telecom', { static: true })
  Telecom!: TemplateRef<any>;

  myContext = { $implicit: 'World', localSk: 'Svet' };
  tems: TemplateRef<any> = this.Introduction;

  @Input()
  myselectedtemp: string = 'first';

  ngAfterContentInit() {
    switch (this.myselectedtemp) {
      case 'Introduction':
        this.tems = this.Introduction;
        break;
      case 'Career':
        this.tems = this.Career;
        break;
      case 'Development':
        this.tems = this.Development;
        break;
      case 'Lecturer':
        this.tems = this.Lecturer;
        break;
      case 'Telecom':
        this.tems = this.Telecom;
        break;
    }
  }
  ngOnInit(): void {
  }
}
