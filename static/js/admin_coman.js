function shownotifications(){
    $.ajax({
        url : '/admin/noticationshow',
        type : 'GET',
        success : function(res){
            data = JSON.parse(res)
            document.getElementById('adminnotitcationlist').innerHTML=''
            if(data.length > 0){
                for (var i=0;i<data.length;i++){
                    var newli = "<li><span>"+data[i]['fields']['description']+"</span></li>"
                    $('#adminnotitcationlist').append(newli)
                }
            }
            else{
                var newli = "<li><span style='color:red;'>Not any New Notication for You.</span></li>"
                    $('#adminnotitcationlist').append(newli)

            }
        }
    })
}

function confirmation(text){
  let userConfirmed = confirm(text);
  if (userConfirmed) {
      return true;
  } else {
      return false;
  }
}

function logout(){
  if (confirmation('Are sure want to Logout..?')){
    window.location.href='/admin/logout';
  }
}
