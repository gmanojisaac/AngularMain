---

## 1. Setup Windows Environment

# Using 64bit Windows OS

# Open powershell in Admin Mode

```typescript
node -v
(out)v16.10.0
```

## Check npm version

# npm version should be compatible with the node

```typescript
npm -v
(out)7.24.0
```

## Check Angular Version vs the required typescript compiler version

# Compiler version is changing fast

| Angular |  Typescript   |
| ------- | :-----------: |
| 13.0    |   4.4 & 4.5   |
| 13.2    |   4.4 & 4.5   |
| 13.3    | 4.4, 4.5, 4.6 |
| 14.1.3  |     4.7.2     |

## update the nodeJS for the required Angular-cli version

# check the latest angular-cli version compatibility

```typescript
ng version
(out)
(out)     _                      _                 ____ _     ___
(out)    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
(out)   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
(out)  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
(out) /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
(out)                |___/
(out)
(out)
(out)Angular CLI: 14.1.3
(out)Node: 16.10.0
(out)Package Manager: npm 7.24.0
(out)OS: win32 x64
(out)
(out)Angular: 14.1.3
(out)... animations, cli, common, compiler, compiler-cli, core, forms
(out)... platform-browser, platform-browser-dynamic, router
(out)
(out)Package                         Version
(out)---------------------------------------------------------
(out)@angular-devkit/architect       0.1401.3
(out)@angular-devkit/build-angular   14.1.3
(out)@angular-devkit/core            14.1.3
(out)@angular-devkit/schematics      14.1.3
(out)@angular/cdk                    14.2.0
(out)@angular/flex-layout            14.0.0-beta.40
(out)@angular/material               14.2.0
(out)@schematics/angular             14.1.3
(out)rxjs                            7.5.6
(out)typescript                      4.7.4

```

## Download NodeJs for the required OS - mine is 64bit Windows OS

# Check the minimum supported nodeJs and npm version

# https://nodejs.org/en/ - open command prompt, type winver / wmic os get osarchitecture

```typescript
wmic os get osarchitecture
(out)OSArchitecture
(out)64-bit
```

## To check the supported nodeJs version for the installed angular

Goto https://unpkg.com/browse/@angular/core@14.1.3/package.json

```typescript
(out)"engines": {
(out)  "node": "^14.15.0 || >=16.10.0"
(out)  },
```

## To Update the latest angular-cli, prepare the npm Environment, Restart the laptop

Open Explorer and type %APPDATA% and go to that location

```powershell
npm uninstall -g @angular/cli
cd  C:\Users\gmano\AppData\Roaming
npm install -g rimraf
rimraf -rf ./npm-cache/
npm cache clean --force
npm cache verify
shutdown -r
```

## 2. Run Local Hello World Angular

# open the powershell in Admin Mode-Create new Angular Project and execute in Laptop

```powershell
npm install -g @angular/cli@latest
ng version
ng new AngularStarter
Select y for Angular Routing
Select scss for styling
cd AngularStarter
ng build , y for analytics
ng serve
Go to browser and open link => http://localhost:4200/
```

# Modify the budgets in angular.json

```typescript
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "2mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2mb",
      "maximumError": "2mb"
    }
  ],
```

## 3.Add Shared Module

# Execute Angular cli command for creating the shared module

```powershell
(out) ng g module app-shared
```

# Modify the appSharedModule and add exports

```typescript
(out)import { NgModule } from '@angular/core';
(out)import { CommonModule } from '@angular/common';
(out)@NgModule({
(out)   declarations: [],
(out)   exports: [
(out)       CommonModule
(out)            ]
(out)
(out)   })
(out)export class AppSharedModule { }
```

# Add AppSharedModule in main app module

```typescript
(out) import { AppSharedModule } from './app-shared/app-shared.module';
(out) ...
(out)imports: [
(out) AppSharedModule,
```

# Warning: initial exceeded maximum budget. Solved by changing the budget

Angular.json-> modify to 2mb

```typescript
(out)
(out) "budgets": [
(out)                {
(out)                  "type": "initial",
(out)                  "maximumWarning": "2mb",
(out)                  "maximumError": "2mb"
(out)                },
(out)                {
(out)                  "type": "anyComponentStyle",
(out)                  "maximumWarning": "2mb",
(out)                  "maximumError": "2mb"
(out)                }
(out)            ],

```

## 4.Add Material Module inside app-shared module

# Execute Angular cli command for creating the shared module

```powershell
(out) ng g m material --module=app-shared
```

# Add MaterialModule in main app-shared module both import and export

```typescript
(out) import { MaterialModule } from '../material/material.module';
(out) ...
(out)exports: [
(out)MaterialModule,
```

# Add Material using npm and give options

```powershell
ng add @angular/material
(out) Choose a prebuilt theme name, or "custom" for a custom theme: Deep Purple/Amber
(out) Y- GLobal Typogrgaphy styles
(out) y-BrowserAnimations
```

# Import all the Modules and export in Material Module

```typescript
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  exports: [
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ]
})
export class MaterialModule { }
```

