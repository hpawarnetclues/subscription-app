const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));


sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});




$(window).resize(function() {
  if (window.innerWidth < 768) {
    // console.log('this')
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
})



//for 
function plan_master()
{
  loader.style.display='block';
  window.location.href = '/admin/master/subscription';
  
}

function duration_master(){
  loader.style.display='block';
  window.location.href = "/admin/master/duration"
}

function active_subscriber(){
  window.location.href = "/admin/subscriber/active"
}

//for dashboard click
function go_dashboard(){
  loader.style.display='block';
  window.location.href = "/admin/"
  if (window.innerWidth < 768) {
    // console.log('this')
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
}


//pagination functions
var current_page = 1;
var records_per_page = 2;
var l=0
var Totle_Pages=0

//click on previous side dots.
function prevPagedot()
{
  // console.log('previ' +current_page)

    if (current_page > 2) {
        current_page-=2;
        changePage(current_page);
    }
}

//click on previous button
function prevPage()
{
  // console.log('previ' +current_page)

    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}


//click in nextside dots.
function nextPagedot()
{
  // console.log('next' + current_page)
    if (current_page < numPages()) {
        current_page+=2;
        changePage(current_page);
    }
}
//click on next button
function nextPage()
{
  // console.log('next' + current_page)
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
 
//show data based on page number function
function changePage(page)
{
    current_page = page
    var btn_next = document.getElementById("nextbtn");
    var btn_prev = document.getElementById("priviousbtn");
    var btn_nextdot = document.getElementById("nextbtndot");
    var btn_prevdot = document.getElementById("priviousbtndot");
    var listing_table = document.getElementById("planlimitedtable");


    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    [...listing_table.getElementsByTagName('tr')].forEach((tr)=>{
        tr.style.display='none'; // reset all to not display
    });
    listing_table.rows[0].style.display = ""; // display the title row

    for (var i = (page-1) * records_per_page + 1; i < (page * records_per_page) + 1; i++) {
        if (listing_table.rows[i]) {
            listing_table.rows[i].style.display = ""
        } else {
            continue;
        }
    }

    //for active current page button in pagination
    for(var k=1 ; k<=Totle_Pages;k++){
      if (page == k){
        if(document.querySelector('#pagination'+k)){
            li = document.querySelector('#pagination'+k)
            li.classList.add('active')
        }
        
      }
      else
      {
        if(document.querySelector('#pagination'+k)){
            li = document.querySelector('#pagination'+k)
            li.classList.remove('active')
        }
      }
    }

    //for condition based pagination button display
    if (page){
      if (Totle_Pages > 5){
        if(page == 1 || page ==2){
          for (var j=1;j<=Totle_Pages;j++){
            if (j <=4){
              document.getElementById('pagination'+(j)).style.display='block';
            }
            else if(j==Totle_Pages){
              document.getElementById('pagination'+(j)).style.display='block';
            }
            else
            {
              if(document.getElementById('pagination'+j)){
                document.getElementById('pagination'+j).style.display='none';
              }
            }
            
          }
        }
        else if(page == Totle_Pages || page == (Totle_Pages-1) || page == (Totle_Pages-2)){
          for (var i=1;i<=Totle_Pages;i++){
            
              
            
            if (i == Totle_Pages || i == (Totle_Pages-1) || i == (Totle_Pages-2)){
              if(document.getElementById('pagination1')){
                document.getElementById('pagination1').style.display='Block';
              }
              
              if(document.getElementById('pagination'+(Totle_Pages-3))){
                document.getElementById('pagination'+(Totle_Pages-3)).style.display='Block';
            }
              if(document.getElementById('pagination'+(Totle_Pages-2))){
                document.getElementById('pagination'+(Totle_Pages-2)).style.display='Block';
            }
              if(document.getElementById('pagination'+(Totle_Pages-1))){
                document.getElementById('pagination'+(Totle_Pages-1)).style.display='Block';
            }
            if(document.getElementById('pagination'+(Totle_Pages))){
              document.getElementById('pagination'+(Totle_Pages)).style.display='Block';
          }
          }
          else{
            if(document.getElementById('pagination'+i)){
              document.getElementById('pagination'+i).style.display='none';
          }
        }
        }
      }
        else{
          for (var j=1;j<=Totle_Pages;j++){
            if(j==1){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(page==j){  
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j==Totle_Pages){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j == (page+1)){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j == (page-1)){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else{
                if(document.getElementById('pagination'+(j))){
                  document.getElementById('pagination'+(j)).style.display='none'; 
              } 
            } 
          }
        }
      } 
    }
    
    //check if first page then previous page hide
    if(document.getElementById("priviousbtn"))
    {
      if (page == 1) {
        btn_prev.style.display = "none";
        
    } else {
        btn_prev.style.display = "block"; 
        
    }

    }

    //for page 1,2 and 3 not display prevois side dots button
    if(btn_prevdot){
        if(page ==1 || page == 2 || page == 3){
            btn_prevdot.style.display = "none";
        }
        else{
            btn_prevdot.style.display = "block";
        }
    }
    
    
    //check any next page data exist if not then hide next button
    if(document.getElementById("nextbtn")){
      if (page == numPages()) {
        // console.log(page)
        // console.log(Totle_Pages)
        btn_next.style.display = "none";
        
    } else {
        btn_next.style.display = "block"
        if(btn_nextdot){
            btn_nextdot.style.display = "block"
        }
        
    }
    }
    if(btn_nextdot){
        if(page == Totle_Pages || page == (Totle_Pages-1) || page == (Totle_Pages - 2)){
            btn_nextdot.style.display = "none";
          }
          else{
            btn_nextdot.style.display = "block";
          }

    }
    
    
}

function numPages()
{
    return Math.ceil((l - 1) / records_per_page);
}


//function for chenge page size
function chengepagesize(){
  page_size = document.getElementById('selectpagesize').value
  records_per_page = Number(page_size)
  li_append()
  changePage(1)
}

//this function for create all elment of pagination 
function li_append(){
  document.getElementById('subscriberpagination').innerHTML=''
  if(document.getElementById("planlimitedtable")){
    l = document.getElementById("planlimitedtable").rows.length
    Totle_Pages = Math.ceil((l-1)/records_per_page)
    // console.log(Totle_Pages)
    if (Totle_Pages > 1){
      prev_li = "<li style='display:block;' class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
      $('#subscriberpagination').append(prev_li)
      if (Totle_Pages > 5){
        for (var i=1;i<=Totle_Pages;i++){
          if(i==1){
            // console.log(i)
            var new_li = "<li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
            $('#subscriberpagination').append(new_li);

          }
          else if(i==Totle_Pages){
            var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
            $('#subscriberpagination').append(new_li);

          }
          else{
            var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
            $('#subscriberpagination').append(new_li);

          }
        }
      }
      else{
        for (var i=1;i<=Totle_Pages;i++){
            var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
            $('#subscriberpagination').append(new_li);  
        }
      }
      next_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
      $('#subscriberpagination').append(next_li)
    }

  }
}


//function for search by textbox
function serchsubscriber(temp_data,counter){
    // console.log('call the search')
    var sercch_text = document.getElementById('searchbartext').value
    // console.log(sercch_text.toLowerCase())
    all_date = document.getElementById('alldata').value
    user_data = document.getElementById('json_user').value
    data = JSON.parse(all_date)
    if(sercch_text.trim() == ''){
        // console.log('true data')
    }
      //check if any word match in tr data
    if (temp_data['fullname'].toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, ''))
    ||temp_data['plan_name'].toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) ||
    String(temp_data['price']).toLowerCase().includes(sercch_text.toLowerCase()) ||
    String(temp_data['active_date']).toLowerCase().includes(sercch_text.toLowerCase()) ||
    String(temp_data['expire_date']).toLowerCase().includes(sercch_text.toLowerCase()) || sercch_text.trim() == ''){
        if(temp_data['is_active']){
          var status = 'Active'
          }
        else{
              var status = 'Expire'
          }
        new_tr = "<tr id='plan{{i.id}}' style=display:'run-in'><td>"+counter+"</td><td id='planduration{{i.id}}' >"+temp_data['fullname']+"</td><td id='planname{{i.id}}'>"+temp_data['plan_name']+"</td><td id='planprice{{i.id}}'>"+temp_data['price']+"</td><td id='planstart{{i.id}}' >"+temp_data['active_date']+"</td><td id='planend{{i.id}}' >"+temp_data['expire_date']+"</td><td>"+status+"</td>"
        $('#plan_table_body').append(new_tr)
        counter = counter + 1
    }
  }

  //convert date in existing html formate
  function covertdate(datetimeString) {
    // Parse the datetime string into a Date object
    const date = new Date(datetimeString);

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Format as YYYY-MM-DD
    return `${year}-${month}-${day}`;
}



  //for if page size on mible or tabete thenn side bar hide
  

  

  //function for table filter like dropdown and button group and acending or deacending
  function tablefilter(type=''){
    document.getElementById('plan_table_body').innerHTML='' //clear table first
    all_date = document.getElementById('alldata').value //take all data
     //take user data for user name
    // console.log(all_date)
    data = JSON.parse(all_date) //convert data in json //conver user data in json formate
    // console.log(all_date)
    // console.log('type is before', type)
    if (type==''){
        type='all';
        const radios = document.querySelectorAll('input[name="btnradio"]');
        for (const radio of radios) {
          if (radio.checked) {
            // Return the value or ID of the checked radio button
            type =  radio.title;  // Or you can return radio.value if you have values set
          }
        }
    }
    // console.log('type is', type)
    //for check any of selected dropdown
    if(document.querySelector('#userdropfiler')){
      user_selected = document.querySelector('#userdropfiler').value
      // console.log('selected User' + user_selected)
    }
    if(document.querySelector('#plandropfiler')){
      plan_selected = document.querySelector('#plandropfiler').value
      // console.log('Selected Plan ' + plan_selected)
    }


    //for check function call for asc or desc by active date cell
    if(type == 'activedates'){
      if ('activedates' in localStorage){
        var tempvar = localStorage.getItem('activedates')
        
      }
      else{
        localStorage.setItem('activedates','acending')
        var tempvar='acending'
      }
      // console.log(tempvar)
      if (tempvar == 'acending'){
        localStorage.setItem('activedates','deacending')
        data.sort((a, b) => {
          const dateA = new Date(a.active_date);
          const dateB = new Date(b.active_date);
          return dateA - dateB; // Ascending order
        })
        document.getElementById('activedateheader').innerHTML='Active Date ↑';
      }
      else{
        localStorage.setItem('activedates','acending')
        document.getElementById('activedateheader').innerHTML='Active Date ↓';
        data.sort((a, b) => {
          const dateA = new Date(a.active_date);
          const dateB = new Date(b.active_date);
          return dateB - dateA; // Ascending order
        })

      }
    }
      
    //for check function call for asc or desc by expire date cell
    if(type == 'expiredates'){
      if ('expiredates' in localStorage){
        var tempvar = localStorage.getItem('expiredates')
        
      }
      else{
        localStorage.setItem('expiredates','acending')
        var tempvar='acending'
      }
      // console.log(tempvar)
      if (tempvar == 'acending'){
        document.getElementById('expiredateheader').innerHTML='Expire Date ↑';
        localStorage.setItem('expiredates','deacending')
        data.sort((a, b) => {
          const dateA = new Date(a.expire_date);
          const dateB = new Date(b.expire_date);
          return dateA - dateB; // Ascending order
        })
      }
      else{
        document.getElementById('expiredateheader').innerHTML='Expire Date ↓';
        localStorage.setItem('expiredates','acending')
        data.sort((a, b) => {
          const dateA = new Date(a.expire_date);
          const dateB = new Date(b.expire_date);
          return dateB - dateA; // Ascending order
        })

      }
    }

    if(type == 'plan_name'){
      if ('planname' in localStorage){
        var tempvar = localStorage.getItem('planname')
        
      }
      else{
        localStorage.setItem('planname','acending')
        var tempvar='acending'
      }
      // console.log(tempvar)
      if (tempvar == 'acending'){
        document.getElementById('plannameheader').innerHTML='Plan Name ↑';
        localStorage.setItem('planname','deacending')
        data.sort((a, b) => a.plan_name.localeCompare(b.plan_name));

      }
      else{
        document.getElementById('plannameheader').innerHTML='Plan Name ↓';
        localStorage.setItem('planname','acending')
        data.sort((a, b) => b.plan_name.localeCompare(a.plan_name));

      }

    }

    if(type == 'username'){
      if ('usernameasc' in localStorage){
        var tempvar = localStorage.getItem('usernameasc')
        
      }
      else{
        localStorage.setItem('usernameasc','acending')
        var tempvar='acending'
      }
      // console.log(tempvar)
      if (tempvar == 'acending'){
        document.getElementById('usernameheader').innerHTML='User Name ↑';
        localStorage.setItem('usernameasc','deacending')
        data.sort((a, b) => a.fullname.localeCompare(b.fullname));
        
      }
      else{
        document.getElementById('usernameheader').innerHTML='User Name ↓';
        localStorage.setItem('usernameasc','acending')
        data.sort((a, b) => b.fullname.localeCompare(a.fullname));

      }

    }

    //for check function call for asc or desc by price cell
    if(type=='price'){
      if ('price' in localStorage){
        var tempvar = localStorage.getItem('price')
        
      }
      else{
        localStorage.setItem('price','acending')
        var tempvar='acending'
      }
      // console.log(tempvar)
      if (tempvar == 'acending'){
        document.getElementById('priceheader').innerHTML='Price ↑';
        localStorage.setItem('price','deacending')
        data.sort((a, b) => {
          const dateA = a.price;
          const dateB = b.price;
          return dateA - dateB; // Ascending order
        })
      }
      else{
        document.getElementById('priceheader').innerHTML='Price ↓';
        localStorage.setItem('price','acending')
        data.sort((a, b) => {
          const dateA = a.price;
          const dateB = b.price;
          return dateB - dateA; // Ascending order
        })

      }
    }
    
    var counter = 1
    //iterate all data and displaying based on condition 
    for (var i=0;i<data.length;i++){
      //fetch user name in json data
      
      if(data[i]['is_active']){
        var status = 'Active'
        }
      else{
            var status = 'Expire'
        }
        
        //create new tr 
        new_tr = "<tr id='plan{{i.id}}' style=display:'run-in'><td>"+counter+"</td><td id='planduration{{i.id}}' >"+data[i]['fullname']+"</td><td id='planname{{i.id}}'>"+data[i]['plan_name']+"</td><td id='planprice{{i.id}}'>"+data[i]['price']+"</td><td id='planstart{{i.id}}' >"+data[i]['active_date']+"</td><td id='planend{{i.id}}' >"+data[i]['expire_date']+"</td><td>"+status+"</td>"
       

      //for plan or subscription dropdown select
      if(type=='dropdown' || type=='expire' || type=='active' || type=='all'){
        var selected_button = getSelectedButton()
        var id=document.getElementById('plandropfiler').value
        var user_id=document.getElementById('userdropfiler').value
        // console.log(id)
        if (user_id == 'Select User' && id !='Select Plan'){
            if(data[i]['plan_name'] == id){
              if(selected_button == 'all'){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
              else if(selected_button == status){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
            }
        }

        if (user_id != 'Select User' && id =='Select Plan'){
            if(data[i]['fullname'] == user_id){
              if(selected_button == 'all'){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
              else if(selected_button == status){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
            }
        }

        if (user_id != 'Select User' && id !='Select Plan'){
            if(data[i]['fullname'] == user_id && data[i]['plan_name'] == id){
              if(selected_button == 'all'){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
              else if(selected_button == status){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
            }
        }

        if (user_id == 'Select User' && id =='Select Plan'){
              if(selected_button == 'all'){
                // console.log('call two times')
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
              else if(selected_button == status){
                // $('#plan_table_body').append(new_tr)
                serchsubscriber(data[i],counter)
                counter = counter + 1
              }
        }
      }

      //for select user dropdown select and changes
      else if(type=='userdrop'){
        var selected_button = getSelectedButton()
        var id=document.getElementById('userdropfiler').value
        // console.log(document.getElementsByName('btnradio'))
        // console.log(id)
        if(data[i]['fullname'] == id){
          if(selected_button == 'all'){
            // $('#plan_table_body').append(new_tr)
            serchsubscriber(data[i],counter)
            counter = counter + 1
          }
          else if(selected_button == status){
            // $('#plan_table_body').append(new_tr)
            serchsubscriber(data[i],counter)
            counter = counter + 1
          }
            
        }
        else if(id =='Select User'){
          if(selected_button == 'all'){
            $('#plan_table_body').append(new_tr)
            counter = counter + 1
          }
          else if(selected_button == status){
            $('#plan_table_body').append(new_tr)
            counter = counter + 1
          }
        }
      }

      //for asc or desc in active date
      else if('activedates'){
        selected_button = getSelectedButton()
        if(selected_button == 'all'){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
        else if(selected_button == status){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
      }
      else if('price'){
        selected_button = getSelectedButton()
        if(selected_button == 'all'){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
        else if(selected_button == status){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
      }

      else if('plan_name'){
        selected_button = getSelectedButton()
        if(selected_button == 'all'){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
        else if(selected_button == status){
          // $('#plan_table_body').append(new_tr)
          serchsubscriber(data[i],counter)
          counter = counter + 1
        }
      }
      }

      li_append()
      changePage(1);

    
  }


  

  function getSelectedButton() {
    // Get all radio buttons with the name 'btnradio'
    const radios = document.querySelectorAll('input[name="btnradio"]');
  
    // Loop through each radio button to find the checked one
    for (const radio of radios) {
      if (radio.checked) {
        // Return the value or ID of the checked radio button
        return radio.id;  // Or you can return radio.value if you have values set
      }
    }
    
    return null;  // Return null if no radio button is checked
  }

  /*if(user_drop == 'Select User' && plan_drop == 'Select Plan'){
            $('#plan_table_body').append(new_tr)
        }
        else if(user_drop != 'Select User' && plan_drop != 'Select Plan'){
            if(data[i]['fields']['plan_id']=plan_drop && data[i]['fields']['user_id']==user_drop){
                $('#plan_table_body').append(new_tr)
            }
        }
        else if(user_drop == 'Select User' && data[i]['fields']['plan_id']==plan_drop){
            $('#plan_table_body').append(new_tr)
        }
        else if(plan_drop == 'Select Plan' && data[i]['fields']['user_id']==user_drop)
        {
            $('#plan_table_body').append(new_tr)
        } */