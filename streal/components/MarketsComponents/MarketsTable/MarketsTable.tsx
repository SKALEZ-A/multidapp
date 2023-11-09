import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import MarketBox from '../MarketBox/MarketBox';
import WebTable from '../WebTable/WebTable';

const MarketsTable = () => {
  const darkMode = useSelector((state: any) => state.interface.mode);
  const [data, setData] = useState([]);
  const [searchModal, setSearchModal] = useState(false);

  const toggleSearch = () => setSearchModal(!searchModal);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&names=`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div className={`markets--table ${darkMode && 'dark--mode--fonts '}`}>
      <div className={`header ${!darkMode && 'light--header'}`}>
        <>
          <div className='hide-in-big-screen'>
            {searchModal ? (
              <>
                <div>
                  <div className='search--box mobile--search'>
                    <AiOutlineSearch className='search--icon' />
                    <input type='input' placeholder='Search assets' />
                  </div>
                </div>

                <p onClick={toggleSearch}>Cancel</p>
              </>
            ) : (
              <>
                <div>
                  <h4 className='text-white'>Ethereum assets</h4>
                </div>

                <div className='icon--container' onClick={toggleSearch}>
                  <AiOutlineSearch className='search--icon' />
                </div>
              </>
            )}
          </div>
          <div className='show-in-big-screen'>
            <div>
              <h4>Ethereum assets</h4>
            </div>

            <div className='web--search--box'>
              <div className='search--box'>
                <AiOutlineSearch className='search--icon' />
                <input
                  className={`!text-black ${
                    darkMode && '!text-white'
                  }`}
                  type='input'
                  placeholder='Search asset name, symbol and address'
                />
              </div>
            </div>
          </div>
        </>
      </div>
      {data.map((obj: any) => (
        <MarketBox
          key={obj.id}
          id={obj.id}
          tokenName={obj.name}
          tokenShortName={obj.symbol}
          tokenImage={obj.image}
          maxSupply={obj.total_supply}
          totalSuppliedFigure={obj.circulating_supply}
          totalSuppliedPer={0}
          supplyApy={obj.price_change_percentage_24h}
          totalBorrowedFigure={obj.low_24h}
          totalBorrowedPer={obj.low_24h}
          borrowedApyVariable={obj.market_cap_change_percentage_24h}
          borrowedApyStable={0}
        />
      ))}

      <WebTable data={data} />
    </div>
  );
};

export default MarketsTable;
