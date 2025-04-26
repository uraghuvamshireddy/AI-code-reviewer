import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/components/prism-clike";      
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";  
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";
import axios from 'axios'
import Navbar from './Navbar'

const  Dashboard =()=>{

    const [code,setCode] = useState(`function sum(){
      return 1+1}`)
    const [review,setReview] = useState(``)  
    const [language, setLanguage] = useState("javascript");
  
    useEffect(()=>{
      prism.highlightAll()
    },[])
  
    async function reviewCode(){
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`,{code})
      console.log(response.data)
      setReview(response.data)
    }
   
    useEffect(() => {
      const handleSave = async () => {
        const token = localStorage.getItem('token');
        const name = prompt("Enter file name:");
        if (!name) return;
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/code/save-code`,
             { filename:name, code },
             {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Code saved successfully!");
        } catch (err) {
          console.error(err);
          alert("Failed to save code");
        }
      };
    
      document.addEventListener("trigger-save", handleSave);
      return () => document.removeEventListener("trigger-save", handleSave);
    }, [code]);
    
    
  
    return (
      <>
       <div className="dashboard">
        <div className="navbar"><Navbar language={language} setLanguage={setLanguage} /></div>
        <main>
        <div className="left">
          <div className="code">
          <Editor 
          value = {code}
          onValueChange={code => setCode(code)}
          highlight = {code => prism.highlight(code,prism.languages[language],language)}
          padding = {10}
          style = {{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%"
          }}
          />
          </div>
          
          
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown 
            rehypePlugins = {[rehypeHighlight]}
           > {review !== '' ? review : 'Click review'}</Markdown>
        </div>
       </main>
       </div>
      </>
    )
  }
  
  export default Dashboard
  