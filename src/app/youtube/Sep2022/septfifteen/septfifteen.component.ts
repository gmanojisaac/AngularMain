import { OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Component } from '@angular/core';

@Component({
  selector: 'app-septfifteen',
  templateUrl: './septfifteen.component.html',
  styleUrls: ['./septfifteen.component.scss']
})
export class SeptfifteenComponent implements OnInit, AfterContentInit  {

  @Input()
  myselectedtemp: string = 'first';

  @ViewChild('Title', { static: true })
  Title!: TemplateRef<any>;
  @ViewChild('Flowchart', { static: true })
  Flowchart!: TemplateRef<any>;
  
  @ViewChild('Angular', { static: true })
  Angular!: TemplateRef<any>;

  @ViewChild('Storybook', { static: true })
  Storybook!: TemplateRef<any>;

  @ViewChild('PRUpdate', { static: true })
  PRUpdate!: TemplateRef<any>;

  @ViewChild('Output', { static: true })
  Output!: TemplateRef<any>;

  myContext = {$implicit: 'World', localSk: 'Svet'};

  tems: TemplateRef<any> = this.Title;
  
  ngOnInit(){      
  }
  ngAfterContentInit() {
    switch (this.myselectedtemp) {
    case 'Title':        
      this.tems = this.Title;
    break;  
    case 'Flowchart':        
      this.tems = this.Flowchart;
    break;     
    case 'Angular':        
    this.tems = this.Angular;
    break;
    case 'Storybook':        
        this.tems = this.Storybook;
    break;
    case 'PRUpdate':        
    this.tems = this.PRUpdate;
    break;
    case 'Output':        
    this.tems = this.Output;
    break;    
    }
  }
}
