//db.js
import nedb from 'nedb-promises';



const orderHistoryDB = new nedb({ filename: 'orderhistory.db', autoload: true });


export {  orderHistoryDB };