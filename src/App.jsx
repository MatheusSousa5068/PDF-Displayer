import React, { useState } from "react";

import { Worker } from "@react-pdf-viewer/core";

// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import "./App.css";

const App = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState("");

    const allowedFile = ["application/pdf"];

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        console.log(selectedFile.type);

        if (selectedFile) {
            if (allowedFile.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError("");
                    setPdfFile(e.target.result);
                };
            } else {
                setPdfError("Not a valid PDF");

                setPdfFile(null);
            }
        } else {
            alert("Only PDF's are accepted");
        }
    };

    return (
        <div className="container">
            <form>
                <label>
                    <h5>Upload File</h5>
                </label>

                <br />

                <input
                    type="file"
                    name=""
                    id=""
                    className="form-control"
                    onChange={handleFile}
                />

                {pdfError && <span className="text-danger">{pdfError}</span>}
            </form>

            <h5>View</h5>
            <div className="viewer">
                {pdfFile && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={pdfFile}></Viewer>
                    </Worker>
                )}

                {!pdfFile && <>No file has been selected yet</>}
            </div>
        </div>
    );
};

export default App;
