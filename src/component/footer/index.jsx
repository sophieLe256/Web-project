import React from "react";
import './footer.css';
import {BiLogoFacebookSquare} from 'react-icons/bi';
import {BsYoutube} from 'react-icons/bs';
import {AiFillInstagram} from 'react-icons/ai';
import {BiLogoTiktok} from 'react-icons/bi';

export const Footer = () => {
  return (
    <>
    <div className="footer">

        <h2 class="name">"BAD RABBITS DIGITAL RETAIL STORE"</h2>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2 order-lg-3">
              <div class="footer-block footer-dropdown">
                <div class="footer-title d-xl-none d-lg-none">
                  <h4>MENU
                    <svg x="0" y="0" viewBox="0 0 490.677 490.677" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M489.272,37.339c-1.92-3.307-5.44-5.333-9.259-5.333H10.68c-3.819,0-7.339,2.027-9.259,5.333    c-1.899,3.307-1.899,7.36,0.021,10.667l234.667,405.333c1.899,3.307,5.419,5.333,9.237,5.333s7.339-2.027,9.237-5.333    L489.251,48.005C491.149,44.72,491.149,40.645,489.272,37.339z" fill="#000000" data-original="#000000" class=""></path></g></g></g></svg>
                  </h4>
                </div>
                <div class="footer-content">
                  <ul class="footer-menu">
                    <li><a href="/pages/chinh-sach-doi-tra" title="RETURN POLICY">RETURN POLICY</a></li>
                    
                    <li><a href="/pages/lien-he" title="CONTACT INFO">CONTACT INFO</a></li>
                    
                    <li><a href="/pages/chinh-sach-bao-mat-thong-tin" title="PRIVACY POLICY">PRIVACY POLICY</a></li>
                    
                    <li><a href="/pages/chinh-sach-bao-mat-thong-tin-thanh-toan" title="PAYMENT INFOMATION PRIVACY POLICY">PAYMENT INFOMATION PRIVACY POLICY</a></li>
                    
                    <li><a href="/pages/dieu-khoan-giao-dich-chung" title="GENERAL TRADING TERM">GENERAL TRADING TERM</a></li>
                    
                    
                  </ul>
                </div>
              </div>
            </div>
              <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 order-lg-1">
              <div class="footer-block">
                <div class="footer-title">
                  <h4>FOLLOW BAD RABBIT CLUB® IN</h4>
                  <div className="contact-icons">
                    <AiFillInstagram></AiFillInstagram>
                    <BiLogoFacebookSquare></BiLogoFacebookSquare>
                    <BiLogoTiktok></BiLogoTiktok>
                    <BsYoutube></BsYoutube>
                  </div>
                </div>
                <div class="footer-content">
                  <ul class="social-list">
                  
                  </ul>
                </div>
              </div>
              <div class="footer-block">
                <div class="footer-title">
                  <h4>REGISTER TO RECIEVE MORE DEAL</h4>
                </div>
                <div class="footer-content">
                  <div class="form_newsletter form_newsletter_customer"> 
                    <form accept-charset="UTF-8" action="/account/contact" class="contact-form" method="post"/>
                      <input name="form_type" type="hidden" value="customer"/>
                      <input name="utf8" type="hidden" value="✓"/>
                    <div class="input-group">
                      <input type="hidden" id="newsletter-tags" name="contact[tags]" value="khách hàng tiềm năng, bản tin"/>     
                      <input required="" type="email" id="newsletter-email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value="" placeholder="Email address" name="contact[email]" aria-label="Email Address"/>
                      <button type="submit" class="button dark">Register</button>
                    </div>
                    <div class="sitebox-recaptcha d-none">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> 
                      and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
                    </div>	
                    <input id="086c52c6d38f44bbb17a5081b8d486c1" name="g-recaptcha-response" type="hidden"/>
                          </div>
                        </div>	
                      </div>
                      <div class="hotline"><b>HOTLINE: <a href="tel:0902638020">0902.638.020</a> - <a href="tel:0931610291">0931.610.291</a>

                    <li className="contact-email">EMAIL: support@doublebadstudio.com</li>
                  </b>
                  </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-lg-2">

            <div class="footer-block">
              <div class="footer-title">
                <h4>STORE BRANCH</h4>
              </div>
              <div class="footer-content">
                <ul class="address-list">
                  <li><b>SAI GON</b></li>
                  <li>1. 93 Rach Bung Binh,Phuong 9, Quan 3</li>
                  <li>2. 117 Tran Dinh Xu, phuong Nguyen Cu Trinh, Quan 1 </li>
                  <li>3. 57 Nguyen Gia Tri phuong 25, quan Binh Thanh</li>
                  <li>4. 26 Ly Tu Trong, Phuong Ben Nghe, Quan 1</li>
                  <li><b>Ha Noi</b></li>
                  <li>5. 21B Pho Lo Duc, Phuong Ngo Thi Nham, Quan Hai Ba Trung, Ha Noi</li>
                  <li><b>CAN THO</b></li>
                  <li>6. 7 Tran Van Hoai, Phuong Xuan Khanh, Quan Ninh Kieu Can Tho</li>
                </ul>

                <p class="copyright"> © 2023 <a href="https://badrabbitclub.vn"> Bad Rabbit Club</a> all right reserved.</p>

              </div>
            </div>
            <div class="logo-bct">
              <a href="/" target="_blank" rel="nofollow noreferrer" aria-label="Logo bộ công thương">
                {/* <img class="image--fade-in lazyloaded" data-src="https://file.hstatic.net/1000351433/file/logo-bct_277d060cdfbb4930a1d2a11adee2ddd7.png" src="https://file.hstatic.net/1000351433/file/logo-bct_277d060cdfbb4930a1d2a11adee2ddd7.png"> */}
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
};
