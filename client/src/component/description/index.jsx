import React from 'react';
import "./description.css";

export const Description = () => {
  return (
    <>
    <div className='site'>
        <h1>Site Description</h1>
    </div>
    <div className="section-1">
        <h2>Describe who are the users of your site</h2>
        <p>General account:</p>
        <p>Username: youremail@gmail.com</p>
        <p>Password: *********</p>

    </div>
    <div className="section-2">
        <h2>What is it that you want your users to get out of using the site?</h2>
        <p>The purpose of this website is to for user's experience.</p>
    </div>
    <div className="section-3">
        <h2>What problem are you trying to solve for the users of the site?</h2>
        <p>There are some noticeable UI/UX error in this website.</p>
    </div>
    <div className="section-4">
        <h2>What are the actions that you want the users to take once they have used your site?</h2>
        <p>All users welcome to engage this website and provide any feedback or report any issues.</p>
    </div>
    </>
    )
}
