import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Styles = () => {
  return (
    <>
      <main class="page-rabbit-list-outfit py-5">
        <div id="list-outfit">
          <div class="container">
            <div class="text-under d-flex justify-content-between align-items-center">
              <h2 class="text-effect font-weight-bold h2 text-left">
                <span>CHỌN TRANG PHỤC CỦA BẠN</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50pt"
                  height="50pt"
                  version="1.1"
                  viewBox="0 0 752 752"
                >
                  <g fill="#ecb5ab">
                    <path d="m255.83 209.56 107.45 107.45c3.3555 3.3555 7.8945 5.2305 12.629 5.2305s9.2734-1.875 12.629-5.2305l107.64-107.45c7.0039-7.0039 7.0039-18.352 0-25.355s-18.352-7.0039-25.355 0l-94.816 94.812-94.816-94.816c-7.0039-7.0039-18.352-7.0039-25.355 0-6.9023 7.0078-6.9023 18.352 0.003906 25.359z"></path>
                    <path d="m255.83 460.26 107.45 107.45c3.3555 3.4531 7.8945 5.3281 12.727 5.3281 4.8359 0 9.2734-1.875 12.629-5.2305l107.45-107.45c3.3555-3.3555 5.2305-7.8945 5.2305-12.629 0-4.8359-1.875-9.2734-5.2305-12.629-6.8086-6.8086-18.648-6.8086-25.355 0l-94.723 94.621-94.816-94.816c-3.3555-3.3555-7.8945-5.2305-12.629-5.2305-4.7344 0-9.2734 1.875-12.629 5.2305-3.3555 3.3555-5.2305 7.8945-5.2305 12.629-0.09375 4.8359 1.7812 9.375 5.1367 12.727z"></path>
                    <path d="m255.83 334.96 107.45 107.45c3.3555 3.3555 7.8945 5.2305 12.727 5.2305 4.8359 0 9.2734-1.875 12.629-5.2305l107.45-107.45c7.0039-7.0039 7.0039-18.352 0-25.355-7.0039-7.0039-18.352-7.0039-25.355 0l-94.723 94.816-94.816-94.816c-7.0039-7.0039-18.352-7.0039-25.355 0-6.9023 7.0039-6.9023 18.352 0.003906 25.355z"></path>
                  </g>
                </svg>
              </h2>
              <span class="h2 font-weight-bold text-right">
                MAKE YOUR STYLE
              </span>
            </div>
          </div>
          <div className="container">
            <div className="row flex-wrap">
              {/* Outfit Item 1 */}
              <div className="col-6 col-sm-6 col-md-4">
                <div className="outfit-item">
                  <a
                    href="/collections/rabbit-outfit-1skull-mask?id=1"
                    title="OUTFIT RB #1"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_grande.jpg"
                        data-srcSet="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_grande.jpg"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_master.jpg"
                        data-srcSet="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_master.jpg"
                      />
                      <img
                        className="lazyloaded"
                        alt="OUTFIT RB #1"
                        src="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_master.jpg"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_1_88f43ef571cb4bb2a552771350c1ce48_master.jpg"
                      />
                    </picture>
                  </a>
                </div>
              </div>
              {/* Outfit Item 2 */}
              <div className="col-6 col-sm-6 col-md-4">
                <div className="outfit-item">
                  <a
                    href="/collections/outfit-9-black-player-tee?id=2"
                    title="OUTFIT RB #9"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_grande.png"
                        data-srcSet="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_master.png"
                        data-srcSet="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_master.png"
                      />
                      <img
                        className="lazyloaded"
                        alt="OUTFIT RB #9"
                        src="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_2_378fae121526444d917dd62c104347c2_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 3 */}
              <div className="col-6 col-sm-6 col-md-4">
                <div className="outfit-item">
                  <a
                    href="/collections/outfit-9-black-player-tee?id=2"
                    title="OUTFIT RB #8"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #8"
                        src="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_3_36f0fd72ac7d41b1bbc96fa8d868e08d_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 4 */}
              <div className="col-6 col-sm-6 col-md-4">
                <div className="outfit-item">
                  <a
                    href="/collections/outfit-9-black-player-tee?id=2"
                    title="OUTFIT RB #7"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #5"
                        src="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_6_b6a3f2d62f6344be83ef47d791c6059c_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 5 */}
              <div class="col-6 col-sm-6 col-md-4">
                <div class="outfit-item">
                  <a
                    href="/collections/outfit-6-smiley-rabbit-hoodie?id=5"
                    title="OUTFIT RB #6"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #6"
                        src="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_5_8a9564b48c044a728eeb1f28da2e9b93_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 6 */}
              <div class="col-6 col-sm-6 col-md-4">
                <div class="outfit-item">
                  <a
                    href="/collections/outfit-7-team-hoodie?id=6"
                    title="OUTFIT RB #7"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #7"
                        src="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_4_49ee20525f06496abf1a3087f5142ec4_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 7 */}
              <div class="col-6 col-sm-6 col-md-4">
                <div class="outfit-item">
                  <a
                    href="/collections/outfit-4-purple-cartoon-cardigan?id=7"
                    title="OUTFIT RB #4"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #4"
                        src="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_7_9bfbd17b314e43538b8d66303127d503_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 8 */}
              <div class="col-6 col-sm-6 col-md-4">
                <div class="outfit-item">
                  <a
                    href="/collections/outfit-3-rabbit-bts-cardigan?id=8"
                    title="OUTFIT RB #3"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #3"
                        src="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_8_4b5d889dc57844a3827ef6e9c43cd2df_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>

              {/* Outfit Item 9 */}
              <div class="col-6 col-sm-6 col-md-4">
                <div class="outfit-item">
                  <a
                    href="/collections/outfit-2-rabbit-n-friend-polo?id=9"
                    title="OUTFIT RB #2"
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_grande.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_grande.png"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcset="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_master.png"
                        data-srcset="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_master.png"
                      />
                      <img
                        class=" lazyloaded"
                        alt="OUTFIT RB #2"
                        src="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_master.png"
                        data-src="//file.hstatic.net/1000351433/collection/artboard_9_243286ed53954d858f99e4add9a1f7d9_master.png"
                      />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
