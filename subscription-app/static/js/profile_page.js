loader = document.getElementById('loader')

const textInputs = document.querySelectorAll("input[type='text']");


//for the value of none to blank convert on the load of page.
// Now you can iterate over the textInputs array and perform actions on them
for (const input of textInputs) {
  // Example: Clear the value of each input
  if(input.value == 'None'){
    input.value = "";
  }
}


//for the click on the next and back button show the form related
const form = document.querySelector("section"),
        nextBtn = form.querySelector(".nextBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");


nextBtn.addEventListener("click", ()=> {
    var checkmobile = numbercheck('mobile')
    comparevalue()
    if (checkmobile){
        allInput.forEach(input => {
            form.classList.add('secActive');
    })

    }
})
backBtn.addEventListener("click", () => form.classList.remove('secActive'));


//
function storeCheckedValues() {
    const checkedValues = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        checkedValues.push(checkbox.value);
    });
    // console.log(checkedValues); // Log the array to the console
    // You can also use the array elsewhere in your code
    return checkedValues;
}

function storeradioValues() {
    const radiobtnlst = [];
    const rediobtn = document.querySelectorAll('input[type="radio"]');
    //// console.log(rediobtn)
    rediobtn.forEach(radio => {
        if(radio.checked){
            radiobtnlst.push(radio.value);
        }
    });
    // console.log(radiobtnlst);
    return radiobtnlst; // Log the array to the console
    // You can also use the array elsewhere in your code
}

function textboxerror(errorid,textboxid,error,anyvalidation=''){
    // console.log(anyvalidation)
    if(anyvalidation==''){
      if(document.getElementById(textboxid).value.replace(/\s+/g, '') == ''){
          document.getElementById(errorid).innerHTML=error
          document.getElementById(errorid).style.display='block';
          return false
      }
      else{
        document.getElementById(errorid).style.display="none";
        return true
      }
    }
}

function comparevalue(){
    var org_name = (document.getElementById('org_name').value == 'None') ? '' : document.getElementById('org_name').value ;
    var name = (document.getElementById('name').value == 'None') ? '' : document.getElementById('name').value;
    var org_dob = (document.getElementById('org_dob').value == 'None') ? '' : document.getElementById('org_dob').value;
    var dob = (document.getElementById('dob').value == 'None') ? '' : document.getElementById('dob').value;
    var org_mobile = (document.getElementById('org_mobile').value == 'None') ? '' : document.getElementById('org_mobile').value;
    var mobile = (document.getElementById('mobile').value == '') ? '' : document.getElementById('mobile').value;
    var org_gender = (document.getElementById('org_gender').value == 'None') ? '' : document.getElementById('org_gender').value;
    var gender = (document.getElementById('gender').value == 'None') ? '' : document.getElementById('gender').value;
    var org_occupation = (document.getElementById('org_occupation').value == 'None') ? '' : document.getElementById('org_occupation').value;
    var occupation = (document.getElementById('occupation').value == 'None') ? '' : document.getElementById('occupation').value;
    var org_fathername = (document.getElementById('org_fathername').value == 'None') ? '' : document.getElementById('org_fathername').value;
    var fathername = (document.getElementById('fathername').value == 'None') ? '' : document.getElementById('fathername').value;
    var org_mothername = (document.getElementById('org_mothername').value == 'None') ? '' : document.getElementById('org_mothername').value ;
    var mothername = (document.getElementById('mothername').value == 'None') ? '' : document.getElementById('mothername').value;
    var ord_grandfather = (document.getElementById('org_grandfathername').value == 'None') ? '' : document.getElementById('org_grandfathername').value;
    var grandfather = (document.getElementById('gradfather').value == 'None') ? '' : document.getElementById('gradfather').value;
    if ((org_name.trim() == name.trim()) && (org_dob == dob) && (org_mobile.trim() == mobile.trim()) && (org_gender == gender) && (org_occupation.trim() == occupation.trim()) && (org_fathername.trim() == fathername.trim()) && (org_mothername.trim() == mothername.trim()) && (ord_grandfather.trim() == grandfather.trim())){
        // console.log('compare true;')
        document.getElementById('submitbtn').style.display="none";
        document.getElementById('submitbtntest').style.display='block';
    }
    else{
        // console.log('compare false;')
        document.getElementById('submitbtntest').style.display='none';
        document.getElementById('submitbtn').style.display="block";
    }
}

function comparebutton(){
    var role = storeradioValues()
    var useofapp = storeCheckedValues()
    // console.log(role)
    var org_useof = (document.getElementById('org_intrestofuser').value == 'None') ? '[] ' : document.getElementById('org_intrestofuser').value;
    var org_role =( document.getElementById('org_position').value == 'None') ? '' : document.getElementById('org_position').value;
    // console.log(org_useof,'and',useofapp)
    aray_convert = JSON.parse(org_useof)
    //// console.log(aray_convert)
    //// console.log(useofapp)
    if (!role[0]){
        role[0] = '';
    }
    // console.log(role[0],org_role)
    // console.log(role[0] == org_role)
    if((role[0] == org_role) && (aray_convert.map(String).join(',') === useofapp.join(','))){
        document.getElementById('submitbtn').style.display="none";
        document.getElementById('submitbtntest').style.display='block';
    }
    else{
        document.getElementById('submitbtntest').style.display='none';
        document.getElementById('submitbtn').style.display="block";
    }

}


function profileupdate(){
    var role = storeradioValues()
    var useofapp = storeCheckedValues()
    rolebool = false
    useofappbool = false

    var name = document.getElementById('name').value
    var dob = document.getElementById('dob').value
    var email = document.getElementById('email').value
    var mobile = document.getElementById('mobile').value
    var gender = document.getElementById('gender').value
    var fathername = document.getElementById('fathername').value
    var mothername = document.getElementById('mothername').value
    var Occupation = document.getElementById('occupation').value
    var grandfather = document.getElementById('gradfather').value

    loader.style.display="block";
    $.ajax({
        url : '/profile',
        data : {'name':name,'dob':dob,'mobile':mobile,'gender':gender,'fathername':fathername,'mothername':mothername,'grandfather':grandfather,'occupation':Occupation,'useofapp':useofapp,'position':role[0]},
        type : 'POST',
        success : function(res){
            if (res == 'success'){
                shownotification('success','Profile Update Success.','/')
            }
        }
    })
    }


$(function (){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;// jan=0; feb=1 .......
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    var maxDate = year + '-' + month + '-' + day;
    $('#dob').attr('max', maxDate);
});

function removenotification(url){
    loader.style.display='none';
    const notification = document.getElementById('notification');
    notification.innerHTML=" "
    if (url){
        window.location.href=url;

    }
    
}

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


function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;
    // Remove any non-numeric characters
    input.value = value.replace(/[^0-9]/g, '');
}

function numbercheck(number){
    if(document.getElementById(number).value.replace(/\s+/g, '')== ''){
        document.getElementById('profilemobile_error').style.display="none";
        return true
    }
    else if(document.getElementById(number).value.replace(/\s+/g, '')!= '' && validateNumber(document.getElementById(number).value)){
        document.getElementById('profilemobile_error').style.display="none";
        return true
    }
    else{
        document.getElementById('profilemobile_error').innerHTML="Enter Valid Mobile Number.";
        document.getElementById('profilemobile_error').style.display="block";
        return false
    }
        

}

function validateNumber(number) {
    var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
  
    return re.test(number)
  }


function call_onbody(){
    setTimeout(() => {
        removenotification(url)
    }, 3000);
}
