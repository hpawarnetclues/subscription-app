const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
loader = document.getElementById('loader')
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
//      console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  })

loader.style.display='block';
chatSocket = new WebSocket('ws://' + window.location.host + '/ws/subscription/');

//when soket is connect success
  chatSocket.onopen = function (e) {
//  console.log("The connection was setup successfully !");
  loader.style.display='none';
  };

  chatSocket.onerror = function(error) {
      alert('something went wrong')
      window.location.href="/admin/"
  }

  chatSocket.onmessage = function (e) {
    check = document.getElementById('plan_table_body')
    

    const data = JSON.parse(e.data);
    if (data['type'] == 'plan_add'){
      child_table = check.getElementsByTagName('tr').length
//      console.log(child_table)
      sr = Number(child_table)+1
//      console.log(sr)
      
      if (data['plan_type'] == 'unlimited'){
        new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>Unlimited</td><td id='planafter"+data['plan_id']+"'>Unlimited</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td><td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td> <td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'>"+data['plan_name']+" </p> <hr class='w-12 border border-green-500 mb-6'> <h3 class='text-3xl font-bold text-green-500 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-green-500 mb-6'> <li>totle Request : Unlimited</li></ul> </div>"
        }
      else{
        new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>"+data['request']+"</td><td id='planafter"+data['plan_id']+"'>"+data['after_cost']+"</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td> <td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td><td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-grey-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-grey-200 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-grey-200 mb-6'> <h3 class='text-3xl font-bold text-grey-200 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-grey-200 mb-6'> <li>totle Request : "+data['request']+"</li> <li>After per Request Charge : "+data['after_cost']+"</li></ul> </div>"
        }
    $('#plan_table_body').append(new_data)
    insertplanform()
    
    shownotification('success','Plan Add Success.')
    }
    else if(data['type'] == 'deleteplan'){
      if (data['sub-type'] == 'success'){
        document.getElementById('plan'+data['plan_id']).style.display='none';
        shownotification('success','Plan Delete Success..')
      }
      else{
        shownotification('error','Something Went Wrong.')
      }
    }
    else if(data['type'] == 'updateplan'){
      if(data['sub-type'] == 'success'){
        if(data['is_unlimited'])
        {
          document.getElementById('planname'+data['plan_id']).innerHTML = data['name']
          document.getElementById('planrequest'+data['plan_id']).innerHTML = 'Unlimited'
          document.getElementById('planafter'+data['plan_id']).innerHTML = 'None'
          document.getElementById('planprice'+data['plan_id']).innerHTML = data['price']
          document.getElementById('planduration'+data['plan_id']).innerHTML = data['duration']
        }
        else{
          document.getElementById('planname'+data['plan_id']).innerHTML = data['name']
          document.getElementById('planrequest'+data['plan_id']).innerHTML = data['request']
          document.getElementById('planafter'+data['plan_id']).innerHTML = data['after']
          document.getElementById('planprice'+data['plan_id']).innerHTML = data['price']
          document.getElementById('planduration'+data['plan_id']).innerHTML = data['duration']

        }
        insertplanform()
//        console.log(data)
        shownotification('success','Plan Update Success.')
      }
      else{
        shownotification('error','Something Wrong.')
      }
    }
  };


  //when oket is close or disconnect
  chatSocket.onclose = function (e) {
//      console.log("Something unexpected happened !");
      alert('something unexpected.')
      window.location.href = '/admin'
  };

  //for plan create form show
  function showduration_form(){
    window.location.href = '/admin/master/duration'

    if (window.innerWidth < 768) {
//      console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }

  }


  function check_duration(type){
    loader.style.display='block';
    $.ajax({
      url : "/admin/check_duration",
      type : 'GET',
      success:function(res){
//        console.log(res)
        if(res == 'success'){
          window.location.href = '/admin/master/subscription/create'
        }
        else{
          shownotification('error','Please first create duration.')
        }

      }
    })
  }
  function showplanform()
  {
    loader.style.display='block';
    window.location.href = '/admin/master/subscription';
    
  }

  //for dashboard click
  function go_dashboard(){
    window.location.href = "/admin/"
    if (window.innerWidth < 768) {
//      console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  }

    function removenotification(url){
      loader.style.display='none';
      const notification = document.getElementById('notification');
      notification.innerHTML=" "
      if (url){
          window.location.href=url;

      }
      
  }

  function shownotification(type_of_error,message,url){
      if(url){
        loader.style.display='block'; 
      }
      const notification = document.getElementById('notification')
      const new_div = document.createElement('div')
      new_div.classList.add(type_of_error)
      new_div.innerHTML=message
      notification.appendChild(new_div)
      setTimeout(() => {
          removenotification(url)
      }, 3000);
  } 

  //for show textbox error
  function textboxes_error(element,error){
      element.innerHTML=error
      element.style.display='block';
  }
  //for hide textbox error
  function textboxeshide_error(element){
    element.style.display='none';
  }

  function compareold(){
//    console.log('call')
    var old_title = document.getElementById('old_title').value;
    var old_days = document.getElementById('old_days').value;

    dur_title = document.getElementById('durupdatename_text').value;
    dur_day = document.getElementById('durupdateday_text').value; 

    if((old_title.trim() === dur_title.trim()) && (old_days.trim() === dur_day.trim())){
      document.getElementById('updatedurationbtn').style.display = "none";
      document.getElementById('noupdate').style.display="block";
      
    }
    else{
      document.getElementById('updatedurationbtn').style.display="block";
      document.getElementById('noupdate').style.display = "none";

    }
  }

  function Update_duration(){
    dur_title = document.getElementById('durupdatename_text').value
    dur_day = document.getElementById('durupdateday_text').value
    dur_id = document.getElementById('durupdateid_text').value
    
    //error
    var checktittle = textboxerror('title_error', 'durupdatename_text' ,'Please Ener Title.')
    var checkdays = textboxerror('day_error', 'durupdateday_text' ,'Please Enter Days.')
    
    if(checktittle && checkdays){
        $.ajax({
            url : "/admin/duration_update_save",
            type : 'POST',
            data : {'id' : dur_id, 'title' : dur_title , 'day' : dur_day},
            success : function(res){
              if (res['success']){
                shownotification('success','Duration Update Success.')
                duration_master()
               
                
              }
              else{
                shownotification('error','Something went wrong.')
              }
            }
          })

    }
    
    
  }

  function duration_master(){
    window.location.href = "/admin/master/duration"
  }

  function plan_master(){
    window.location.href = "/admin/master/subscription"
  }

  function active_subscriber(){
    window.location.href = "/admin/subscriber/active"
  }

  $(window).on( 'load' ,function() {
    if (window.innerWidth < 768) {
//      console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  })
 

  //for show textbox error
  function textboxerror(errorid,textboxid,error,anyvalidation=''){
//    console.log(anyvalidation)
    if(anyvalidation==''){
      if(document.getElementById(textboxid).value.replace(/\s+/g, '') == ''){
          document.getElementById(errorid).innerHTML=error
          document.getElementById(errorid).style.display='block';
          return false
      }
      else{
          
          document.getElementById(errorid).style.display='none';
          return true
      }
    }
  }



  //create new duration
  function insert_duration(){
    var duration_title = document.getElementById('durationname_text').value
    var duration_day = document.getElementById('durationday_text').value
    var checktitle = textboxerror('durinstname_error','durationname_text','Plase Enter Title.')
    var checkday = textboxerror('durinstday_error','durationday_text','Plase Enter No. Of days.')
    if(checktitle && checkday){
      $.ajax({
        url : "/admin/create_duration",
        type : 'POST',
        data : {'title' : duration_title,'day':duration_day},
        success : function(res){
          if (res['success']){
            shownotification('success','Duration add success.',"/admin/master/duration")
          }
          else if (res['error']){
            shownotification('error','Duration Already Have.')
          }
          else{
            shownotification('error','Something wrong.')
          }
        }
      })
    }
  }

  //mobile number validation.
  function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;
    // Remove any non-numeric characters
    input.value = value.replace(/[^0-9]/g, '');
    if (input.value == 0){
        input.value='';
    }
  }

  

  //for conformation function.
  function conformationfun() {
    let text = "You are sure To delete.";
    if (confirm(text) == true) {
      return true
    } else {
      return false
    }
  }

  
  //check before duration delete if any active plan have inherete 
  function delete_duration(id){
    var id = id;
      $.ajax({
        url : "/admin/delete_duration",
        type : 'GET',
        data : {'id':id},
        success : function(res){
          if (res=='planhave'){
            shownotification('error','This Duration Have Active Plan')
          }
          else if (res == 'success'){
            document.getElementById('delete'+id).style.display='none';
            shownotification('success','Duration Delete Success.')
          }
          else{
            shownotification('error','Something went wrong.')
          }
          
        }
      })
  }

  //update suration
  function update_dur(id,type){
    $.ajax({
      url : "/admin/check_duration_before",
      type : 'GET',
      data : {'id':id},
      success : function(res){
//        console.log(res['success'])
        if (res['success']){
          if(type == 'update'){
                window.location.href = '/admin/master/duration/update?id='+id+''
          }
          else if(type == 'delete'){
            if (conformationfun()){
                delete_duration(id)
            }
            
          }
            

        }
        else if(res['error']){
          shownotification('error','Something Went Wrong.')
        }
        else{
          shownotification('error','Duration Have Active Plan.')
        }

      }
    })
  }

      var current_page = 1;
      var records_per_page = 2;
      if(document.getElementById("durationtable")){
        var l = document.getElementById("durationtable").rows.length
        var Totle_Pages = Math.ceil((l-1)/records_per_page)
//        console.log(Totle_Pages)
        if (Totle_Pages > 1){
          prev_li = "<li class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
          $('#durationpagination').append(prev_li)
          for (var i=1;i<=Totle_Pages;i++){
            if(i==1){
//              console.log(i)
              var new_li = "<li id='pagination1' style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPage()' class='page-link' href='#'>..</a></li>";
              $('#durationpagination').append(new_li);

            }
            else if(i==Totle_Pages){
              var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPage()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
              $('#durationpagination').append(new_li);

            }
            else{
              var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
              $('#durationpagination').append(new_li);

            }
          }
          next_li = "<li class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
          $('#durationpagination').append(next_li)
        }

      }
      
      
      function prevPage()
      {

          if (current_page > 1) {
              current_page--;
              changePage(current_page);
          }
      }

      function nextPage()
      {
          if (current_page < numPages()) {
              current_page++;
              changePage(current_page);
          }
      }
          
      function changePage(page)
      {
          current_page = page
          var btn_next = document.getElementById("nextbtn");
          var btn_prev = document.getElementById("priviousbtn");
          var listing_table = document.getElementById("durationtable");
          var btn_nextdot = document.getElementById("nextbtndot");
          var btn_prevdot = document.getElementById("priviousbtndot");
      
      
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

          for(var k=1 ; k<=Totle_Pages;k++){
            if (page == k){
              li = document.querySelector('#pagination'+k)
              if(li){
                li.classList.add('active')
              }
            }
            else
            {
              li = document.querySelector('#pagination'+k)
              if(li){
                li.classList.remove('active')
              }
            }
          }

          
          if (page){
            if (Totle_Pages > 5){
              if(page == 1 || page ==2){
                for (var j=1;j<=Totle_Pages;j++){
                  if (j <=4){
                    document.getElementById('pagination'+(page+j)).style.display='block';
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
          
          
          
          
          if(document.getElementById("priviousbtn"))
          {
            if (page == 1) {
              btn_prev.style.visibility = "hidden";
          } else {
              btn_prev.style.visibility = "visible";
          }

          }
          if(btn_prevdot){
            if(page ==1 || page == 2 || page == 3){
              btn_prevdot.style.display = "none";
            }
            else{
              btn_prevdot.style.display = "block";
            }
          }
          
          if(document.getElementById("nextbtn")){
            if (page == numPages()) {
              btn_next.style.visibility = "hidden";
          } else {
              btn_next.style.visibility = "visible";
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

      //search duration function
      function serchdurationmaster(){
        var sercch_text = document.getElementById('searchbartext').value
//        console.log(sercch_text)
        document.getElementById('duration_table_body').innerHTML=''
        all_date = document.getElementById('alldata').value
        data = JSON.parse(all_date)
//        console.log(sercch_text.length)
        var counter=1
        for (var i=0;i<data.length;i++){
          if (data[i]['fields']['duration'].toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['days']).toLowerCase().includes(sercch_text.toLowerCase())){
            new_tr ="<tr id='delete"+data[i]['pk']+"'> <th>"+counter+"</th><td id='durtitle_td"+data[i]['pk']+"'>"+data[i]['fields']['duration']+"</td><td id='durdays_td"+data[i]['pk']+"'>"+data[i]['fields']['days']+"</td><td><i  class='bx bx-edit-alt' title='Edit' onclick=update_dur('"+data[i]['pk']+"','update') style='font-size:30px!important;'></i><i class='bx bx-trash' title='Delete'style='font-size:30px!important;margin-left:10px;' onclick=update_dur('"+data[i]['pk']+"','delete')></i></td></tr>"
            $('#duration_table_body').append(new_tr)
            counter=counter+1;
          }
          else if(sercch_text.trim() == ''){
            new_tr ="<tr id='delete"+data[i]['pk']+"'> <th>"+counter+"</th><td id='durtitle_td"+data[i]['pk']+"'>"+data[i]['fields']['duration']+"</td><td id='durdays_td"+data[i]['pk']+"'>"+data[i]['fields']['days']+"</td><td><i  class='bx bx-edit-alt' title='Edit' onclick=update_dur('"+data[i]['pk']+"','update') style='font-size:30px!important;'></i><i class='bx bx-trash' title='Delete'style='font-size:30px!important;margin-left:10px;' onclick=update_dur('"+data[i]['pk']+"','delete')></i></td></tr>"
            $('#duration_table_body').append(new_tr)
            counter=counter+1;

          }
          
          
          }
          document.getElementById('durationpagination').innerHTML=''
          l = document.getElementById("durationtable").rows.length
          Totle_Pages = Math.ceil(l/records_per_page)
//          console.log(Totle_Pages)
          if (Totle_Pages > 1){
            prev_li = "<li class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
            $('#durationpagination').append(prev_li)
            if (Totle_Pages > 5){
              for (var i=1;i<=Totle_Pages;i++){
                if(i==1){
//                  console.log(i)
                  var new_li = "<li id='pagination1' style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
                else if(i==Totle_Pages){
                  var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
                else{
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
              }
            }
            else{
              for (var i=1;i<=Totle_Pages;i++){
                var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                $('#durationpagination').append(new_li);  
            }

            }
            next_li = "<li class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
            $('#durationpagination').append(next_li)
          }
          li_new()
        }

        function chengepagesize(){
          page_size = document.getElementById('selectpagesize').value
          records_per_page = Number(page_size)
          li_new()
        }

        //for new pagination based on current data.
        function li_new(){
          document.getElementById('durationpagination').innerHTML=''
          l = document.getElementById("durationtable").rows.length
          Totle_Pages = Math.ceil((l-1)/records_per_page)
//          console.log(Totle_Pages)
          if (Totle_Pages > 1){
            prev_li = "<li class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
            $('#durationpagination').append(prev_li)
            if (Totle_Pages > 5){
              for (var i=1;i<=Totle_Pages;i++){
                if(i==1){
//                  console.log(i)
                  var new_li = "<li id='pagination1' style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
                else if(i==Totle_Pages){
                  var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
                else{
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#durationpagination').append(new_li);
    
                }
              }
            }
            else{
              for (var i=1;i<=Totle_Pages;i++){
                var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                $('#durationpagination').append(new_li);  
            }

            }
            next_li = "<li class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
            $('#durationpagination').append(next_li)
          }
          changePage(1);

        }
        

  function duration_create (){
    window.location.href = '/admin/master/duration/create'
  }

