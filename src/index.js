import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import App2 from './App2';
import App3 from './App3';

import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css'


import { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';


function MBK() {

  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
  <React.StrictMode>

    <div>
      <Accordion flush open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Mitglieder</AccordionHeader>
          <AccordionBody accordionId="1">
		<App />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Beiträge</AccordionHeader>
          <AccordionBody accordionId="2">
		<App2 />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">Kommentare</AccordionHeader>
          <AccordionBody accordionId="3">
		<App3 />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>

  </React.StrictMode>
  );
}








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MBK />);

/*
  <React.StrictMode>

    <App />
    <App />

  </React.StrictMode>

);
*/



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
