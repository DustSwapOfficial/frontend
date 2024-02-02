import { useState } from "react"
const Launch = () => {
  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px]">
        <div className="flex items-center mb-4">
          <i className="lineax-launch text-gradient mr-3 text-[26px]"></i>
          <h1 className="md:text-[32px] inline-block text-gradient">Launch</h1>
        </div>
        <p className="mb-[60px] text-color2">Participate in launches of the best ecosystem projects.</p>
        <p className="text-[20px] mb-[60px]">All Projects</p>
        <p className="text-[20px] text-primary">There are currently no launch projects. Please stay tuned for updates.</p>
      </div>
    </>
  )
}
export default Launch;