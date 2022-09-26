<pre class="mermaid">
graph TD
    id1(Start)-->id2(1.Run Angular)
    style id1 fill:lightblue,stroke:#333,stroke-width:4px
    style id2 fill:#f9f,stroke:#333,stroke-width:4px
    id2(1.Run Angular) --> id3(Windows Env)
    
    id2(1.Run Angular) --> id4(Stackblitz NodeJs Env)
    
    id2(1.Run Angular) --> id5(2.Run Angular Storybook)
    
    id5(2.Run Angular Storybook) --> id6(Windows Env)
    style id3 fill:#f9f,stroke:#333,stroke-width:4px
    style id4 fill:#f9f,stroke:#333,stroke-width:4px
    style id5 fill:orange,stroke:#333,stroke-width:4px

    id5(2.Run Angular Storybook) --> id7(Stackblitz NodeJs Env)
    style id6 fill:orange,stroke:#333,stroke-width:4px
    style id7 fill:orange,stroke:#333,stroke-width:4px

    id7(Stackblitz NodeJs Env) --> id8(3.Update the Open PR in stackblitz)

    id8(3.Update the Open PR in stackblitz)-->id9(Stop)
    style id8 fill:yellow,stroke:#333,stroke-width:4px
    style id9 fill:lightblue,stroke:#333,stroke-width:4px
</pre>