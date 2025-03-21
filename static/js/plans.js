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



//reasize of tab close or open the sidebar
$(window).resize(function() {
  if (window.innerWidth < 768) {
    // console.log('this')
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
})

loader = document.getElementById('loader')
loader.style.display ='block'
chatSocket = new WebSocket('ws://' + window.location.host + '/ws/subscription/');

//when soket is connect success
  chatSocket.onopen = function (e) {
  // console.log("The connection was setup successfully !");
  loader.style.display='none';
  };

  chatSocket.onerror = function(error) {
      alert('something went wrong')
      window.location.href="/admin_dashbord_page"
  }

  chatSocket.onmessage = function (e) {
    loader.style.display='none';
    check = document.getElementById('plan_table_body')
    

    const data = JSON.parse(e.data);
    //add plan receive
    if (data['type'] == 'plan_add'){
        // console.log(data);
      //child_table = check.getElementsByTagName('tr').length
      //// console.log(child_table)
      //sr = Number(child_table)+1
      //// console.log(sr)
        //new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>Unlimited</td><td id='planafter"+data['plan_id']+"'>Unlimited</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td><td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td> <td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'>"+data['plan_name']+" </p> <hr class='w-12 border border-green-500 mb-6'> <h3 class='text-3xl font-bold text-green-500 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-green-500 mb-6'> <li>totle Request : Unlimited</li></ul> </div>"
        
        //new_data = "<tr id='plan"+data['plan_id']+"' style='display='block;'> <td>"+sr+"</td> <td id='planname"+data['plan_id']+"'>"+data['plan_name']+"</td> <td id='planrequest"+data['plan_id']+"'>"+data['request']+"</td><td id='planafter"+data['plan_id']+"'>"+data['after_cost']+"</td> <td id='planprice"+data['plan_id']+"'>"+data['price']+"</td> <td id='planstart"+data['plan_id']+"'>"+data['start_date']+"</td><td id='planend"+data['plan_id']+"'>"+data['end_date']+"</td><td id='planduration"+data['plan_id']+"'>"+data['duration']+"</td> <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data['plan_id']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data['plan_id']+"')></i></td> </tr>"
         //new_data="<div class='price-col border border-grey-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-grey-200 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-grey-200 mb-6'> <h3 class='text-3xl font-bold text-grey-200 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+" </span> </h3> <ul class='text-lg text-grey-200 mb-6'> <li>totle Request : "+data['request']+"</li> <li>After per Request Charge : "+data['after_cost']+"</li></ul> </div>"
        
   // $('#plan_table_body').append(new_data)
    //insertplanform()
    if(data['status'] == 'success'){
      shownotification('success','Plan Add Success.','/admin/master/subscription')
    }
    else if(data['status'] == 'plan_start_date_future'){
       shownotification('success','Plan Add Success.','/admin/master/subscription')
    }
    else{
      shownotification('error','Plan is Already Exist.')
    }

    }
    else if(data['type'] == 'deleteplan'){
      if (data['sub-type'] == 'success'){
        shownotification('success','Plan Delete Success..','/admin/master/subscription')
      }
      else{
        shownotification('error','Something Went Wrong.')
      }
    }
    else if(data['type'] == 'updateplan'){
      if(data['sub-type'] == 'success'){
        shownotification('success','Plan Update Success.','/admin/master/subscription')
      }
      else if(data['sub-type'] == 'planalreadyhave'){
        shownotification('error','Plan Name is already Exist.')
      }
      else{
        shownotification('error','Something Wrong.')
      }
    }
  };


  //when oket is close or disconnect
  chatSocket.onclose = function (e) {
      // console.log("Something unexpected happened !");
  };

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

  //for the use of textbox validation
  function textboxerror(errorid,textboxid,error,anyvalidation=''){
    // console.log('this is any validation ',anyvalidation)
    if(anyvalidation  === 'checkboth'){
      // console.log('true')
    }
    // console.log('false')
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
    //for plan request and aftercharge validation
    else if(anyvalidation == 'check'){
      // console.log('call check')
      var plan_check = document.getElementById('plan_check').checked
      // console.log(plan_check)
      if(document.getElementById(textboxid).value.replace(/\s+/g, '') == '' && !plan_check){
        document.getElementById(errorid).innerHTML=error
        document.getElementById(errorid).style.display='block';
        return false
      }
      else{
          
          document.getElementById(errorid).style.display='none';
          if((document.getElementById('plancharge_text').value.replace(/\s+/g, '') == '') && (document.getElementById('planupdate_textrequest').value.replace(/\s+/g, '') == '')){
            if(document.getElementById('updateplanduration_error')){
              document.getElementById('updateplanduration_error').style.display="none";
            }
            
          }
          else{
            return true
          }
          return true
      }

    }
    //for unlimited check validation
    else if(anyvalidation == 'both'){
      // console.log('call check')
      var plan_check = document.getElementById('plan_check').checked
      // console.log(plan_check)
      if((document.getElementById(textboxid).value.replace(/\s+/g, '') != '' || document.getElementById('plancharge_text').value.replace(/\s+/g, '') != '') && plan_check){
        document.getElementById(errorid).innerHTML=error
        document.getElementById(textboxid).value='';
        document.getElementById('plancharge_text').value = '';
        // document.getElementById(errorid).style.display='block';
        return false
      }
      else{
          document.getElementById(errorid).style.display='none';
          return true
      }
  }
  }

function validateNumberInput(event) {
  const input = event.target;
  const value = input.value;
  // Remove any non-numeric characters
  input.value = value.replace(/[^0-9,.]/g, '');
}

  //create plan function
  function create_plan(){
    //text boxes
    var plan_name = document.getElementById('planname_text').value
    var plan_request = document.getElementById('planupdate_textrequest').value
    var plan_charge = document.getElementById('plancharge_text').value
    var plan_price = document.getElementById('planprice_text').value
    var plan_check = document.getElementById('plan_check').checked
    var plan_duration = document.getElementById('duration_plan').value
    var start_date = document.getElementById('start_date').value
    var end_date = document.getElementById('endd_date').value
    // console.log(start_date)
    //check error
    var checkname = textboxerror('planname_error','planname_text','Plan Name is required.')
    var checkrequest = textboxerror('planrequest_error','planupdate_textrequest','Plan Request is required.','check')
    var checkprice = textboxerror('planprice_error','planprice_text','Plan Price is required.')
    var checkcharge = textboxerror('plancharge_error','plancharge_text','After Charge is required.','check')
    var checkboth = textboxerror('planduration_error','planupdate_textrequest','I think you are confuse between unlimited plan or limited plan please clarify You have Select Unlimited Plan and also enter No.of Request or Charges.','both')
    var checkstart_date = textboxerror('planstartdate_error','start_date','Start-Date is Required.')
    var checkend_date = textboxerror('plandate_error', 'endd_date', 'End_date is Required.')
    // console.log(checkrequest)
    if(checkname && checkrequest && checkprice && checkcharge && checkboth && checkstart_date && checkend_date){
      var checkdate = checkdatediff() //check date difference between start and end date.
      if (checkdate){
        loader.style.display='block';
      //call socket save plan
      if(plan_check){
        chatSocket.send(JSON.stringify({name:plan_name,price:plan_price,duration_id:plan_duration,type:'add_plan',plan_type:'unlimited',start_date:start_date,end_date:end_date}));

      }
      else{
        chatSocket.send(JSON.stringify({name:plan_name,requests:plan_request,after_charge:plan_charge,price:plan_price,duration_id:plan_duration,type:'add_plan',plan_type:'limited',start_date:start_date,end_date:end_date}));

      }

      } 
    }

  }


  //remove notification 
    function removenotification(url){
      loader.style.display='none';
      const notification = document.getElementById('notification');
      notification.innerHTML=" "
      if (url){
          window.location.href=url;

      }
      
  }

  //show notification 
  function shownotification(type_of_error,message,url){
      loader.style.display='block';
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

 

  $(window).on( 'load' ,function() {
    if (window.innerWidth < 768) {
      // console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  })


  // on the change of duration dropdown change the start and end date.
    function change_date(){
      var durationselectedid = document.getElementById('duration_plan').value
      var days = document.getElementById('durationdays'+durationselectedid).value
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;
      const selectedDate = new Date(today);
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + Number(days));
      // Format date to yyyy-mm-dd
      const year1 = newDate.getFullYear();
      const month1 = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const day1 = ('0' + newDate.getDate()).slice(-2);
      const formattedDate = `${year1}-${month1}-${day1}`;
      // console.log('no of days',days)

      //for check existing date range is big
      var star_date = document.getElementById('start_date').value
      var end_date = document.getElementById('endd_date').value
      var tempdate = new Date(star_date)
      var tempdate1 = new Date(end_date)
      var datediff = tempdate1.getTime() - tempdate.getTime()
      var datediffinday = datediff/(1000 * 60 * 60 * 24)
      // console.log('date diffrence in days',datediffinday)
      if(datediffinday <= days)
      {
        if(document.getElementById('start_date')){
          document.getElementById('start_date').value=today;
        }
        if (document.getElementById('endd_date')){
          document.getElementById('endd_date').value=formattedDate;
        }
      }
      if(!datediffinday){
        if(document.getElementById('start_date')){
          document.getElementById('start_date').value=today;
        }
        if (document.getElementById('endd_date')){
          document.getElementById('endd_date').value=formattedDate;
        }

      }

      //for call this function 
    }

    // on the submission of plan create check the start and end date duration match or not.
    function checkdatediff(trype=''){
      var durationselectedid = document.getElementById('duration_plan').value
      var days = document.getElementById('durationdays'+durationselectedid).value
      var star_date = document.getElementById('start_date').value
      var end_date = document.getElementById('endd_date').value
      if(trype == ''){
        var tempdate = new Date(star_date)
      }
      else{
        var tempdate = new Date();

      }
      var tempdate1 = new Date(end_date)
      var datediff = tempdate1.getTime() - tempdate.getTime()
      var datediffinday = datediff/(1000 * 60 * 60 * 24)
      // console.log('date diffrence in days',datediffinday)
      if(Number.isNaN(datediffinday)){
        document.getElementById('plandate_error').innerHTML = 'Start or End Date any of not Selected.';
        document.getElementById('plandate_error').style.display="block";
        return false
      }

      if(datediffinday < days)
      {
        document.getElementById('plandate_error').innerHTML = 'Please Selected Duration and Date Range same or date range is bigger.';
        document.getElementById('plandate_error').style.display="block";
        return false
      }
      else if(datediffinday == days && datediffinday >=0){
        if(conformationfun('Selecte Date range and duration is same you can countinue with this.')){
          return true
        }
        else{
          return false
        }
      }
      else{
        document.getElementById('plandate_error').style.display="none";
        return true
      }
    }

    // on the load of windows make restric of selecting start and end date.
    function daterestrict(type=''){
      var dtToday = new Date();
      
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(month < 10)
          month = '0' + month.toString();
      if(day < 10)
          day = '0' + day.toString();
      
      var maxDate = year + '-' + month + '-' + day;
  
      // or instead:
      // var maxDate = dtToday.toISOString().substr(0, 10);
      $('#start_date').attr('min', maxDate);
      $('#endd_date').attr('min', maxDate);
    };
    
    // before the delete plan check the active user of the plan.
    function delete_plan(id){
        $.ajax({
          url : "/admin/updateplan_beforecheck",
          data : {'id':id},
          type : 'GET',
          success : function(res){
            if (res['success']){
              //socketcall
              if(conformationfun('You are sure To delete.'))
              {
                loader.style.display='block';
                chatSocket.send(JSON.stringify({id:id,type:'delete_plan'}));
              }
              
            }
            else if(res['error']){
              shownotification('error','This Plan have Buyer..')
            }
            else{
              shownotification('error','Something Went Wrong.')
            }

          }
        })
      }


      //for the conformation function 
      function conformationfun(text) {
        if (confirm(text) == true) {
          return true
        } else {
          return false
        }
      }

      //table filtering of tha subscritpion-master.
      function tablefilter(check=''){
        document.getElementById('plan_table_body').innerHTML=''
        all_date = document.getElementById('alldata').value
        duration_data = document.getElementById('jsone_duration').value
        data = JSON.parse(all_date)
        duration = JSON.parse(duration_data)
//        // console.log('this is json data',data)
        type = 'all'
        // Loop through each radio button to find the checked one
        const radios = document.querySelectorAll('input[name="btnradio"]');
        for (const radio of radios) {
          if (radio.checked) {
            // Return the value or ID of the checked radio button
            type =  radio.title;  // Or you can return radio.value if you have values set
          }
        }
        if (type == 'all'){
          counter = 1
          for (var i=0;i<data.length;i++){
            for (var j=0;j<duration.length;j++){
              if(duration[j]['pk'] == data[i]['fields']['duration_id']){
                duration_temp = duration[j]['fields']['duration']
              }
  
            }
          date1 = new Date(data[i]['fields']['start_date'])
          date2 = new Date(data[i]['fields']['end_date'])
          new_tr = " <tr id='plan"+data[i]['pk']+"'> <td>"+(i+1)+"</td> <td id='planname"+data[i]['pk']+"'>"+data[i]['fields']['plan_name']+"</td>"
          if (data[i]['fields']['is_unlimited']){
            new_tr+="<td colspan='2' id='planrequest"+data[i]['pk']+"'>Unlimited</td> "
          }
          else{
            new_tr += "<td id='planrequest"+data[i]['pk']+"' >"+data[i]['fields']['plan_request']+"</td> <td id='planafter"+data[i]['pk']+"' >"+data[i]['fields']['after_charge']+"</td>"
          }
          new_tr +="<td id='planprice"+data[i]['pk']+"'>"+data[i]['fields']['price']+"</td> <td id='planstart"+data[i]['pk']+"' >"+data[i]['fields']['start_date']+"</td> <td id='planend"+data[i]['pk']+"' >"+data[i]['fields']['end_date']+"</td>  <td id='planduration"+data[i]['pk']+"' >"+duration_temp+"</td>  <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data[i]['pk']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data[i]['pk']+"')></i></td> </tr>"
          //$('#plan_table_body').append(new_tr)
          serchsubscription(data[i],counter);
          counter = counter + 1;
        }
        }
        else if(type == 'unlimited')
        {
          //// console.log(data[i]['fields']['is_unlimited'])
          counter = 1;
          for (var i=0;i<data.length;i++){
            for (var j=0;j<duration.length;j++){
              if(duration[j]['pk'] == data[i]['fields']['duration_id']){
                duration_temp = duration[j]['fields']['duration']
              }
  
            }
          if (data[i]['fields']['is_unlimited']){
            // console.log('this is unlimited')
            new_tr = " <tr id='plan"+data[i]['pk']+"' > <td>"+(i+1)+"</td> <td id='planname"+data[i]['pk']+"'>"+data[i]['fields']['plan_name']+"</td><td colspan='2' id='planrequest"+data[i]['pk']+"'>Unlimited</td><td id='planprice"+data[i]['pk']+"'>"+data[i]['fields']['price']+"</td> <td id='planstart"+data[i]['pk']+"' >"+data[i]['fields']['start_date']+"</td> <td id='planend"+data[i]['pk']+"' >"+data[i]['fields']['end_date']+"</td>  <td id='planduration"+data[i]['pk']+"' >"+duration_temp+"</td>  <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data[i]['pk']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data[i]['pk']+"')></i></td> </tr>"
            // console.log(new_tr)
            // $('#plan_table_body').append(new_tr)
            serchsubscription(data[i],counter);
            counter = counter+1
          }
        }
        }
        else if(type == 'limited'){
          counter = 1
          for (var i=0;i<data.length;i++){
            for (var j=0;j<duration.length;j++){
              if(duration[j]['pk'] == data[i]['fields']['duration_id']){
                duration_temp = duration[j]['fields']['duration']
              }
  
            }
          if (!data[i]['fields']['is_unlimited']){
            new_tr = " <tr id='plan"+data[i]['pk']+"' > <td>"+(i+1)+"</td> <td id='planname"+data[i]['pk']+"'>"+data[i]['fields']['plan_name']+"</td><td id='planrequest"+data[i]['pk']+"' >"+data[i]['fields']['plan_request']+"</td> <td id='planafter"+data[i]['pk']+"' >"+data[i]['fields']['after_charge']+"</td><td id='planprice"+data[i]['pk']+"'>"+data[i]['fields']['price']+"</td> <td id='planstart"+data[i]['pk']+"' >"+data[i]['fields']['start_date']+"</td> <td id='planend"+data[i]['pk']+"' >"+data[i]['fields']['end_date']+"</td>  <td id='planduration"+data[i]['pk']+"' >"+duration_temp+"</td>  <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+data[i]['pk']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+data[i]['pk']+"')></i></td> </tr>"
            serchsubscription(data[i],counter);
            counter = counter+1
            // $('#plan_table_body').append(new_tr)

          }
        } 
        }
        li_append()
        changePage(1)
      }
         // // console.log(data[i])
      //search function
      function serchsubscription(temp_data,counter){
        // console.log(data)
        // console.log(temp_data['pk']);

        var sercch_text = document.getElementById('searchbartext').value
        // console.log(sercch_text.toLowerCase())
        //document.getElementById('plan_table_body').innerHTML=''
        all_date = document.getElementById('alldata').value
        duration_data = document.getElementById('jsone_duration').value
        data = JSON.parse(all_date)
        duration = JSON.parse(duration_data)
        for (var j=0;j<duration.length;j++){
            if(duration[j]['pk'] == temp_data['fields']['duration_id']){
              duration_temp = duration[j]['fields']['duration']
              var search_bool = duration[j]['fields']['duration'].toLowerCase().includes(sercch_text.toLowerCase())
              // console.log(search_bool)
            }
          }
          // console.log(temp_data['fields'])
          if(temp_data['fields']['is_unlimited'] == true){
            var unlimited_bool = ('unlimited').includes(sercch_text.toLowerCase())

            // console.log('this is unlimited ' + sercch_text.toLowerCase().startsWith('u'))
            if (sercch_text.toLowerCase().startsWith('u')){
              unlimited_bool = true
            }
            else{
              unlimited_bool = false
            }
          }
          if(!temp_data['fields']['is_unlimited']){
            var limited_bool = ('limited').includes(sercch_text.toLowerCase())
          }


          if (temp_data['fields']['plan_name'].toLowerCase().includes(sercch_text.toLowerCase()) || String(temp_data['fields']['price']).toLowerCase().includes(sercch_text.toLowerCase()) || String(temp_data['fields']['plan_request']).toLowerCase().includes(sercch_text.toLowerCase()) || search_bool || unlimited_bool || limited_bool || String(temp_data['fields']['after_charge']).toLowerCase().includes(sercch_text.toLowerCase()) || String(temp_data['fields']['start_date']).toLowerCase().includes(sercch_text.toLowerCase()) || String(temp_data['fields']['end_date']).toLowerCase().includes(sercch_text.toLowerCase())){
            new_tr = " <tr id='plan"+temp_data['pk']+"' > <td>"+counter+"</td> <td id='planname"+temp_data['pk']+"'>"+temp_data['fields']['plan_name']+"</td>"
            if (temp_data['fields']['is_unlimited']){
              new_tr+="<td colspan='2' id='planrequest"+temp_data['pk']+"'>Unlimited</td> "
            }
            else{
              new_tr += "<td id='planrequest"+temp_data['pk']+"' >"+temp_data['fields']['plan_request']+"</td> <td id='planafter"+temp_data['pk']+"' >"+temp_data['fields']['after_charge']+"</td>"
            }
            new_tr +="<td id='planprice"+temp_data['pk']+"'>"+temp_data['fields']['price']+"</td> <td id='planstart"+temp_data['pk']+"' >"+temp_data['fields']['start_date']+"</td> <td id='planend"+temp_data['pk']+"' >"+temp_data['fields']['end_date']+"</td>  <td id='planduration"+temp_data['pk']+"' >"+duration_temp+"</td>  <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+temp_data['pk']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+temp_data['pk']+"')></i></td> </tr>"
            $('#plan_table_body').append(new_tr)
            counter=Number(counter)+1
          }
          else if(sercch_text.trim() == ''){
            new_tr = " <tr id='plan"+temp_data['pk']+"' > <td>"+(i+1)+"</td> <td id='planname"+temp_data['pk']+"'>"+temp_data['fields']['plan_name']+"</td>"
            if (temp_data['fields']['is_unlimited']){
              new_tr+="<td colspan='2' id='planrequest"+temp_data['pk']+"'>Unlimited</td> "
            }
            else{
              new_tr += "<td id='planrequest"+temp_data['pk']+"' >"+temp_data['fields']['plan_request']+"</td> <td id='planafter"+temp_data['pk']+"' >"+temp_data['fields']['after_charge']+"</td>"
            }
            new_tr +="<td id='planprice"+temp_data['pk']+"'>"+temp_data['fields']['price']+"</td> <td id='planstart"+temp_data['pk']+"' >"+temp_data['fields']['start_date']+"</td> <td id='planend"+temp_data['pk']+"' >"+temp_data['fields']['end_date']+"</td>  <td id='planduration"+temp_data['pk']+"' >"+duration_temp+"</td>  <td><i class='bx bx-edit-alt' title='Edit' onclick=update_plan('"+temp_data['pk']+"') style='font-size: 30px!important;'></i><i class='bx bx-trash' title='Delete' style='font-size: 30px!important;margin-left:10px;' onclick=delete_plan('"+temp_data['pk']+"')></i></td> </tr>"
            $('#plan_table_body').append(new_tr)
            counter=Number(counter)+1

          }
       

      }
      
      //pagination functions
      var current_page = 1;
      var records_per_page = 2;
      if(document.getElementById("planlimitedtable")){
        var l = document.getElementById("planlimitedtable").rows.length
        var Totle_Pages = Math.ceil((l-1)/records_per_page)
        // console.log(Totle_Pages)
        if (Totle_Pages > 1){
          prev_li = "<li style='display:block;' class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
          $('#subscriptionpagination').append(prev_li)
          for (var i=1;i<=Totle_Pages;i++){
            if(i==1){
              // console.log(i)
              var new_li = "<li id='pagination1' style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
              $('#subscriptionpagination').append(new_li);

            }
            else if(i==Totle_Pages){
              var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
              $('#subscriptionpagination').append(new_li);

            }
            else{
              var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
              $('#subscriptionpagination').append(new_li);

            }
          }
          next_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
          $('#subscriptionpagination').append(next_li)
        }

      }
      
      //on the click of previous page dot call
      function prevPagedot()
      {
        // console.log('previ' +current_page)

          if (current_page > 2) {
              current_page-=2;
              changePage(current_page);
          }
      }
      
      //on the click of previous page the function call.
      function prevPage()
      {
        // console.log('previ' +current_page)

          if (current_page > 1) {
              current_page--;
              changePage(current_page);
          }
      }

      //for the next dot pagination
      function nextPagedot()
      {
        // console.log('next' + current_page)
          if (current_page < numPages()) {
              current_page+=2;
              changePage(current_page);
          }
      }

      // for the next page pagination.
      function nextPage()
      {
        // console.log('next' + current_page)
          if (current_page < numPages()) {
              current_page++;
              changePage(current_page);
          }
      }
      

      // change page using page number as parameter in function.
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

          for(var k=1 ; k<=Totle_Pages;k++){
            if(document.getElementById('pagination'+k)){
              if (page == k){
                li = document.querySelector('#pagination'+k)
                li.classList.add('active')
              }
              else
              {
                li = document.querySelector('#pagination'+k)
                li.classList.remove('active')
              }

            }
          }

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
          
          
          if(document.getElementById("priviousbtn"))
          {
            if (page == 1) {
              btn_prev.style.display = "none";
              
          } else {
              btn_prev.style.display = "block"; 
              
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
          if (btn_nextdot){
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

      //change the pagesize of using dropdown to select how many record per page.
      function chengepagesize(){
        page_size = document.getElementById('selectpagesize').value
        records_per_page = Number(page_size)
        li_append()
        changePage(1)
      }
      function li_append(){
        document.getElementById('subscriptionpagination').innerHTML=''
        if(document.getElementById("planlimitedtable")){
          l = document.getElementById("planlimitedtable").rows.length
          Totle_Pages = Math.ceil((l-1)/records_per_page)
          // console.log(Totle_Pages)
          if (Totle_Pages > 1){
            prev_li = "<li style='display:block;' class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
            $('#subscriptionpagination').append(prev_li)
            if (Totle_Pages > 5){
              for (var i=1;i<=Totle_Pages;i++){
                if(i==1){
                  // console.log(i)
                  var new_li = "<li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
                  $('#subscriptionpagination').append(new_li);
    
                }
                else if(i==Totle_Pages){
                  var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#subscriptionpagination').append(new_li);
    
                }
                else{
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#subscriptionpagination').append(new_li);
    
                }
              }
            }
            else{
              for (var i=1;i<=Totle_Pages;i++){
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#subscriptionpagination').append(new_li);  
              }
            }
            next_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
            $('#subscriptionpagination').append(next_li)
          }
  
        }
      }
    
    

      //create of subscripion plan before check duration is available or not.
      function check_duration(){
        $.ajax({
          url : "/admin/check_duration",
          type : 'GET',
          success:function(res){
            // console.log(res)
            if(res == 'success'){
              window.location.href = '/admin/master/subscription/create'
            }
            else{
              shownotification('error','Please first create duration.')
            }

          }
        })
      }

      $(window).on( 'load' ,function() {
        if (window.innerWidth < 768) {
          // console.log('this')
          sidebar.classList.add("close");
        } else {
          sidebar.classList.remove("close");
        }
      })

      //before 
      function update_plan(id){
        $.ajax({
          url : '/admin/updateplan_beforecheck',
          type : 'GET',
          data : {'id':id},
          success : function(res){
            // console.log(res)
            if(res['success']){
              loader.style.display='block';
              window.location.href = "/admin/master/subscription/update?id="+id+""
            }
            else if(res['error']){
              window.location.href = "/admin/master/subscription/update?id="+id+""
            }
            else{
              shownotification('error','something went wrong.')
            }
            
          }
        })
      }

      function convertDateFormat(inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        // Return the formatted date
        return `${year}-${month}-${day}`;
      }


      //on the update of subscription plan check user update or not if not then update button disbled for user
      function comaprevaluewithold(){
        // console.log('call')
        //old value
        var old_name = document.getElementById('old_planname').value;
        var old_request = document.getElementById('old_planrequest').value;
        var old_aftercharge = document.getElementById('old_aftercharge').value;
        var old_startdate = document.getElementById('old_startdate').value;
        var old_enddate = document.getElementById('old_enddate').value;
        var old_isunlimited = document.getElementById('old_limited').value;
        var old_durationid = document.getElementById('old_duration').value;
        var old_price = document.getElementById('old_price').value;
        var old_startdatec = convertDateFormat(old_startdate);
        var oldend_datec = convertDateFormat(old_enddate);
        // console.log('old_date is',old_name,old_request,old_aftercharge,old_startdatec,oldend_datec,old_isunlimited,old_durationid,old_price)
        
        //new value
        var plan_name = document.getElementById('planupdate_textname').value;
        var plan_request = document.getElementById('planupdate_textrequest').value;
        var plan_charge = document.getElementById('plancharge_text').value;
        var plan_price = document.getElementById('planupdate_textprice').value;
        var plan_check = document.getElementById('plan_check').checked;
        var plan_duration = document.getElementById('duration_plan').value;
        var start_date = document.getElementById('start_date').value;
        var end_date = document.getElementById('endd_date').value;
        var plan_id = document.getElementById('update_id').value;
        // console.log('new data',plan_name,plan_request,plan_charge,start_date,end_date,plan_check,plan_duration,plan_price)
        if ((old_name.trim() == plan_name.trim()) && (old_price == plan_price) && (old_startdatec == start_date) && (oldend_datec == end_date) && (old_durationid == plan_duration)  &&(old_isunlimited.toLowerCase() == String(plan_check))){
          if((old_aftercharge == plan_charge) && (old_request == plan_request)){
            // console.log('false compare')
            document.getElementById('updateplanbtn').style.display="none";
            document.getElementById('noupdate').style.display="block";
          }
          else{
            // console.log('compare1')
            document.getElementById('noupdate').style.display="none";
            document.getElementById('updateplanbtn').style.display="block";
          }

        }
        else{
            // console.log('compare2')
            document.getElementById('noupdate').style.display="none";
            document.getElementById('updateplanbtn').style.display="block";

        }

      }

      //on the update of subscription
      function plan_update_save(){
        var havebuyer = document.getElementById('havebuyer').value
        // console.log(havebuyer)
        if (havebuyer=='no'){
          var plan_name = document.getElementById('planupdate_textname').value
          var plan_request = document.getElementById('planupdate_textrequest').value
          var plan_charge = document.getElementById('plancharge_text').value
          var plan_price = document.getElementById('planupdate_textprice').value
          var plan_check = document.getElementById('plan_check').checked
          var plan_duration = document.getElementById('duration_plan').value
          var start_date = document.getElementById('start_date').value
          var end_date = document.getElementById('endd_date').value
          var plan_id = document.getElementById('update_id').value
          // console.log(start_date)
          //erro
          //error check 
          var checkname = textboxerror('updateplanname_error','planupdate_textname','Plan Name is Required.')
          var checkrequest = textboxerror('updateplanrequest_error','planupdate_textrequest','Plan Request is Required.','check')
          var checkprice = textboxerror('updateplanprice_error','planupdate_textprice','Plan Price is Required.')
          var checkftercharge = textboxerror('updateplancharge_error','plancharge_text','After Per Charge is Required.','check')
          var checkstart_date = textboxerror('updateplanstartdate_error', 'start_date', 'Start-Date is Required.')
          var checkend_date = textboxerror('updateplanenddate_error','endd_date', 'End-Date is Required.')
          //var checkenddate = textboxerror('plandate_error','updatendd_date','End Date is Required.')
          var checkunlimted = textboxerror('updateplanduration_error','planupdate_textrequest','I think You`r Confuse between Unlimited and Limited Plan Please Check Again.','both')
          if(end_date){
            document.getElementById('plandate_error').style.display="none";
            checkenddate =true
          }
          else{
            document.getElementById('plandate_error').innerHTML = 'End Date is Required.';
            document.getElementById('plandate_error').style.display="block";
            checkenddate=false
          }
          var checkdiff = checkdatediff()
          if(checkname && checkrequest && checkprice && checkftercharge && checkenddate && checkunlimted && checkdiff && checkstart_date && checkend_date){
            loader.style.display='block';
            chatSocket.send(JSON.stringify({name:plan_name,requests:plan_request,after_charge:plan_charge,price:plan_price,duration_id:plan_duration,type:'Update_plan',start_date:start_date,end_date:end_date,is_unlimited:plan_check,id:plan_id,havebuyer:'no'}));
          }
        }
        else{
          var plan_id = document.getElementById('update_id').value
          var end_date = document.getElementById('endd_date').value
          var checkend_date = textboxerror('updateplanenddate_error','endd_date', 'End-Date is Required.')
          if(checkend_date){
            var checkdiff = checkdatediff('update');
            if (checkdiff){
              chatSocket.send(JSON.stringify({type:'Update_plan',end_date:end_date,id:plan_id,havebuyer:'yes'}));
            }
          }
        }

      }

      //for the show the calender on click of calender box
      function showcalender(id){
        var datepicker = document.getElementById(id)
        datepicker.showPicker();
      }

      
      