import React from 'react';
import './page.module.css';
import Navbar from '../../components/navbar'
function AboutPage() {
  
  return ( <>
    <Navbar />
   <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '60px',
        
      }}
    >
        <iframe
        src="https://my.spline.design/untitled-d50f96478b07d194fe10f3ad29f6a27c/"
        style={{
          position: 'fixed',
          top: 0,
          right: '-10%',
          width: '110%',
          height: '100%',
          border: 'none',
          filter: 'blur(2px)',
        }}
      ></iframe>
      <div
        className="w-full h-40vh bg-cover relative"
        style={{
          backgroundImage: "url('/cyber1.png')",
        }}
      >
        <div className="absolute inset-0 bg-opacity-30 bg-blue-100"></div>
      </div>
      <div style={{ display: 'flex', width: '100%', flexGrow: 1 }}>
        <iframe
          src='https://my.spline.design/digitalpass-1c9816f55ce9dca96497dd31c6b865c4/'
          frameBorder='0'
          width='100%'
          height='110%'
          style={{
            position: 'fixed',
            bottom: '-10%',
         
            marginTop: 'auto',
          }}
        ></iframe>
        <iframe
          src='https://my.spline.design/lopolydna-e364107261bedabf8f79dc1a23749677/'
          frameBorder='0'
          width='60%'
          height='100%'
          style={{
            position: 'fixed',
            right: '-10%',
            marginTop: 'auto',
          }}
        ></iframe>
      </div>

      <div style={{ flex: 1 }}></div>
    </div>
    </>
  );
}

export default AboutPage;

