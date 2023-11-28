import React from 'react';
import "./about-us.css";

// AboutUs component showcases our web development journey
export const AboutUs = () => {
  return (
    <>
      {/* Main title */}
      <h1 className="about">About Us</h1>
        <img className="image" src="wallpaper.webp" alt="Bad Habbit"></img>
      {/* Section 1: Introducing ourselves */}
      <div className="section-1">
        <h2>Section 1: Who We Are</h2>
        <p>Hello, I'm Sophie, a dedicated and passionate web developer with a strong drive for crafting exceptional digital experiences.</p>
      </div>

      {/* Section 2: Highlighting the Project */}
      <div className="section-2">
        <h2>Section 2: Project Description</h2>
        <p>
          My web development journey culminates in an exciting and comprehensive final project. 
          I've meticulously crafted an innovative e-commerce website, incorporating cutting-edge technologies to provide a seamless and user-friendly online local-brand shopping experience.
        </p>
      </div>

      {/* Section 3: Showcasing the Technologies Used */}
      <div className="section-3">
        <h2>Section 3: Technologies Used</h2>
        <p>
          My website harnesses the power of AWS cloud services, ensuring robust and scalable infrastructure. 
          I've leveraged a powerful combination of React Bootstrap, React Router Dom, and React Icon to craft an appealing and intuitive frontend interface.
        </p>
        <p>
          To efficiently manage and retrieve data, I've integrated MySQL, enabling smooth and secure interactions with the database. 
          On the server-side, I've utilized Node.js, ensuring fast and responsive web performance.
        </p>
        <p>
          User security is paramount, and to protect sensitive data, I've implemented bcrypt, a reliable password hashing mechanism.
        </p>
      </div>

      {/* Section 4: Key Takeaways from the Class */}
      <div className="section-4">
        <h2>Section 4: Key Takeaways</h2>
        <p>
        Throughout this transformative class, my web development journey has been both fulfilling and enlightening. 
        I've immersed myself in mastering the intricacies of PHP and honing my skills in effectively utilizing MySQL for robust database management. 
        Creating sophisticated login pages and seamlessly integrating React with Node.js allowing me to build secure and seamless web applications that cater to users' needs.
        </p>
        <br></br>
        <p>
        Venturing into the realm of frontend development, 
        I've embraced the dynamic world of React and its seamless partnership with Node.js. 
        By leveraging powerful tools like React Bootstrap, React Router Dom, and React Icon, I can create visually captivating and intuitive interfaces that engage users from the very first encounter. 
        Exploring the potential of AWS cloud services has been a game-changer, providing me with scalable and reliable infrastructure to build web applications that can handle any demand while maintaining efficiency.
        </p>
      </div>
    </>
  );
};
