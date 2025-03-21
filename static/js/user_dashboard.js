const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

$(window).resize(function() {
    if (window.innerWidth < 768) {
      // console.log('this')
      sidebar.classList.add("close");
    } else {
      sidebar.classList.remove("close");
    }
  })

chatSocket = new WebSocket('ws://' + window.location.host + '/ws/subscription/');

//when soket is connect success
      chatSocket.onopen = function (e) {
      // console.log("The connection was setup successfully !");
      };

      chatSocket.onerror = function(error) {
          alert('something went wrong')
          window.location.href="/dashbord_page"
      }

      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if (data['type'] == 'plan_add'){
          if(data['status'] == 'success'){
            main_div = document.getElementById('plan_cards');
            child_div = main_div.getElementsByTagName('div')
            display_style = 'none';
            if (child_div.length >= 6){
                if(document.getElementById('dashboard_load_more_btn')){
                    document.getElementById('dashboard_load_more_btn').style.display="block";
                }
                if (document.getElementById('loademore')){
                    // console.log(document.getElementById('loademore').style.display)
                    if (document.getElementById('loademore').style.display==='none'){
                        display_style = 'block';
                        // console.log('call the block')
                    }
                    else{
                        display_style = 'none';
                    }
                }
                else{
                    display_style = 'none';
                }

            }
            else{
                display_style = 'block';
            }
            if (data['plan_type'] == 'unlimited'){
              new_data="<div id='planid"+data['plan_id']+"' style='display:"+display_style+"' class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-green-500 mb-6'><h3 class='text-3xl font-bold text-green-900 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+"</span> </h3><ul class='text-lg text-green-500 mb-6'> <li>Totle Request : Unlimited</li> </ul> <button onclick=buynow('"+data['plan_id']+"') class='buy-btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> <input type='hidden' value='"+data['duration']+"' id='duration"+data['plan_id']+"'></div>"
             }
           else{
              new_data="<div id='planid"+data['plan_id']+"' style='display:"+display_style+"' class='price-col border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-blue-500 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-blue-500 mb-6'> <h3 class='text-3xl font-bold text-blue-900 mb-6'> ₹ "+data['price']+"/<span class='text-lg'>"+data['duration']+"</span> </h3> <ul class='text-lg text-blue-900 mb-6'> <li>Totle Request :  "+data['request']+"</li> <li>After Per Req. Charge : "+data['after_cost']+"</li> </ul> <button onclick=buynow('"+data['plan_id']+"') class='buy-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> <input type='hidden' value='"+data['duration']+"' id='duration"+data['plan_id']+"'></div>"
             }
         if (document.getElementById('empty_plan_error')){
            if (document.getElementById('empty_plan_error').style.display != 'none'){
                document.getElementById('empty_plan_error').style.display = 'none';
            }
         }
         $('#plan_cards').append(new_data)
          }
          
        }
      else if (data['type'] == 'buy_plan'){
        // console.log(data['plan_type'])
        window.location.href='/userplan_page'
        /*if (data['plan_type'] == 'unlimited'){
          // console.log('unlimited')
          new_data="<div class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-green-500 mb-6'><ul class='text-lg text-green-500 mb-6'> <li>Totle Request : Unlimited</li><li>Plan Expire On  : "+data['enddate']+"</li> </ul></div>"
         }
       else{
          new_data="<div class='price-col border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-blue-500 font-semibold mb-4'> "+data['plan_name']+" </p> <hr class='w-12 border border-blue-500 mb-6'><ul class='text-lg text-blue-900 mb-6'> <li>Totle Request :  "+data['request']+"</li> <li>After Per Req. Charge : "+data['after_cost']+"</li><li>Plan Expire On  :  "+data['enddate']+"</li> </ul></div>"
         }
         $('#plan_cards_buy').append(new_data)
         document.getElementById('planid'+data['plan_id']).remove()*/
      }
      }


      //when oket is close or disconnect
      chatSocket.onclose = function (e) {
          // console.log("Something unexpected happened !");
      };
      

      function go_dashboard(){
        window.location.href = "http://localhost:8000/"
        if (window.innerWidth < 768) {
          // console.log('this')
          sidebar.classList.add("close");
        } else {
          sidebar.classList.remove("close");
        }
      }
        function removenotification(url){
          const notification = document.getElementById('notification');
          notification.innerHTML=" "
          // console.log('passing url',url)
          if (url){
              window.location.href=url;

          }
          
      }

      function shownotification(type_of_error,message,url){
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
      function planbuy(duration,plan_id,Plan_name){
        
      }
      function buynow(id){
        $.ajax({
          url : '/checkuser_subscription',
          type : 'POST',
          data : {'id':id},
          success : function(res){
            // console.log(res)
            if(res['unlimited']){
              shownotification('error','you have already unlimited active plan.')
            }
            else if(res['success']){
              shownotification('error','you have already active plan.')
            }
            else if(res['noofdayleft']){
              var temp = conformationfun('This Plan Have No More Active No.Of Days Left for This Plan Expire '+res['noofdayleft']+' if You Continue with this, then your plan validity is '+res['noofdayleft']+' days')
              if(temp){
                var duration = document.getElementById('duration'+id).value
                chatSocket.send(JSON.stringify({'type':'buy_plan','id':id,'duration':duration}))
              }
            }
            else if(res['after_charge']){
              var temp = conformationfun('You have active plan and access with extra charge if you cancal then new plan buy')
              if(!conformationfun('You have active plan and access with extra charge if you cancal then new plan buy')){
                var duration = document.getElementById('duration'+id).value
                // console.log(duration)
                chatSocket.send(JSON.stringify({'type':'buy_plan','id':id,'duration':duration}))
              }
            }
            else if(res['after_chargee']){
              var temp = conformationfun('You have Active plan but no of request is empty for OK for continue with existing plan CANCEL for New Plan.')
              // console.log(temp)
              if(!temp){
                // console.log('call buy plan')
                var duration = document.getElementById('duration'+id).value
                // console.log(duration)
                chatSocket.send(JSON.stringify({'type':'buy_plan','id':id,'duration':duration}))
              }
              else{
                $.ajax({
                  url : '/aftercharge_active',
                  type : 'GET',
                  success : function(res){
                    if(res['success']){

                      shownotification('success','Now You access Api with extra charge','/apicall_page')
                    }
                    else{
                      shownotification('error',res['error'])
                    }
                  }
                })
              }
            }
            else if(res['buyplan']){
                var duration = document.getElementById('duration'+id).value
                // console.log(duration)
                chatSocket.send(JSON.stringify({'type':'buy_plan','id':id,'duration':duration}))
            }
          }
        })
        
      }

      function showyourplan(){
        window.location.href = '/userplan_page'
      }

      function search(){
        data = JSON.parse(document.getElementById('all_data').value)
        duration = JSON.parse(document.getElementById('duration_json').value)
        sercch_text = document.getElementById('serach_text').value
        document.getElementById('plan_cards').innerHTML=''
        //// console.log(sercch_text.toLowerCase().trim())
        // console.log(duration)
        for (var i=0;i<data.length;i++){
          for (var j=0;j<duration.length;j++){
            if(duration[j]['pk'] == data[i]['fields']['duration_id']){
              duration_temp = duration[j]['fields']['duration']
              var search_bool = duration[j]['fields']['duration'].toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, ''))
              //// console.log(search_bool)
            }
          }
    
          
          //.log(data[i]['fields']['plan_name'].toLowerCase().replace(/\s+/g, ''))
          if(data[i]['fields']['is_unlimited'] == true){
            var unlimited_bool = ('unlimited').includes(sercch_text.toLowerCase().replace(/\s+/g, ''))
            
            //// console.log('this is unlimited ' + sercch_text.toLowerCase().startsWith('u'))
            if (sercch_text.toLowerCase().startsWith('u')){
              unlimited_bool = true
            }
            else{
              unlimited_bool = false
            }
          }
          if(!data[i]['fields']['is_unlimited']){
            var limited_bool = ('limited').includes(sercch_text.toLowerCase().replace(/\s+/g, ''))
          }
          if (data[i]['fields']['plan_name'].toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || String(data[i]['fields']['price']).toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || String(data[i]['fields']['plan_request']).toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || search_bool || unlimited_bool || limited_bool || String(data[i]['fields']['after_charge']).toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || String(data[i]['fields']['start_date']).toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || String(data[i]['fields']['end_date']).toLowerCase().replace(/\s+/g, '').includes(sercch_text.toLowerCase().replace(/\s+/g, '')) || sercch_text.replace(/\s+/g, '') == ''){
            if(data[i]['fields']['is_unlimited'] == true){
                new_data = "<div style='display:none' id='planid"+data[i]['pk']+"' class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'> "+data[i]['fields']['plan_name'].toUpperCase()+" </p> <hr class='w-12 border border-green-500 mb-6'> <h3 class='text-3xl font-bold text-red-500 mb-6'> ₹ "+data[i]['fields']['price']+"/<span class='text-lg'> "+duration_temp+" <input type='hidden' value='"+duration_temp+"' id='duration"+data[i]['pk']+"'> </span> </h3> <ul class='text-lg text-green-500 mb-6'> <li>Totle Request : Unlimited</li> </ul> <button onclick=buynow('"+data[i]['pk']+"') class='buy-btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> </div>"
              
            } 
            else{
                new_data = "<div style='display:none' id='planid"+data[i]['pk']+"' class='price-col border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-blue-500 font-semibold mb-4'> "+data[i]['fields']['plan_name'].toUpperCase()+" </p> <hr class='w-12 border border-blue-500 mb-6'> <h3 class='text-3xl font-bold text-red-500 mb-6'> ₹ "+data[i]['fields']['price']+"/ <span class='text-lg' > "+duration_temp+" <input type='hidden' value='"+duration_temp+"' id='duration"+data[i]['pk']+"'> </span> </h3> <ul class='text-lg text-blue-900 mb-6'> <li>Totle Request : "+data[i]['fields']['plan_request']+"</li> <li>After Per Req. Charge : "+data[i]['fields']['after_charge']+"</li> </ul> <button onclick=buynow('"+data[i]['pk']+"') class='buy-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> </div>"
    
            } 
            $('#plan_cards').append(new_data);
        }
        loadmore()
        
        
      }
    }
    function temp(){
      var l = document.getElementById("plan_cards").getElementsByTagName('div').length
      // console.log(l)
    }


    function loadmore(type=''){
      // console.log(type)
      main_div = document.getElementById('plan_cards');
      child_div = main_div.getElementsByTagName('div')
      const blocks = Array.from(child_div).filter(child_div => {
        return getComputedStyle(child_div).display === 'block'; // Filter elements with display: block
      });
      if(document.getElementById('loademore')){
        document.getElementById('loademore').style.display="block";
      }
      //// console.log(blocks)
      //// console.log('this is the length of chiled div',child_div.length)
      var start=0
      var end=0
      if(blocks.length <=6){
        end=blocks.length
        if(child_div.length<=6){
          document.getElementById('loademore').style.display="none";

        }
      }
      else
      {
        end=6
        if(child_div.length<=6){
          document.getElementById('loademore').style.display="none";
        }
      }
      if(type=='more'){
        end=blocks.length+3
        var remaining = child_div.length - end
        if(remaining <= 0){
          document.getElementById('loademore').style.display="none";
        }
      }
      else{
        end=6
      }
      for(i=0; i<end;i++){
        if(child_div[i]){
          child_div[i].style.display="block";
        }
        
      }
      
      
       
      var messageBody = document.querySelector('#plan_cards');
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

    }

    function display_div(type=''){
      //// console.log(type)
      main_div = document.getElementById('plan_cards');
      child_div = main_div.getElementsByTagName('div')
      //// console.log('this is the length of chiled div',child_div.length)
      
      data = JSON.parse(document.getElementById('all_data').value)
      duration = JSON.parse(document.getElementById('duration_json').value)
      // sercch_text = document.getElementById('serach_text').value
      document.getElementById('plan_cards').innerHTML=''
      for (var i=0;i<data.length;i++){
        for (var j=0;j<duration.length;j++){
          if(duration[j]['pk'] == data[i]['fields']['duration_id']){
            duration_temp = duration[j]['fields']['duration']
          }
        }
        //.log(data[i]['fields']['plan_name'].toLowerCase().replace(/\s+/g, ''))
        if(data[i]['fields']['is_unlimited'] == true){
              new_data = "<div style='display:none' id='planid"+data[i]['pk']+"' class='price-col border border-green-500 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-green-500 font-semibold mb-4'> "+data[i]['fields']['plan_name'].toUpperCase()+" </p> <hr class='w-12 border border-green-500 mb-6'> <h3 class='text-3xl font-bold text-red-500 mb-6'> ₹ "+data[i]['fields']['price']+"/<span class='text-lg'> "+duration_temp+" <input type='hidden' value='"+duration_temp+"' id='duration"+data[i]['pk']+"'> </span> </h3> <ul class='text-lg text-green-500 mb-6'> <li>Totle Request : Unlimited</li> </ul> <button onclick=buynow('"+data[i]['pk']+"') class='buy-btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> </div>"
            
          } 
          else{
              new_data = "<div style='display:none' id='planid"+data[i]['pk']+"' class='price-col border border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-lg transform hover:scale-105 transition-transform duration-300'> <p class='text-lg text-blue-500 font-semibold mb-4'> "+data[i]['fields']['plan_name'].toUpperCase()+" </p> <hr class='w-12 border border-blue-500 mb-6'> <h3 class='text-3xl font-bold text-red-500 mb-6'> ₹ "+data[i]['fields']['price']+"/ <span class='text-lg' > "+duration_temp+" <input type='hidden' value='"+duration_temp+"' id='duration"+data[i]['pk']+"'> </span> </h3> <ul class='text-lg text-blue-900 mb-6'> <li>Totle Request : "+data[i]['fields']['plan_request']+"</li> <li>After Per Req. Charge : "+data[i]['fields']['after_charge']+"</li> </ul> <button onclick=buynow('"+data[i]['pk']+"') class='buy-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out'>Buy Now </button> </div>"
  
          } 
          $('#plan_cards').append(new_data);

      }
        
        var messageBody = document.querySelector('#plan_cards');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }


    function Apipage(){
      myDailyFunction()
      if ('Userplan' in localStorage){
        var tempvar = localStorage.getItem('Userplan')
        // console.log(tempvar)
      }
      else{
        var tempvar = localStorage.getItem('Userplan')
  
      }
      if(tempvar == 'true'){
        window.location.href = '/apicall_page'
        }
      else{
        shownotification('error','You Don`t have active plan.')
      }
    }


      function Beautifyjson(type=''){
        if(type == ''){
          try{
            var json_body = document.getElementById('getbody').value
            new_json  = JSON.stringify(JSON.parse(json_body),null,4)
            document.getElementById('getbody').value=''
            document.getElementById('getbody').value=new_json
          }
          catch(err){
            shownotification('error','Enter Valid Json like {"name":"example"}')
          }
        }
        else{
          try{
            var json_body = document.getElementById('responsedata').value
            new_json  = JSON.stringify(JSON.parse(json_body),null,4)
            document.getElementById('responsedata').value=''
            document.getElementById('responsedata').value=new_json
          }
          catch(err){
            err
          }

        }

      }
      if(document.getElementById('responsedata')){
        
        document.getElementById('responsedata').addEventListener('focus', function() {
          this.style.border = 'none'; /* Hide the border on focus */
          this.style.outline = 'none'; /* Remove the outline */
      });

      }
