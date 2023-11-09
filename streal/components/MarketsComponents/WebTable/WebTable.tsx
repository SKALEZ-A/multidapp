import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

const WebTable = ({ data }: any) => {
  const darkMode = useSelector((state: any) => state.interface.mode);

  const conditionalRowStyles = [
    {
      when: () => darkMode,
      style: {
        backgroundColor: 'rgb(41, 46, 65)',
        borderColor: 'rgba(235, 235, 239, 0.08)',
        color: 'white',
      },
    },
  ];

  const tableStyles = {
    rows: {
      style: {
        height: '74px',
        textAlign: 'left',
        cursor: 'pointer',
        backgroundColor: '#fff',
        color: darkMode ? '#f1f1f3' : '#303549',
      },
    },
    headCells: {
      style: {
        borderColor: 'blue',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: darkMode ? ' rgb(41, 46, 65)' : '#fff',
        color: darkMode ? '#f1f1f3' : '#62677b',
        fontWeight: '500',
        fontSize: '12px',
        width: 'fit-content',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingLeft: '10px',
        paddingRight: '10px',
        minWidth: '74px',
        lineHeight: '20px',
      },
    },
  };

  const Columns: any = [
    {
      name: <span className='table--asset--title'>Assets</span>,
      minWidth: '240px',
      selector: (row: any) => (
        <span className='box--header'>
          <img src={row.image} alt='token icon' />
          <span className='box--header--text'>
            <h5>{row.name}</h5>
            <p>{row.symbol}</p>
          </span>
        </span>
      ),
    },
    {
      name: 'Total supplied',
      selector: (row: any) => (
        <span className='figures'>
          <p className='title'>
            {(row.circulating_supply / 1000000)?.toFixed(2)}M
          </p>
          <p className='figures--figure'>
            ${(row.total_supply / 1000000)?.toFixed(2)}M
          </p>
        </span>
      ),
    },

    {
      name: 'Supply APY',
      width: '180px',
      selector: (row: any) => (
        <p className='figures--figure'>
          {row.price_change_percentage_24h?.toFixed(2)}%
        </p>
      ),
    },

    {
      name: 'Total borrowed',
      selector: (row: any) => (
        <span className='figures'>
          <p className='title'>{(row.low_24h / 1000)?.toFixed(2)}M</p>
          <p className='figures--figure'>
            ${(row.low_24h / 1000)?.toFixed(2)}M
          </p>
        </span>
      ),
    },
    {
      name: 'Borrow APY, variable ',
      selector: (row: any) => (
        <p className='figures--figure'>
          {row.market_cap_change_percentage_24h?.toFixed(2)}%
        </p>
      ),
    },
    {
      name: 'Borrow APY, stable ',
      selector: (row: any) => <p className='figures--figure'>--</p>,
    },
    {
      name: '',
      selector: (row: any) => (
        <Link href='market-details'>
          <button className='market--box--button'>View details</button>
        </Link>
      ),
    },
  ];

  return (
    <div
      className={`market--box web--market ${
        !darkMode && 'light--mode--market--box'
      }`}
    >
      <DataTable
        persistTableHead={true}
        highlightOnHover={true}
        pointerOnHover={true}
        customStyles={tableStyles}
        columns={Columns}
        data={data}
        responsive
        fixedHeader
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
};

export default WebTable;
