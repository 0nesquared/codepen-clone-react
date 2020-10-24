import React, { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/Editor";

function App() {
  // states to store the user-entered codes in the editors, and the srcDoc for the iframe
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  /* Any time our code changes, we want to update our srcDoc after a small delay (say 1 sec)
     so that the effect is that whenever we are done typing or takig a small pause, only then 
     does the srcDoc update, and cause the iframe to render the updated code */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
                  <body>${html}</body>
                  <style>${css}</style>
                  <script>${js}</script>
                </html>`);
    }, 1000);
    /* the timeout cleanup is necessary so that whenever the code changes, we don't end up 
    creating a new timeout function again without cleaning the old one */
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      {/* The editor region */}
      <div className="panel top-panel">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      {/* The preview region, that would render our source-doc defined above */}
      <div className="panel">
        <iframe
          title="output"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
