import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { sql } from "@codemirror/lang-sql";
import { python } from "@codemirror/lang-python";
import "./CodingEditor.css";
const languageOptions = [
  { id: 63, name: "JavaScript", ext: javascript() },
  { id: 62, name: "Java", ext: java() },
  { id: 54, name: "C++", ext: cpp() },
  { id: 82, name: "SQL", ext: sql() },
  { id: 71, name: "Python", ext: python() },
];

const CodingEditor = ({
  language: defaultLanguage = "JavaScript",
  onCodeChange,
}) => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState(
    languageOptions.find((l) => l.name === defaultLanguage) ||
      languageOptions[0]
  );

  const [output, setOutput] = useState("");

  useEffect(() => {
    onCodeChange && onCodeChange(code); // Send initial code to parent
  }, []);

  const runCode = async () => {
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: language.id,
        },
        {
          params: { base64_encoded: "false", wait: "true" },
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "278194f75cmsh99ea37f9c6ab420p1fb848jsn547333825ac9",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      if (response.data.stdout) setOutput(response.data.stdout);
      else if (response.data.stderr)
        setOutput("Error: " + response.data.stderr);
      else setOutput("Something went wrong.");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ marginTop: "10px" }} className="coding-editor-container">
      <select
        value={language.name}
        onChange={(e) =>
          setLanguage(languageOptions.find((l) => l.name === e.target.value))
        }
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        {languageOptions.map((lang) => (
          <option key={lang.id} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>

      <CodeMirror
        value={code}
        height="300px"
        extensions={[language.ext]}
        onChange={(value) => {
          setCode(value);
          onCodeChange && onCodeChange(value); // Send code back to parent
        }}
      />

      <button
        onClick={runCode}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        ▶ Run
      </button>

      <h4>Output:</h4>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "100px",
        }}
      >
        {output}
      </pre>
    </div>
  );
};

export default CodingEditor;
