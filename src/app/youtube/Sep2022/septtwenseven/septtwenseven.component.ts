import { OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Component } from '@angular/core';

@Component({
  selector: 'app-septtwenseven',
  templateUrl: './septtwenseven.component.html',
  styleUrls: ['./septtwenseven.component.scss']
})
export class SepttwensevenComponent implements OnInit {

  @Input()
  myselectedtemp: string = 'first';

  @ViewChild('Start', { static: true })
  Start!: TemplateRef<any>;

  @ViewChild('Plan', { static: true })
  Plan!: TemplateRef<any>;
  
  @ViewChild('RunNodeJS', { static: true })
  RunNodeJS!: TemplateRef<any>;

  @ViewChild('RunAngular', { static: true })
  RunAngular!: TemplateRef<any>;
  
  @ViewChild('Next', { static: true })
  Next!: TemplateRef<any>;  

  myContext = {$implicit: 'World', localSk: 'Svet'};

  tems: TemplateRef<any> = this.Start;
  
  ngOnInit(){      
  }
  ngAfterContentInit() {
    switch (this.myselectedtemp) {
    case 'Start':        
      this.tems = this.Start;
    break;    
    case 'Plan':        
      this.tems = this.Plan;
    break;    
    case 'RunNodeJS':    
    this.tems = this.RunNodeJS;
    break;    
    case 'RunAngular':    
    this.tems = this.RunAngular;
    break;    
    case 'Next':    
    this.tems = this.Next;
    break;   
    
    }
  }
}
