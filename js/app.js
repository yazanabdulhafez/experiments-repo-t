'use strict';
let TotalQauntity = 0;

let orderTable = document.getElementById('orderTable');



////////// constuctor //////////////

function Order(orderType, Quantity) {
  this.orderType = orderType;
  this.Quantity = Quantity;
  Order.all.push(this);
  console.log(Order.all[0].Quantity);
  this.TotalQauntity = 0;
  localStorage.setItem('orderInfo', JSON.stringify(Order.all));
}
Order.all = [];
Order.prototype.render = function() {

  let tableBody = document.createElement('tbody');
  orderTable.appendChild(tableBody);
  let tBody = document.createElement('tr');
  tableBody.appendChild(tBody);
  let th = document.createElement('th');
  tBody.appendChild(th);
  th.textContent = `${this.orderType}`;
  let thQ = document.createElement('td');
  tBody.appendChild(thQ);
  thQ.textContent = `${ this.Quantity}`;
  TotalQauntity += Number(`${ this.Quantity}`);
  console.log(TotalQauntity);
  this.TotalQauntity = TotalQauntity;
  console.log(this.TotalQauntity);
  document.getElementById('orderTable').deleteRow(-1);
  makwTableFooter();

};


function makwTableHeader() {

  let thead = document.createElement('thead');
  orderTable.appendChild(thead);
  let tableHead = document.createElement('tr');
  thead.appendChild(tableHead);
  let th = document.createElement('th');
  thead.appendChild(th);
  th.textContent = 'Item';
  let thQ = document.createElement('th');
  thead.appendChild(thQ);
  thQ.textContent = 'Quantity';


}
makwTableHeader();

function makwTableFooter() {
  let tfoot = document.createElement('tfoot');
  orderTable.appendChild(tfoot);

  let tfooter = document.createElement('tr');
  tfoot.appendChild(tfooter);
  let th = document.createElement('th');
  tfooter.appendChild(th);
  th.textContent = 'Total Qauntity';
  let thQ = document.createElement('th');
  tfooter.appendChild(thQ);
  console.log(TotalQauntity);
  thQ.textContent = TotalQauntity;

}
makwTableFooter();

let submitForm = document.getElementById('orderForm');
submitForm.addEventListener('submit', submisstionEventHandler);

function submisstionEventHandler(event) {
  event.preventDefault();
  let orderType = event.target.Order.value;

  let Quantity = event.target.Quantity.value;
  let newOrder = new Order(orderType, Quantity);
  // newOrder.TotalQauntity();
  newOrder.render();


}

document.addEventListener('DOMContentLoad', pageLoad());

function pageLoad() {

  let data = JSON.parse(localStorage.getItem('orderInfo'));
  if (data) {
    for (let i = 0; i < data.length; i++) {
      let reData = new Order(data[i].orderType, data[i].Quantity);

      reData.render();

    }
  }



}
//TotalQauntity += reData.Quantity[i];
function clearTable() {
  localStorage.clear();
  window.location.reload();
}