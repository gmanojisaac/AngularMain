## Add ngx-markdown

# mermaid, highlight, linenumbers, prismjs should work

```powershell
npm install ngx-markdown autoprefixer@10.4.5 --save
npm install @types/clipboard @types/marked @types/mermaid @types/prismjs --save-dev
```

# Add node modules in angular.io scripts and styles

```typescript
(out)    "styles": [
(out)        "src/styles.scss",
(out)        "node_modules/prismjs/themes/prism-okaidia.css",
(out)        "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css",
(out)        "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css",
(out)        "node_modules/prismjs/plugins/command-line/prism-command-line.css"
(out)    ],
(out)    "scripts": [
(out)        "node_modules/marked/marked.min.js",
(out)        "node_modules/prismjs/prism.js",
(out)        "node_modules/prismjs/components/prism-typescript.min.js",
(out)        "node_modules/prismjs/components/prism-mermaid.min.js",
(out)        "node_modules/prismjs/components/prism-powershell.min.js",
(out)        "node_modules/prismjs/components/prism-css.min.js",
(out)        "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
(out)        "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js",
(out)        "node_modules/prismjs/plugins/command-line/prism-command-line.js",
(out)        "node_modules/mermaid/dist/mermaid.min.js",
(out)        "node_modules/clipboard/dist/clipboard.min.js",
(out)        "node_modules/emoji-toolkit/lib/js/joypixels.min.js"
(out)    ]
```

# Add in app.module

```typescript
(out) import { MarkdownModule, MarkdownService } from 'ngx-markdown';
(out) import { HttpClient } from '@angular/common/http';
(out) import { HttpClientModule } from '@angular/common/http';
(out)
(out) imports:[
(out)     ...
(out)     HttpClientModule,
(out)     MarkdownModule.forRoot({ loader: HttpClient }),
(out)     ],
(out)   providers: [MarkdownService],
```

# Add in component.html

```typescript
(out)  <div class="markdown">
(out)    <markdown mermaid [src]="'../../assets/Testing.md'"></markdown>
(out)    </div>
```

# Create a new file Testing.md in assets folder

```typescript
(out)<pre class="mermaid">
(out)journey
(out)  title My Career Graph
(out)  section Before Tech
(out)  Secondary- 88%: 1: Manoj
(out)  Higher Secondary-89%: 2: Manoj
(out)  College-UG- 67%: 3: Manoj
(out)  College-PG- 74%: 4: Manoj
(out)  section After Tech
(out)  Lecturer- 1Y: 5: Manoj
(out)  Telecom Testing- 14Y: 6: Manoj
(out)  Development- 7Y: 7: Manoj
(out)
(out)</pre>
```

### Markdown working from html

# use single back slash \ for escaping comma , angle brackets etc

```typescript
(out)  <markdown ngPreserveWhitespaces clipboard>
(out)  ### Lists
(out)    1. Ordered list
(out)    2. Another bullet point
(out)      - Unordered list
(out)      - Another unordered bullet
(out)  {{ '#working' | language: 'typescript' }}
(out)  </markdown>
```

---

### Markdown showing command line

# Output showing the prompt

```typescript
  In html
  <markdown [src]="'../../assets/markdownnofilter.md'"
     commandLine
      [prompt]="'PS C:\Users\Manoj>'"
      [filterOutput]="'(out)'">
  </markdown>

  In the markdownnofilter.md
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
    title = 'AngularComp';
  }
```

# filterOutput will not show the prompt

```typescript
  In html
  <markdown [src]="'../../assets/markdown.md'"
  commandLine
  [prompt]="'PS C:\Users\Manoj>'"
  [filterOutput]="'(out)'">
  </markdown>

  In the markdown.md
  (out)  import { Component } from '@angular/core';
  (out)
  (out)    @Component({
  (out)      selector: 'app-root',
  (out)      templateUrl: './app.component.html',
  (out)      styleUrls: ['./app.component.scss']
  (out)    })
  (out)    export class AppComponent {
  (out)      title = 'AngularComp';
  (out)    }
  (out)
```

### Markdown working from template

```typescript
(out)  <markdown  ngPreserveWhitespaces clipboard>
(out)  ## Markdown __works__!
(out)  ---
(out)  </markdown>
```

---

### Markdown working from component

```typescript
(out) In html
(out)  <markdown ngPreserveWhitespaces clipboard>
(out)  {{someothervar}}
(out)  {{ somevar | language: 'typescript' }}
(out)  </markdown>
(out)
(out)  <div [innerHTML]="markdowncode | markdown"></div>

(out) In Component
(out)
(out)  someothervar=`
(out)  ## Markdown from component no code __works__!
(out)  ---
(out)  `;
(out)  somevar=`
(out)  ## Markdown from component with typescript __works__!
(out)  ---
(out)  `;
(out)  markdowncode=`
(out)  ## Markdown from component __works__!
(out)  ---
(out)  `;

```

# somevar should be having the markdown to run from the component

---

### Markdown working from src

```typescript
(out)    <markdown [src]="'../../assets/markdwonsrc.md'"></markdown>
```

## .md file will not contain => backslash

# Git commands for Creating the github pages

```typescript
git remote remove origin
git remote add origin https://github.com/gmanojisaac/AngularMarkdown.git
git remote -v show
git status
git log --oneline
git add .
git commit -am “Markdown working”
git push -u origin Markdown
ng deploy --base-href=/AngularMarkdown/
```

---
