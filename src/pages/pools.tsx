import { useState } from "react";
import { Link } from "react-router-dom";
const poolsList = [
  {
    id: 1,
    pool: [
      {
        icon: "eth.png",
        token: "ETH",
      },
      {
        icon: "usdc.png",
        token: "USDC",
      }
    ],
    type: "Classic",
    liquidity: "$44.2B",
    apr: "5.6%"
  },
  {
    id: 2,
    pool: [
      {
        icon: "eth.png",
        token: "ETH",
      },
      {
        icon: "usdc.png",
        token: "USDC",
      }
    ],
    type: "Classic",
    liquidity: "$44.2B",
    apr: "5.6%"
  },
  {
    id: 3,
    pool: [
      {
        icon: "eth.png",
        token: "ETH",
      },
      {
        icon: "usdc.png",
        token: "USDC",
      }
    ],
    type: "Classic",
    liquidity: "$44.2B",
    apr: "5.6%"
  }
]
const Pools = () => {
  const [search, setSearch] = useState(false)
  const handleSearch = () => {
    setSearch(!search);
  };
  return (
    <>
      <div className="pt-[100px] lg:pt-[190px] pb-[70px] relative z-[1]">
        <div className="flex items-center mb-10">
          <i className="lineax-sparkles text-gradient mr-3 text-[26px]"></i>
          <h2 className="md:text-[32px] inline-block text-gradient">Trending</h2>
        </div>
        <div className="md:flex md:-mx-2.5 pb-[70px] lg:pb-[100px]">
          {poolsList.map((item, index) => {
            return (
              <Link to={`/pools/${item.id}`} key={index} className="md:flex-[0_0_33.3333%] md:max-w-[33.33333%] md:px-2.5 mb-[60px] md:mb-0 block">
                <div className="rounded-xl bg-popup py-5 xl:px-7 px-5 shadow-[0_4px_0_0_#FFA422] bg-shadow relative">
                  <div className="mb-4 -mt-12 flex items-center">
                    {item.pool.map((item, index) => {
                      return (
                        <img className="-ml-2 first:ml-0" key={index} src={`/images/${item.icon}`} alt={item.token} />
                      )
                    })}
                  </div>
                  <div className="flex items-center md:text-[18px] font-medium mb-3 relative">
                    <div className="mr-6 text-white flex items-center">
                      {item.pool.map((item, index) => {
                        return (
                          <span className="group" key={index}>
                            {item.token}
                            <span className="mx-1 group-last:hidden">/</span>
                          </span>
                        )
                      })}
                    </div>
                    <p className="text-primary flex items-center"><i className="mr-2 lineax-ellipse"></i>{item.type}</p>
                  </div>
                  <div className="flex items-center relative">
                    <div className="flex-1 flex items-center pr-2.5">
                      <span className="text-[14px] text-color2 mr-1">Liquidity</span>
                      <span className="font-medium">{item.liquidity}</span>
                    </div>
                    <div className="flex-1 flex items-center pr-2.5">
                      <span className="text-[14px] text-color2 mr-1">APR</span>
                      <span className="font-medium">{item.apr}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="flex items-center mb-4 relative">
          <div>
            <i className="lineax-rectangle-group-full mr-3 text-[22px] text-white"></i>
            <h2 className="md:text-[32px] inline-block font-medium mr-8">All Pools</h2>
          </div>
          <i onClick={handleSearch} className="lineax-magnifying-glass text-gradient text-[22px] cursor-pointer sm:mr-4 sm:ml-0 ml-auto"></i>
          {search &&
            <input className="sm:!w-[420px] h-[44px] !text-white absolute !border-border right-[40px] !w-[calc(100%_-_40px)] sm:static !bg-bg" type="text" placeholder="Search..." />
          }
        </div>
        <div className="overflow-x-auto pb-5">
          <table className="w-full">
            <thead>
              <tr>
                <th>Pool</th>
                <th>Type <i className="lineax-funnel ml-2"></i></th>
                <th>
                  <span className="text-gradient">Liquidity</span>
                  <i className="lineax-funnel ml-2 text-gradient"></i>
                </th>
                <th>APR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {poolsList.map((item, index) => {
                return (
                  <tr key={index} className="cursor-pointer">
                    <td>
                      <div className="flex items-center">
                        {item.pool.map((item, index) => {
                          return (
                            <div key={index} className="flex items-center text-white px-2 h-8 rounded-[56px] bg-dark2 border border-border mr-2">
                              <img className="w-4 mr-[5px]" src={`/images/${item.icon}`} alt={item.token} />
                              <span className="mr-[5px]">{item.token}</span>
                            </div>

                          )
                        })}
                      </div>
                    </td>
                    <td>
                      <p className="text-primary flex items-center text-gradient">
                        <i className="mr-2 lineax-ellipse"></i>{item.type}
                      </p>
                    </td>
                    <td className="font-medium md:text-[18px]">{item.liquidity}</td>
                    <td className="font-medium md:text-[18px]">{item.apr}</td>
                    <td className="text-right">
                      <Link to={`/pools/${item.id}`} className="hover:text-primary text-color3">
                        <i className="lineax-arrow-right-circle cursor-pointer text-[18px]"></i>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center text-[14px] mt-3">
          <p className="mr-auto">1 - 10 of 144 Pools</p>
          <div className="flex items-center">
            <p className="mr-4">Pools per page</p>
            <span className="text-gradient mr-4">10</span>
            <i className="lineax-chevron-left w-[24px] cursor-pointer text-color2 hover:text-primary mr-3 flex justify-center"></i>
            <i className="lineax-chevron-right w-[24px] cursor-pointer text-color2 hover:text-primary flex justify-end"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pools;
