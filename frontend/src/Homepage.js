import React, {useState} from "react";
import './Homepage.css';

export default function Homepage(){
    return(
       <section class="header">
         <nav>
            <div class="navigation">
                <ul>
                    <li><a href="">About</a></li>
                    <li><a href="SLogin.js">Student</a></li>
                    <li><a href="TLogin.js">Teachear</a></li>
                    <li><a href="">Help</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
         </nav>
         <div className="text-box">
            <h1><span>  Face  </span>
            <span>  Authentication </span>
            <span>   Portal   </span></h1>
            <p> AI-powered face recognition system for secure,
                accurate and real-time student attendance tracking.   </p>
         </div>
       </section>

    );

}