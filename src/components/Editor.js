import React, { useState } from "react";
import "./Editor.css";
/* importing the necessary css for codemirror and its material theme */
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
/* importing language modes for codemirror */
import "codemirror/mode/xml/xml"; // HTML
import "codemirror/mode/css/css"; // CSS
import "codemirror/mode/javascript/javascript"; // Javascript
/* importing the editor */
import { Controlled as CodeMirror } from "react-codemirror2";
/* importing icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

function Editor(props) {
  const { language, displayName, value, onChange } = props;

  // state to control collapsed/open editor
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className={`editor ${open ? "" : "collapsed"}`}>
      <div className="editor__titleBar">
        {displayName}
        <button
          type="button"
          className="editor__button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>

      <CodeMirror
        className="editor__codeMirror"
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "material",
        }}
      />
    </div>
  );
}

export default Editor;