# Add a Slider in app.component.html

```typescript
(out) <mat-slider min="1" max="100" step="1" value="50"></mat-slider>
```

## 5. Add FlexLayout

# In app-shared Module

```typescript
(out) import { FlexLayoutModule } from '@angular/flex-layout';
(out)  , exports: [
(out)    FlexLayoutModule,

```

# Add FlexLayout using npm

```powershell
npm i -s @angular/flex-layout
```

# Flex Align the mat-slider in app.component.html

```typescript
(out) <div fxLayout="column" fxLayoutAlign="space-between">
(out)    <mat-slider min="1" max="100" step="1" value="50"></mat-slider>
(out)    <mat-slider min="1" max="100" step="1" value="50"></mat-slider>
(out)  </div>
```

## 6. Add LazyLoaded Feature module/

# Also add a Service / component inside a module

```powershell
ng generate module beforeLogin --route beforelogin --module app.module
```

# Add a service

```powershell
ng generate service service/userdata
```

# Add Feature Module

```powershell
ng g m beforeLogin
```

# Add a component inside a module

```powershell
ng g component new-module/new-component
```

# Add the sharedModule in Feature Module

```typescript
(out)import { AppSharedModule } from '../app-shared/app-shared.module';
(out) , imports: [
(out)   AppSharedModule ,
```

# Modify the app.routing.module

```typescript
(out)const routes: Routes = [
(out)  { path: '', redirectTo: 'beforelogin', pathMatch: 'full' },
(out){ path: 'beforelogin', loadChildren: () => import('./before-login/before-login.module').then(m => m.BeforeLoginModule) }];
```

# Add in app.component.html:

```typescript
(out)  <router-outlet></router-outlet>
```

## 7. Add Reactive Forms Module in app-shared module

```typescript
(out)import { FormsModule, ReactiveFormsModule } from '@angular/forms';
(out), exports: [
(out)FormsModule, ReactiveFormsModule
```

# Add in featurecomponent.html

```typescript
(out)<div class="container" fxLayoutAlign="center center">
(out)    <div class="row">
(out)      <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
(out)        <form [formGroup]="signupForm" (ngSubmit) = "onSubmit()">
(out)          <div formGroupName = "userData">
(out)            <div class="form-group">
(out)            <label for="username">Username</label>
(out)            <input
(out)              type="text"
(out)              id="username"
(out)              formControlName="username"
(out)              class="form-control">
(out)              <span *ngIf = "!signupForm.get('userData.username')?.valid && signupForm.get('userData.username')?.touched" class="help-block" (out)style="color: red !important;">Please Enter A Vlid UserName!!!</span>
(out)          </div>
(out)          <div class="form-group">
(out)            <label for="email">email</label>
(out)            <input
(out)              type="text"
(out)              id="email"
(out)              formControlName="email"
(out)              class="form-control">
(out)            <span *ngIf = "!signupForm.get('userData.email')?.valid && signupForm.get('userData.email')?.touched" class="help-block"
(out)style="color: red !important;">Please Enter A Vlid Email-Id!!!</span>
(out)          </div>
(out)          </div>
(out)          <button class="btn btn-primary" type="submit">Submit</button>
(out)        </form>
(out)        <mat-slider min="1" max="100" step="1" value="50"></mat-slider>
(out)        {{signupForm.value | json}}
(out)      </div>
(out)    </div>
(out)  </div>
```

# Add in featurecomponent.ts

```typescript
(out)import { FormGroup, FormControl, Validators} from '@angular/forms';
(out)
(out)... implements OnInit {
(out)  signupForm!: FormGroup;
(out)   ngOnInit(): void {
(out) this.signupForm = new FormGroup ({
(out)       userData: new FormGroup ({
(out)         'username': new FormControl('Pavan Nagadiya', Validators.required),
(out)       'email': new FormControl('nagadiyap@gmail.com', [Validators.required, Validators.email]),
(out)       })
(out)})
(out)   }
(out)   onSubmit() {
(out)console.log(this.signupForm);
(out)   }
(out)}
(out)
```

## 8.Github-pages hosting npm install

```typescript
 ng add angular-cli-ghpages
```

## 9. Prepare Stackblitz Environment

# Add file .stackblitzrc in project folder, push master brnnch to origin repo

```typescript
(out)  {"installDependencies":true,"startCommand":"turbo run start","env":{"ENABLE_CJS_IMPORTS":true}}
```

## 10.Github-pages hosting

```typescript
  git add .
  git commit -am “Setup Github gh-pages and Stackblitz”
  git push -u origin master

  ng deploy --base-href=/AngularComp/
```

## 11. Steps to load the code in stackblitz and load static files from github.

# open the Browser Create a new nodeJs project in https://stackblitz.com/ after creating an account

# Create a new NodeJs project and add the repo with master branch

![alt text](../assets/stackblitz.png 'Add repo')

# Load the master branch and install and serve

![alt text](../assets/stackblitz-start.png 'Add repo')

# Open the browser and the run the application from the cloud

![alt text](../assets/stackblitz-served.png 'Add repo')
