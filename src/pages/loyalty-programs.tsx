import { useState } from "react"
const Loyalty = () => {
  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <div className="md:flex md:-mx-2.5 mb-5">
          <div className="md:flex-[0_0_70%] md:px-2.5 basis-full mb-5 md:mb-0">
            <div className="rounded-xl bg-popup lg:px-8 px-4 py-4 h-full">
              <div className="flex items-center mb-4">
                <i className="lineax-ellipse text-[6px] mr-2 text-color"></i>
                <span className="text-[20px] font-medium mr-6">Loyalty Program</span>
                <button className="btn-outline !py-2.5 !px-4 h-[33px] mx-2 sm:!text-[16px] !text-[14px]">Testnet</button>
              </div>
              <p className="lg:max-w-[80%] mb-4">Maximize your profits. Start trading on Dust Swap to earn the loyalty tokens.
                The xSPICE can be converted to veSPICE tokens periodically. </p>
              <button className="btn-outline !p-2.5 h-[33px] sm:!text-[16px] !text-[16px] !font-medium">
                Lotalty Program
                <i className="lineax-arrow-up-right text-[14px] ml-3"></i></button>
            </div>
          </div>
          <div className="md:flex-[0_0_30%] md:px-2.5 basis-full">
            <div className="rounded-xl bg-popup lg:px-8 px-4 py-4 h-full flex flex-col">
              <span className="text-[20px] font-medium mr-6 mb-4">xSPICE</span>
              <div className="mt-auto">
                <p className="inline-block text-gradient text-[24px] font-semibold mb-1">1,189,624.5</p>
                <p className="text-[14px]">Cumulative Supply</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-popup lg:p-8 p-4 h-full md:flex mb-5">
          <div className="flex-1 md:pr-8 md:border-r md:border-border mb-10 md:mb-0">
            <p className="text-[18px] mb-6 font-medium">Your Loyalty Stats</p>
            <p className="text-[14px] mb-1">Lifetime</p>
            <p className="text-[18px] mb-6 font-medium text-white">0 xSPICE</p>
            <p className="text-[14px] mb-1">Current epoch</p>
            <p className="text-[18px] font-medium text-white">0 xSPICE</p>
          </div>
          <div className="flex-1 md:pl-8">
            <p className="text-[18px] mb-6 font-medium inline-block text-gradient">How to earn xSPICE</p>
            <p className="mb-4">You'll earn xSPICE rewards for eligible pool trades based on your trading volume.</p>
            <p className="text-primary text-[14px]">The Genesis Epoch has been concluded and xSPICE minting is paused. Please stay tuned for more updates!</p>
          </div>
        </div>
        <div className="md:flex md:-mx-2.5 pb-[60px]">
          <div className="md:flex-1 md:px-2.5 basis-full mb-5 md:mb-0">
            <div className="rounded-xl bg-popup lg:px-8 px-4 py-4 h-full">
              <p className="text-[18px] font-medium inline-block text-gradient mr-4">Epoch</p>
              <span className="text-[24px] font-semibold inline-block text-gradient">1</span>
              <div className="mt-6 md:flex mb-6 pb-6 border-b border-border">
                <div className="flex-1 md:pr-2">
                  <p className="text-[14px] mb-1">Epoch Supply</p>
                  <p className="text-[18px] font-medium text-white inline-block mr-4">900,000</p>
                  <p className="text-[18px] font-medium inline-block">veSPICE</p>
                </div>
                <div className="flex-1 md:pl-2">
                  <p className="text-[14px] mb-1">Rewards</p>
                  <p className="text-[18px] font-medium text-white inline-block mr-4">1,189,624.5</p>
                  <p className="text-[18px] font-medium inline-block">veSPICE</p>
                </div>
              </div>
              <p className="text-[14px]">The loyalty program is currently in epoch 1. veSPICE rewards will be supplied with every new epoch.</p>
            </div>
          </div>
          <div className="md:flex-1 md:px-2.5 basis-full mb-5 md:mb-0">
            <div className="rounded-xl bg-popup lg:px-8 px-4 py-4 h-full">
              <span className="text-[24px] font-semibold inline-block text-white mr-4">1</span>
              <p className="text-[18px] font-medium inline-block">veSPICE</p>
              <div className="mt-6 mb-6 pb-6 border-b border-border">
                <div className="flex items-center mb-4">
                  <span className="pr-4">Estimated Claimable Rewards</span>
                  <i className="lineax-ellipse text-[6px] mr-4 text-color"></i>
                  <span className="font-bold">Epoch 1</span>
                </div>
                <button className="btn-outline !p-2.5 h-[33px] sm:!text-[16px] !text-[16px] !font-medium min-w-[202px]">
                  No reward to claim
                </button>
              </div>
              <p className="text-[14px]">The estimated rewards you have earned in the epoch by your current xSPICE share and total veSPICE rewards.</p>
            </div>
          </div>
        </div>
        <div className="sm:flex justify-end pb-6">
          <h3 className="mr-auto mb-5 sm:mb-0">History</h3>
          <div className="flex items-center justify-end">
            <span className="pr-4 mr-auto">See epochs with rewards</span>
            <div className="switch h-[28px]">
              <input type="checkbox" id="switch" />
              <label htmlFor="switch"></label>
            </div>
          </div>
        </div>
        <div className="pb-[90px]">
          <p className="text-center">No epoch found</p>
        </div>
      </div>
    </>
  )
}
export default Loyalty;