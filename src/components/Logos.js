import React from "react";
import "./Logos.css";

export default function Logos() {
  return (
    <div className="logos">
       <img src={process.env.PUBLIC_URL + "/ee0e326d-4353-4b9e-b9aa-402f71880b4f.png"}alt="Made in India" />
       <img src={process.env.PUBLIC_URL + "/image.png"} alt="ISO Certified" className="large-logo" />
       <img src={process.env.PUBLIC_URL + "/imagecopy.png"} alt="ISO Certified" className="large-logo" />
      
       <img src={process.env.PUBLIC_URL + "/8a98d677-9340-46f5-9ff6-e5f7192d8e87.png"} alt="SME Certified" />
    </div>
  );
} 