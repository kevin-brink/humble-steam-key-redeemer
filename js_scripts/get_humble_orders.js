var done = arguments[arguments.length - 1];
var list = '%optional%';
if (list){
    list = JSON.parse(list);
} else {
    list = [];
}
var getHumbleOrderDetails = async (list) => {
  const HUMBLE_ORDERS_API_URL = 'https://www.humblebundle.com/api/v1/user/order';
  const HUMBLE_ORDER_DETAILS_API = 'https://www.humblebundle.com/api/v1/order/';

  try {
    var orders = []
    if(list.length){
      orders = list.map(item => ({ gamekey: item }));
    } else {
      const response = await fetch(HUMBLE_ORDERS_API_URL);
      orders = await response.json();
    }
    const orderDetailsPromises = orders.map(async (order) => {
      const orderDetailsUrl = `${HUMBLE_ORDER_DETAILS_API}${order['gamekey']}?all_tpkds=true`;
      const orderDetailsResponse = await fetch(orderDetailsUrl);
      const orderDetails = await orderDetailsResponse.json();
      return orderDetails;
    });

    const orderDetailsArray = await Promise.all(orderDetailsPromises);
    return orderDetailsArray;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

getHumbleOrderDetails(list).then(r => {done(r)});