
const params = new URLSearchParams(location.search);
const orderId = params.get("orderId");

document.getElementById('orderId').innerText = orderId