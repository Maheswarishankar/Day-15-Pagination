//create the division element

const container = document.createElement('div');
container.setAttribute('id','container');
document.body.append(container);

// create the title

const title = document.createElement('h1');
title.setAttribute('id','title');
title.innerText = "Pagination";
container.append(title);

//get the description

const description = document.getElementById('description');
description.innerText = "pagination table using DOM-Javascript";
container.append(description);

//create all table container

const table_container = document.createElement("div");
table_container.classList.add('table_container','table-responsive');
container.append(table_container);

//create the table

const table = document.createElement('table');
table.setAttribute('id','table');
table.classList.add('table');
table_container.append(table);


//create the thead

const thead = document.createElement('thead');
thead.classList.add("bg-dark", "text-light");
table.append(thead);

//create the table row

const trhead = document.createElement('tr');
thead.append(trhead);

//create table data

const tdHead1 = document.createElement('td');
tdHead1.innerHTML = 'ID';
trhead.append(tdHead1);

const tdHead2 = document.createElement('td');
tdHead2.innerHTML = 'NAME';
trhead.append(tdHead2);

const tdHead3 = document.createElement('td');
tdHead3.innerHTML = 'EMAIL';
trhead.append(tdHead3);

//create the table body

const tbody = document.createElement('tbody');
tbody.setAttribute('id','table_body');
table.append(tbody);

//create the span

const span = document.createElement('span');
span.innerHTML = "";
table_container.append(span);

//create the pagination buttons

const pagination = document.createElement('div');
pagination.setAttribute('id','buttons');
pagination.classList.add('container','buttons');
pagination.setAttribute('class','d-flex justify-content-center')

table_container.append(pagination);

//create the function in table row

function createTableRow(id,name,email){

    let tr = document.createElement('tr');
    tbody.append(tr);

    let td1 = document.createElement('td');
    td1.innerHTML = id;
    tr.append(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = name;
    tr.append(td2);

    let td3= document.createElement('td');
    td3.innerHTML = email;
    tr.append(td3);
}

// XMLHTTPRequest in json format.......................

let request = new XMLHttpRequest();
request.open('GET',"https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
request.send();
request.onload = function(){
    let tableData = JSON.parse(this.response);
    let setData = {
        "queryset":tableData,
        "page":1,
        "rows":10,
        "window":10
    }
//build a Table in pagination 

buildTable()
function pagination(querset,page,rows){
    let dataStart = (page-1)*rows;
    let dataEnd = dataStart + rows;
    let trimedData = querset.slice(dataStart,dataEnd)
    let pages = Math.ceil(tableData.length / rows);
    return{
        "querset":trimedData,
        "pages":pages
    } 
}
// create a function in page buttons     

function pageButtons(pages){

    let create_button = document.getElementById('buttons');
    create_button.innerHTML = ""

    let maxLeft = setData.page - Math.floor(setData.window/2);
    let maxRight = setData.page + Math.floor(setData.window/2);

    if(maxLeft<1){
        maxLeft = 1
        maxRight = setData.window
    }

    if(maxRight > pages){
        maxLeft = pages - (setData.window -1)
        maxRight = pages
            if(maxLeft < 1){
            maxLeft = 1;
            }
    }
    for(let page = maxLeft; page<=maxRight;page++){
        create_button.innerHTML = create_button.innerHTML +`<button value = ${page} class = "page">${page}</button>`
    }
    if (setData.page !== 1) {
        create_button.innerHTML = `<button value=${1} class="page"> First</button>` + create_button.innerHTML
    }
    if (setData.page != pages) {
        create_button.innerHTML += `<button value=${pages} class="page">Last</button>`
    }
    let buttonActive = document.getElementById("buttons")
    buttonActive.addEventListener("click", function (e) {
            document.getElementById("table_body").innerHTML = ""
            setData.page = Number(e.target.value)
            buildTable()
        })
}
function buildTable(){
    let data = pagination(setData.queryset,setData.page,setData.rows);
    let array = data.querset
    for(let i = 0;i<array.length;i++){
        createTableRow(array[i].id,array[i].name,array[i].email);
    }
    pageButtons(data.pages)
}

}














