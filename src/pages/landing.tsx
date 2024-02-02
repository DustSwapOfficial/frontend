// import axios from "axios";
// import xstore from "../components/xstore";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ethers } from "ethers";

const Landing = () => {
  // useEffect(() => {
  //   const urlSearchParams = new URLSearchParams(window.location.search);
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   // console.error("params -> ", params);
  //   if (params.ref || params.reference) {
  //     let addr = params.ref || params.reference;
  //     // console.error("ref addr -> ", addr);
  //     try {
  //       addr = ethers.utils.getAddress(addr);
  //       setCookie("refAddress", addr, 365);
  //     } catch (e) {
  //       console.error("ethers.utils.getAddress(addr) -> ", e);
  //     }
  //   }
  // }, []);

  // const setCookie = (cname: any, cvalue: any, exdays: any) => {
  //   const d = new Date();
  //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  //   let expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // };

  return (
    <>
      <div
        className="bg-main1 bg-no-repeat bg-contain lg:bg-[center_top_100px] md:bg-[center_top_50px] w-full xl:pt-[262px] 
      md:pt-[200px] pt-[150px] xl:pb-[390px] md:pb-[168px] pb-[100px]"
      >
        <div className="text-center">
          <h1 className="mb-7 font-fontHeading lg:max-w-[1020px] mx-auto">
            Seamless and Productive Trading on{" "}
            <span className="text-gradient">Linea</span>
          </h1>
          <p className="lg:text-2xl md:text-xl text-white mb-7 lg:max-w-[810px] mx-auto">
            <span className="text-primary">Dust Swap</span> enables widespread
            access to user-friendly and affordable DeFi, backed by robust
            Ethereum security amplified by zero-knowledge technology.
          </p>
          <Link to={"/trade"} className="mx-auto min-w-[156px] btn inline-flex">
            <span className="mr-auto">Explore</span>
            <i className="lineax-line-right"></i>
          </Link>
        </div>
      </div>
      <div className="lg:pb-[88px] pb-10">
        <div className="xl:max-w-[1060px] mx-auto text-center">
          <p className="mb-7 text-white">Your DeFi Hub on Linea </p>
          <h2 className="mb-7 font-fontHeading">
            Trade with <span className="text-gradient">Superpowers</span>
          </h2>
          <div className="md:flex md:-mx-2.5">
            <div className="flex-1 md:px-2.5 mb-[30px] md:mb-0 basis-full">
              <div className="rounded-[24px] py-7 px-2.5 bg-ser text-center text-white h-full">
                <i className="lineax-security text-[40px] mx-auto pb-4 inline-block"></i>
                <h3 className="mb-4 text-white">Full Security</h3>
                <p className="max-w-[285px] mx-auto md:text-[18px]">
                  Stay the same security as Linea mainnet.
                </p>
              </div>
            </div>
            <div className="flex-1 md:px-2.5 mb-[30px] md:mb-0 basis-full">
              <div className="rounded-[24px] py-7 px-2.5 bg-ser text-center text-white h-full">
                <i className="lineax-seamless text-[40px] mx-auto pb-4 inline-block"></i>
                <h3 className="mb-4 text-white">Seamless UX</h3>
                <p className="max-w-[285px] mx-auto md:text-[18px]">
                  Enjoy up to 100x scaling with lower gas costs.
                </p>
              </div>
            </div>
            <div className="flex-1 md:px-2.5 basis-full">
              <div className="rounded-[24px] py-7 px-2.5 bg-ser text-center text-white h-full">
                <i className="lineax-efficient text-[40px] mx-auto pb-4 inline-block"></i>
                <h3 className="mb-4 text-white">Efficient Trades</h3>
                <p className="max-w-[285px] mx-auto md:text-[18px]">
                  Next generation multi-pool enables higher capital efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-main2 bg-no-repeat bg-contain bg-center">
        <img className="mx-auto pb-[44px]" src="/images/image-1.png" alt="" />
        <div className="lg:pb-[200px] pb-[120px]">
          <div className="text-center">
            <p className="mb-7 text-white">Your DeFi Hub on Linea </p>
            <h2 className="mb-7 font-fontHeading">
              <span className="text-gradient">Community</span> Ownership
            </h2>
            <p className="mb-7 lg:text-[20px] md:max-w-[594px] mx-auto">
              Dust Swap is strong community-driven and designed to be owned by
              the community.
            </p>
          </div>
        </div>
      </div>
      <img
        className="mx-auto pb-[75px] lg:mt-[-50px]"
        src="/images/image-2.png"
        alt=""
      />
    </>
  );
};

export default Landing;
