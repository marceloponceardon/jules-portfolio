import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import { Contact, CV, Gallery, Home, NoPage } from './pages';
import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'production') {
	console.log = () => {}
	console.error = () => {}
	console.debug = () => {}
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
					<Route index element={<Home />} />
					<Route path="selected-work" element={<Gallery />} />
					<Route path="cv" element={<CV />} />
					<Route path="contact" element={<Contact />} />
					<Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log); 
