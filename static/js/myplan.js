var current_page = 1;
var records_per_page = 2;

    //search function for user plan table.
    function search(){
        var sercch_text = document.getElementById('searchbartext').value
        var json_data = document.getElementById('userplanjson').value
        document.getElementById('plan_table_body').innerHTML=''
        data = JSON.parse(json_data)
        //console.log(data)
        var counter=1;
        for(var i=0; i<data.length;i++){
            var unlimited_bool=false
            var limited_bool=false
            var is_activetd=''
            var status=(data[i]['fields']['is_active'])? 'Active' : 'Expire';
            if(data[i]['fields']['is_unlimited']){
                unlimited_bool = 'unlimited'.includes(sercch_text.toLowerCase())
                is_activetd="<td>Unlimited</td><td></td>"
            }
            else{
                limited_bool = 'limited'.includes(sercch_text.toLowerCase())
                is_activetd="<td>"+data[i]['fields']['plan_request']+"</td><td>"+data[i]['fields']['after_charge']+"</td>"
            }
            var active_bool = status.toLowerCase().includes(sercch_text.toLowerCase())

            if (data[i]['fields']['plan_name'].toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['price']).toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['plan_request']).toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['after_charge']).toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['start_date']).toLowerCase().includes(sercch_text.toLowerCase()) || String(data[i]['fields']['end_date']).toLowerCase().includes(sercch_text.toLowerCase()) || unlimited_bool || limited_bool || active_bool){
                start_date = covertdate(data[i]['fields']['start_date'])
                end_date = covertdate(data[i]['fields']['end_date'])
                var newtd = "<tr><td>"+counter+"</td><td>"+data[i]['fields']['plan_name']+"</td><td>"+data[i]['fields']['price']+"</td>"+is_activetd+"<td>"+start_date+"</td><td>"+end_date+"</td><td>"+status+"</td></tr>";

                $('#plan_table_body').append(newtd);
                counter = counter + 1;
            }
            li_append()
            changePage(1)
        }
    }




      function prevPagedot()
      {
//        console.log('previ' +current_page)

          if (current_page > 2) {
              current_page-=2;
              changePage(current_page);
          }
      }
      
      function prevPage()
      {
//        console.log('previ' +current_page)

          if (current_page > 1) {
              current_page--;
              changePage(current_page);
          }
      }

      function nextPagedot()
      {
//        console.log('next' + current_page)
          if (current_page < numPages()) {
              current_page+=2;
              changePage(current_page);
          }
      }

      function nextPage()
      {
//        console.log('next' + current_page)
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
//              console.log(page)
//              console.log(Totle_Pages)
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

      function chengepagesize(){
        page_size = document.getElementById('selectpagesize').value
        records_per_page = Number(page_size)
        li_append()
        changePage(1)
      }

      //for append the pagination based on current data.
      function li_append(){
        document.getElementById('myplanpagination').innerHTML=''
        if(document.getElementById("planlimitedtable")){
          l = document.getElementById("planlimitedtable").rows.length
          Totle_Pages = Math.ceil((l-1)/records_per_page)
//          console.log('this is totle page ' +Totle_Pages)
          if (Totle_Pages > 1){
            prev_li = "<li style='display:block;' class='page-item'><a id='priviousbtn' onclick='prevPage()' class='page-link' href='#'><span class='d-none d-md-inline-block'>Prev</span><span class='d-inline-block d-md-none'><</span></a></li>"
            $('#myplanpagination').append(prev_li)
            if (Totle_Pages > 5){
              for (var i=1;i<=Totle_Pages;i++){
                if(i==1){
//                  console.log(i)
                  var new_li = "<li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li><li  style='display:block;' class='page-item'><a id='priviousbtndot' onclick='prevPagedot()' class='page-link' href='#'>..</a></li>";
                  $('#myplanpagination').append(new_li);
    
                }
                else if(i==Totle_Pages){
                  var new_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtndot' onclick='nextPagedot()' href='#'>..</a></li><li style='display:block;' id='pagination"+i+"' class='page-item'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#myplanpagination').append(new_li);
    
                }
                else{
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:none;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#myplanpagination').append(new_li);
    
                }
              }
            }
            else{
              for (var i=1;i<=Totle_Pages;i++){
                  var new_li = "<li id='pagination"+i+"' class='page-item' style='display:block;'><a onclick='changePage(" + i + ")' class='page-link' href='#'>" + i + "</a></li>";
                  $('#myplanpagination').append(new_li);  
              }
            }
            next_li = "<li style='display:block;' class='page-item'><a class='page-link' id='nextbtn' onclick='nextPage()' href='#'><span class='d-none d-md-inline-block'>Next</span><span class='d-inline-block d-md-none'>></span></a></li>"
            $('#myplanpagination').append(next_li)
          }
  
        }
      }

      //convert date in yyyy-mm-dd formate
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
    