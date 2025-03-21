  window.onload = function(){
      api_reportmain()
      if (window.innerWidth < 768) {
        // console.log('this')
        sidebar.classList.add("close");
      } else {
        sidebar.classList.remove("close");
      }
    }

  function apipagination(page,totle){
    document.getElementById('subscriberpagination').innerHTML=''
    if(document.getElementById("planlimitedtable")){
      Totle_Pages = totle
//      console.log(Totle_Pages)
      if (Totle_Pages > 1){
        prev_li = "<li style='display:block;' class='page-item' onclick=pagination_btn('prev')><a id='priviousbtn'  class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
        $('#subscriberpagination').append(prev_li)
        if (Totle_Pages > 5){
          for (var i=1;i<=Totle_Pages;i++){
            if(i==1){
//              console.log(i)
              var new_li = "<li style='display:block;' id='pagination"+i+"' class='page-item' onclick=api_reportmain('" + i + "')><a  class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick=pagination_btn('prevdot') class='page-link' href='#'>..</a></li>";
              $('#subscriberpagination').append(new_li);
  
            }
            else if(i==Totle_Pages){
              var new_li = "<li style='display:block;' class='page-item' onclick=pagination_btn('nextdot')><a class='page-link' id='nextbtndot'  href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick=api_reportmain(" + i + ") class='page-link' href='#'>" + i + "</a></li>";
              $('#subscriberpagination').append(new_li);
  
            }
            else{
              var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;' onclick=api_reportmain('" + i + "')><a  class='page-link' href='#'>" + i + "</a></li>";
              $('#subscriberpagination').append(new_li);
  
            }
          }
        }
        else{
          for (var i=1;i<=Totle_Pages;i++){
              var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;' onclick=api_reportmain('" + i + "')><a  class='page-link' href='#'>" + i + "</a></li>";
              $('#subscriberpagination').append(new_li);  
          }
        }
        next_li = "<li style='display:block;' class='page-item' onclick=pagination_btn('next')><a class='page-link' id='nextbtn'  href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
        $('#subscriberpagination').append(next_li)
      }
  
    }

  }

  function pagination_btn(typee){
    var current_page = document.getElementById('pagenumber').value
    if (typee == 'next'){
      api_reportmain(Number(current_page)+1)
    }
    if (typee == 'nextdot'){
      api_reportmain(Number(current_page)+2)
    }
    if (typee == 'prev'){
      api_reportmain(Number(current_page)-1)
    }
    if (typee == 'prevdot'){
      api_reportmain(Number(current_page)-2)
    }
  }

  function api_reportmain(pagenumberarg=0,type=''){
//    console.log('12 call')
    var userselected = (document.getElementById('userdropfiler').value == 0) ? null : document.getElementById('userdropfiler').value
    var plandropfiler = (document.getElementById('plandropfiler').value == 0) ? null : document.getElementById('plandropfiler').value
    var pagenumber = (document.getElementById('pagenumber').value == '') ? 1 : document.getElementById('pagenumber').value
    var pagesize = (document.getElementById('selectpagesize').value == '') ? null : document.getElementById('selectpagesize').value
    var typeofrequest = (type == '') ? null : type
//    console.log('type is '+typeofrequest)
    if (pagenumberarg !=0){
      pagenumber=pagenumberarg
    }
    if (type == 'pagesize'){
      pagenumber=1
    }
//    console.log('user id is ' + plandropfiler)
    $.ajax({
      url : '/admin/subscriber/report',
      type : 'POST',
      data : {'user_id':userselected,'plan_id':plandropfiler,'pagenumber':(Number(pagesize) * Number(pagenumber)) - Number(pagesize),'pagesize':pagesize,'type':typeofrequest},
      xhrFields: {
        responseType: typeofrequest === 'pdf' ? 'blob' : 'text'  // Handle as blob if request type is PDF
      },
      success : function(res){
        if(typeofrequest == null || typeofrequest == 'pagesize'){
          new_data = res['data']['api_data']
          document.getElementById('plan_table_body').innerHTML=''
          var counter = 1
//          console.log(new_data)
          if(pagenumber != 0 && pagenumber != 1 && Number(res['data']['pagenumber']) > 1){
            page_size = document.getElementById('selectpagesize').value;
            counter = ((pagenumber * page_size)-page_size)+1
          }
          for (var i=0;i<new_data.length;i++){
              new_tr = "<tr><td>"+counter+"</td><td>"+new_data[i]['fullname']+"</td><td>"+new_data[i]['planname']+"</td><td>"+new_data[i]['endpoint']+"</td><td>"+new_data[i]['requestbody']+"</td><td>"+new_data[i]['type']+"</td><td>"+new_data[i]['code']+"</td><td>"+new_data[i]['responce_data']+"</td></tr>"
              $('#plan_table_body').append(new_tr)
              counter = counter +1
          }
//          console.log("responce"+res['data']['pagenumber'])
          if(pagenumber == 0){
            apipagination(Number(pagenumber)+1,res['data']['Totle_pages'])
            changePageapi(Number(pagenumber)+1,res['data']['Totle_pages'])
          }
          else
          {
            if(pagenumber > res['data']['Totle_pages']){
              apipagination(1,res['data']['Totle_pages'])
              changePageapi(1,res['data']['Totle_pages'])

            }
            else{
              apipagination(pagenumber,res['data']['Totle_pages'])
              changePageapi(pagenumber,res['data']['Totle_pages'])

            }
          }
          document.getElementById('pagenumber').value = pagenumber
          document.getElementById('selectpagesize').value = pagesize    
      }
      else if(typeofrequest === 'pdf'){
        try{
//          console.log('this is responce ',res)
          const url = window.URL.createObjectURL(res); // Convert response to a Blob URL
//          console.log('url is '+ url)
          // Create a link element and click it to download the file
          const link = document.createElement('a');
          link.href = url;
          link.download = 'apicall_report.pdf'; // Name of the file to be downloaded
          document.body.appendChild(link);
          link.click();
        }
        catch {
          shownotification('error','Data not found.')
        }

        
      }
      else{
        console.log(res)
      }
    }
      
  })
  }


  function changePageapi(page,Totle_Pages){
    current_page = page
    var btn_next = document.getElementById("nextbtn");
    var btn_prev = document.getElementById("priviousbtn");
    var btn_nextdot = document.getElementById("nextbtndot");
    var btn_prevdot = document.getElementById("priviousbtndot");
    var listing_table = document.getElementById("planlimitedtable");


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
//            console.log('page 1 and 2')
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
//            console.log('last pages')
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
//            console.log('other pages')
          for (var j=1;j<=Totle_Pages;j++){
            if(j==1){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j==page){  
//               console.log(page-1)
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j==Totle_Pages){
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j == (Number(page)+1)){
//                console.log('+ call')
              if(document.getElementById('pagination'+(j))){
                document.getElementById('pagination'+(j)).style.display='block';
              }
            }
            else if(j == (page-1)){
//                console.log('- call')
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
      if (page == Totle_Pages) {
//        console.log(page)
//        console.log(Totle_Pages)
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

function removenotification(url){
  const notification = document.getElementById('notification');
  notification.innerHTML=" "
  if (url){
      window.location.href=url;

  }
  
}