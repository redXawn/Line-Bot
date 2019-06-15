'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('bitcoins', [
      {
        bitcoin_code: 'BTC',
        bitcoin_name: 'Bitcoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'TEN',
        bitcoin_name: 'Tokenomy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ABYSS',
        bitcoin_name: 'Abyss Token',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ACT',
        bitcoin_name: 'Achain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ADA',
        bitcoin_name: 'Cardano',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'AOA',
        bitcoin_name: 'Aurora',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BCD',
        bitcoin_name: 'Bitcoin Diamond',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BCH',
        bitcoin_name: 'Bitcoin Cash',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BSV',
        bitcoin_name: 'Bitcoin SV',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BNB',
        bitcoin_name: 'Binance Coin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BTG',
        bitcoin_name: 'Bitcoin Gold',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BTS',
        bitcoin_name: 'BitShares',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'BTT',
        bitcoin_name: 'BitTorrent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'CRO',
        bitcoin_name: 'Crypto.com Chain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'DASH',
        bitcoin_name: 'DASH',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'DAX',
        bitcoin_name: 'DAEX',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'DOGE',
        bitcoin_name: 'Dogecoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ETH',
        bitcoin_name: 'Ethereum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'EOS',
        bitcoin_name: 'EOS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ETC',
        bitcoin_name: 'Ethereum Classic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'GSC',
        bitcoin_name: 'Global Social Chain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'GXC',
        bitcoin_name: 'GXChain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'HPB',
        bitcoin_name: 'High Performance Blockchain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'IGNIS',
        bitcoin_name: 'IGNIS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'INX',
        bitcoin_name: 'INMAX',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'LTC',
        bitcoin_name: 'Litecoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'NEO',
        bitcoin_name: 'Neo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'NPXS',
        bitcoin_name: 'Pundi X',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'NXT',
        bitcoin_name: 'NXT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'ONT',
        bitcoin_name: 'Ontology',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'PXG',
        bitcoin_name: 'PlayGame',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'QTUM',
        bitcoin_name: 'Qtum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'RVN',
        bitcoin_name: 'Ravencoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'SCC',
        bitcoin_name: 'SiaCashCoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'STQ',
        bitcoin_name: 'Storiqa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'SUMO',
        bitcoin_name: 'Sumokoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'TRX',
        bitcoin_name: 'Tron',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'USDC',
        bitcoin_name: 'USD Coin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'USDT',
        bitcoin_name: 'USDT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'VEX',
        bitcoin_name: 'Vexanium',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'WAVES',
        bitcoin_name: 'Waves',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'XLM',
        bitcoin_name: 'Stellar Lumens',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'XEM',
        bitcoin_name: 'NEM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'XDCE',
        bitcoin_name: 'XinFin Network',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'XRP',
        bitcoin_name: 'Ripple',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        bitcoin_code: 'XZC',
        bitcoin_name: 'ZCoin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('bitcoins', null, {});
  }
};