/*
      function responceraw(){
        try{
          var json_body = document.getElementById('responsedata').value
          new_json  = json_body.replace(/\s+/g, '');
          document.getElementById('responsedata').value=''
          document.getElementById('responsedata').value=new_json
        }
        catch(err){
          shownotification('error','Enter Valid Json like {"name":"example"}')
        }

      }*/

      function responceraw() {
        try {
            var input = document.getElementById('responsedata').value;
            var parsed_json;
            var formatted_output;
    
            // Check if the input is JSON
            try {
                parsed_json = JSON.parse(input);
                // Format JSON with indentation
                formatted_output = JSON.stringify(parsed_json);
            } catch (jsonError) {
                // If JSON.parse fails, treat input as a plain string
                formatted_output = input.replace(/\s+/g, '');
            }
    
            // Set the formatted output back to the element
            document.getElementById('responsedata').value = formatted_output;
        } catch (err) {
            // Display error notification if any unexpected error occurs
            shownotification('error', 'An unexpected error occurred.');
        }
     }

     function copyresponce(){
        const textarea = document.getElementById('responsedata');
        const textToCopy = textarea.value;

        // Create a temporary textarea element to hold the text to be copied
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = textToCopy;
        document.body.appendChild(tempTextarea);

        // Select and copy the text from the temporary textarea
        tempTextarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea element
        document.body.removeChild(tempTextarea);
        shownotification('success','copied.')
     }
     if(document.getElementById("apiurl")){
          document.getElementById("apiurl").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                call_api_route();
            }
        });
     }


      function call_api_route(){
        if ('Userplan' in localStorage){
          var tempvar = localStorage.getItem('Userplan')
          // console.log(tempvar)
        }
        else{
          myDailyFunction()
          var tempvar = localStorage.getItem('Userplan')
    
        }
        if(tempvar == 'true'){
          api_url = document.getElementById('apiurl').value
          api_method = document.getElementById('selectmethod').value
          // console.log(api_method)
          // console.log('api url',api_url)
          if (api_url.trim() != ''){
            // console.log('call api')
            try{
              body_value = (document.getElementById('getbody').value)
              if(body_value){
                // console.log('post')
                $.ajax({
                  url : api_url,
                  type : api_method,
                  data : {'bodydata':document.getElementById('getbody').value},
                  success : function(res,textStatus, jqXHR){
                    document.getElementById('responsediv').innerHTML=''
                    response(res,textStatus, jqXHR)
                  },
                  error : function(jqXHR, textStatus, errorThrown){
                    errorhandel(jqXHR, textStatus, errorThrown)
                  }
                })
              }
              else{
                $.ajax({
                  url : "http://localhost:8000"+api_url,
                  type : api_method,
                  success : function(res,textStatus, jqXHR){
                    document.getElementById('responsediv').innerHTML=''
                    response(res,textStatus, jqXHR)
                  },
                  error : function(jqXHR, textStatus, errorThrown){
                    errorhandel(jqXHR, textStatus, errorThrown)
                  }
                })
              }
            }
            catch(err){
              // console.log(err)
              // console.log('get')
              if(document.getElementById('getbody').value!=''){
                shownotification('error','Please Enter Valid Json Data.')
              }
              else{
                $.ajax({
                  url : "http://localhost:8000"+api_url,
                  type : api_method,
                  success : function(res,textStatus, jqXHR){
                    document.getElementById('responsediv').innerHTML=''
                    response(res,textStatus, jqXHR)
                  },
                  error : function(jqXHR, textStatus, errorThrown){
                    errorhandel(jqXHR, textStatus, errorThrown)
                  }
                })

              }
              
            } 
            
          }
          else{
            // console.log('check one')
            shownotification('error','Enter Url.')
          }
        }
        else{
          shownotification('error','Your plan expire plase buy plan')
        }

        function errorhandel(jqXHR, textStatus, errorThrown){
          document.getElementById('responseshow').style.display="block";
          document.getElementById('responsedata').value=''
          if (jqXHR.status === 404) {
            document.getElementById('responsediv').innerHTML = ''
            document.getElementById('responsedata').value = errorThrown
            document.getElementById('status').innerHTML="<sup style='font-size:15px;'>Status :<b style='color:green;'> "+jqXHR.status+" </b></sup>"
            shownotification('error', 'The requested endpoint was not found.');
          } else if (jqXHR.status === 500) {
            document.getElementById('responsediv').innerHTML = ''
            document.getElementById('responsedata').value = errorThrown
            document.getElementById('status').innerHTML="<sup style='font-size:15px;'>Status :<b style='color:green;'> "+jqXHR.status+" </b></sup>"
              shownotification('error', 'An internal server error occurred.');
          } else {
            document.getElementById('responsediv').innerHTML = ''
            document.getElementById('responsedata').value = errorThrown
            document.getElementById('status').innerHTML="<sup style='font-size:15px;'>Status :<b style='color:green;'> "+jqXHR.status+" </b></sup>"
              shownotification('error', 'An unexpected error occurred: ' + textStatus);
          }

        }


        function response(res,textsuccess,jqXHR){
          //var data = JSON.parse(res)
          if (res['success']){
            document.getElementById('responseshow').style.display="block";
            document.getElementById('responsediv').innerHTML = ''
            const formattedJson = JSON.stringify(res, null, 4);
            document.getElementById('responsedata').value = ''
            document.getElementById('responsedata').value = formattedJson
            document.getElementById('status').innerHTML="<sup style='font-size:15px;'>Status :<b style='color:green;'> "+jqXHR.status+" </b></sup>"
          }
          else if(res['accessend']){
            // console.log('acess empty')
            temp_bool = conformationfun('Your No access is Empty You want to access as per extra charge')
            if(!temp_bool){
              go_dashboard()
            }
            else{
              $.ajax({
                url : '/aftercharge_active',
                type : 'GET',
                success : function(res){
                  if(res['success']){
                    shownotification('success','Now You access Api with extra charge')
                  }
                  else{
                    document.getElementById('responsediv').innerHTML = ''
                    document.getElementById('responsedata').innerHTML = JSON.stringify(res)
                  }
                }
              })

            }
          }
          else{
            document.getElementById('responsediv').innerHTML = ''
            document.getElementById('responsedata').innerHTML = JSON.stringify(res)
          }
        }

      }

      function conformationfun(text) {
        if (confirm(text) == true) {
          return true
        } else {
          return false
        }
      }

    function myDailyFunction() {
      $.ajax({
        url : '/checkuser_subscription',
        type : 'GET',
        success : function(res){
          if (res['success']){
            localStorage.setItem('Userplan', true);
          }
          else{
            localStorage.setItem('Userplan', false);
          }
        }
      })
    }

    function getMillisecondsUntilNextExecution(targetHour, targetMinute) {
      const now = new Date();
      const nextExecution = new Date(now);
      nextExecution.setHours(targetHour, targetMinute, 0, 0);
      
      if (now > nextExecution) {
          nextExecution.setDate(now.getDate() + 1);
      }

      return nextExecution - now;
    }

    const targetHour = 10; // 10
    const targetMinute = 15; // 15 minutes past the hour

    const initialDelay = getMillisecondsUntilNextExecution(targetHour, targetMinute);
    
    
    // console.log(initialDelay)
    setTimeout(() => {
      myDailyFunction();

      // Set up the interval to call the function once a day
      setInterval(myDailyFunction, 24 * 60 * 60 * 1000); // 24 hours
    }, initialDelay);

    if(document.getElementById('getbody')){
      document.getElementById('getbody').addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
          const tabSize = 4;
      
          // set textarea value to: text before caret + tab + text after caret
          this.value = this.value.substring(0, start) +
            ' '.repeat(tabSize) + this.value.substring(end);
      
          // put caret at right position again
          this.selectionStart = this.selectionEnd = start + tabSize;
        }
        else if(e.key == 'Tab' && e.key == 'Shift'){
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
          const tabSize = 4;
      
          // set textarea value to: text before caret + tab + text after caret
          this.value = this.value.substring(0, start) -
            ' '.repeat(tabSize) - this.value.substring(end);
      
          // put caret at right position again
          this.selectionStart = this.selectionEnd = start - tabSize;
  
        }
      });

    }
/*
    function handleTab(event) {
      if (event.key === 'Tab') {
          event.preventDefault();
   
          const textarea = event.target;
          const tabSize = 8;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const value = textarea.value;
   
          textarea.value = value.substring(0, start) + ' '.repeat(tabSize) + value.substring(end);
   
          textarea.selectionStart = textarea.selectionEnd = start + tabSize;
     }
  }

*/

//subscrition page tooltip call
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
      

      
      
        

      
        
    