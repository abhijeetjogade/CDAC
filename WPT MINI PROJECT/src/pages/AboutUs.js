import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../resources/AboutUs.css'
import aboutUsImage from '../resources/abhijeet.jpg'
import aboutUsImage1 from '../resources/digvijay.png'
import aboutUsImage2 from '../resources/saurabh.png'

const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Add class to body
        document.body.classList.add('body-about-us');
    
        // Remove class from body when component unmounts
        return () => {
          document.body.classList.remove('body-about-us');
        };
      }, []);

      const handleBackClick = () => {
        navigate('/'); // Navigate to home page
    };

    return (
        <>
            <marquee behavior="scroll" direction="left" className='marquee'>
               Contactus <button>Email : cdacmumbai@gmail.com </button> <button>Mobile no. : +91 1234567890 </button>  
            </marquee> 
            <button onClick={handleBackClick}>Back</button>
            <h1 className='head'>Devlopers Team</h1>
            <div className="container">
                <div class="about-us">
                    <div class="profile">
                        <img src={aboutUsImage} alt="" class="profile-photo" />
                        <div class="profile-info">
                            <h2>Abhijeet Jogade</h2>
                            <p>Hello I'M Abhijeet Jogade From CDAC Mumbai</p>
                        </div>
                    </div>
                </div>
                <div class="about-us">
                    <div class="profile">
                        <img src={aboutUsImage1} alt="" class="profile-photo" />
                        <div class="profile-info">
                            <h2>Digvijay Shete</h2>
                            <p>Hello I'M Digvijay Shete From CDAC Mumbai</p>
                        </div>
                    </div>
                </div>
                <div class="about-us">
                    <div class="profile">
                        <img src={aboutUsImage2} alt="" class="profile-photo" />
                        <div class="profile-info">
                            <h2>Saurabh Zambare</h2>
                            <p>Hello I'M Saurabh Zambare From CDAC Mumbai</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
