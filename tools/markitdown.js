const Markdown = require('markdown-it');
const markdownItMermaid = require("markdown-it-mermaid-plugin");


{/* 
// write this to html
<script src="https://unpkg.com/mermaid@8.9.2/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({
    startOnLoad: false,
    theme: 'forest',
    // themeCSS: '.node rect { fill: red; }',
    logLevel: 3,
    securityLevel: 'loose',
    flowchart: { curve: 'basis' },
    gantt: { axisFormat: '%m/%d/%Y' },
    sequence: { actorMargin: 50 },
    // sequenceDiagram: { actorMargin: 300 } // deprecated
  });
</script> 
*/}

function CustomMarkdownParser() {
    this.markdownParser = new Markdown({
        breaks     : false,
        html       : true,
        linkify    : true,
        typographer: false
    });
    this.markdownParser.use(markdownItMermaid, { 
      startOnLoad: false,
      securityLevel: true,
      theme: "default",
      flowchart:{
        htmlLabels: false,
        useMaxWidth: true,
      } });
}

CustomMarkdownParser.prototype.render = function(text) {
    return this.markdownParser.render(text);
    // return markdownItMermaidPro(text);
};

module.exports = CustomMarkdownParser;
