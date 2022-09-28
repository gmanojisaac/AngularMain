  ## Create a new branch for Storybook design from Angular Env Setup
   ```powershell
    git checkout -b storydesign
  ```

  ## Create a new component
   ```powershell
  ng g c storybookdesign
  ```
  
  ## Create a App-shared module
   ```powershell
    ng g module app-shared
  ```

  ## Create a new MDX Story in src/stories folder
   ```powershell
    storybookdesign.stories.mdx
  ```

  ## Add in App-shared module
   ```powershell
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    @NgModule({
      declarations: [],
      exports: [
          CommonModule,
          FormsModule, ReactiveFormsModule
                ]

      })
    export class AppSharedModule { }
  ```

  ## Use Meta data to give location info
  # Title shows the place where you can find the story and add parameters to modify the view mode
  ```typescript
    import { moduleMetadata } from '@storybook/angular';
    import { Story, Meta, ArgsTable } from '@storybook/addon-docs';
    import { StorybookdesignComponent } from '../app/storybookdesign/storybookdesign.component';
    import { AppSharedModule } from '../app/app-shared/app-shared.module';


    <Meta
    title="YoutubeMaking/StorybookDesign"
    parameters={{
        viewMode: 'docs',
        previewTabs: {
        canvas: { hidden: true },
        },
    }}
  ```

  ## Import Modules for story use
  # Import sharedModule which contains FlexBox, HTTPClient Module for MarkdownModule
  # Component is used in the StorybookdesignComponent
  ```typescript
    decorators={[
    moduleMetadata({
        declarations: [StorybookdesignComponent],
        imports: [AppSharedModule ],
        providers: [],
    }),
    ]}
    />
  ```
  ## PageDesign __works__!

  <pre class="mermaid">
    flowchart TD
      id1([Prepare ngTemplate]) -->  id2([Mmyselectedtemp receive input from story])

      id2([myselectedtemp receive input from story]) -->  id3([Shows the template])

      id3([Shows the template]) -->  id4([use templateOutlet and context])
  </pre>
  
  # In html use the different templates
```typescript
  <ng-template #storydesign >
  </ng-template>
```

  # call the templates using templateOutlet and can pass a context

```typescript
  <ng-container 
  [ngTemplateOutlet]="tems"
  [ngTemplateOutletContext]="myContext"> 
```

  # use the context in html

```typescript  
  <ng-template #storydesign >
  <h1>
      Working
  </h1>>
  </ng-template>
  <ng-template #greet let-person><span>Hello {{person}} </span></ng-template>
  <ng-template #eng let-name><span>Hello {{name}}!</span></ng-template>
  <ng-template #svk let-person="localSk" ><span>Ahoj {{person}}!</span></ng-template>

```

  # use the context in component

```typescript
  @ViewChild('greet', { static: true })
  greet!: TemplateRef<any>;
  @ViewChild('svk', { static: true })
  svk!: TemplateRef<any>;
  @ViewChild('eng', { static: true })
  eng!: TemplateRef<any>;
  @ViewChild('storydesign', { static: true })
  storydesign!: TemplateRef<any>;

  myContext = { $implicit: 'World', localSk: 'Svet' };
  tems: TemplateRef<any> = this.greet;
```

  # use AfterContentInit

```typescript

  import { OnInit, AfterContentInit, ViewChild, TemplateRef, Input, Component } from '@angular/core';

  Component=>  implements OnInit, AfterContentInit {

  @Input()
  myselectedtemp: string = 'greet';

  ngAfterContentInit() {

    switch (this.myselectedtemp) {
      case 'greet':
        this.tems = this.greet;
        break;
      case 'svk':
        this.tems = this.svk;
        break;
      case 'eng':
        this.tems = this.eng;
        break;
      case 'storydesign':
        this.tems = this.storydesign;
        break;
      }
    }

    constructor() { }

    ngOnInit(): void {
    }
  }

```
  # From the story pass the right template name
## Change preview.js to modify the order
# Normally alpabetical order is followed
# If seperate .mdx files are used the preview.js will not control the order

```powershell
<Story name="StorybookDesign">
{{
template: `<app-storybookdesign [myselectedtemp]= "myselectedtemp"></app-storybookdesign>`,
props: {
myselectedtemp : 'storydesign'
},
}}
</Story>
```
# This is the design of the Page
# Storybook mdx feature is used extensively
# The order of the strories can be set in the preview.js -> parameters

```typescript
options: {
    storySort: {
      order: [
       'YoutubeMaking', ['StorybookDesign'], 'Example', ['Page', '*']
       ],
    },
  },
   ...        
 ```

# Git comamnds to push to repo and gh-pages

```typescript
  git remote remove origin
  git remote add origin https://github.com/gmanojisaac/AngularStorybook.git
  git remote -v show
  git add .
  git commit -am “Completed storybook design”
  git push -u origin storydesign
  npm run pre-deploy
  npm run deploy-storybook

 ```

