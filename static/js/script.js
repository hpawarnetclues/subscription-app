loader = document.getElementById('loader')
const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})  
function call_onbody(){
    setTimeout(() => {
        removenotification()
    }, 3000);

}

function removenotification(url){
    const notification = document.getElementById('notification');
    
    notification.innerHTML=" "
    if(url){
        if(loader){
            loader.style.display='none';
        }
        
        window.location.href=url;

    }
    
}

window.onload = function(){
//    console.log('call localstorage')
    localStorage.clear()
    setTimeout(() => {
        removenotification()
    }, 2000);
}

function shownotification(type_of_error,message,url){
    const notification = document.getElementById('notification')
    const new_div = document.createElement('div')
    new_div.classList.add(type_of_error)
    new_div.innerHTML=message
    notification.appendChild(new_div)
    if (url){
        if(loader){
            loader.style.display='block';
        }
        
    }
    setTimeout(() => {
        removenotification(url)
    }, 3000);
    } 

function register_now(){
    var email = document.getElementById('register_email').value
    var password = document.getElementById('register_password').value
    var name = document.getElementById('register_name').value
    var mobile = document.getElementById('register_mobile').value
    //var confpassword = document.getElementById('register_confpassword').value

   //check error
    var checkemail = textboxerror('register_emailerror','register_email','Please Enter Email.','email');
    var checkpass = textboxerror('register_passworderror','register_password','Please Enter Password.','password');
    var checkname = textboxerror('register_nameerror','register_name','Plase Enter Name.');
    var checkmobile = textboxerror('register_mobileerror','register_mobile','Please Enter Mobile Number.','mobile')
    if(checkemail && checkpass && checkname && checkmobile){
        $.ajax({
            url : "/register_data",
            type : 'GET',
            data : {'email':email,'full_name':name,'mobile':mobile,'password':password},
            success : function(res){
                if (res == 'success'){
                    shownotification('success','registered Success.',"/login")

                }
                else if(res == 'googlelogin'){
                    shownotification('error','Email Register for Google Login.')
                }
                else{
                    shownotification('error','Email Already registered.')
                }
                
            }
        }) 
    }
}


function login_now(){
    var email = document.getElementById('login_email').value
    var password = document.getElementById('login_password').value

    //error
    var checkemail = textboxerror('login_emailerror','login_email','Plase Enter Email','email');
    var checkpass = textboxerror('login_passworderror','login_password','Plase Enter Password.','password')
   
    if(checkemail&&checkpass){
        $.ajax({
            url : "/validat_login",
            type : 'GET',
            data : {'email' : email,'password' : password },
            success : function(res){
                if (res == 'success'){
                    shownotification('success','Login success',"/")
                }
                else if(res == 'email'){
                    shownotification('error','Email not Registered.')
                }
                else if(res == 'password'){
                    shownotification('error','Password Not Match.')

                }
                else if(res == 'Googlelogin'){
                    shownotification('error','Email Register for Google Login.')
                }
                else if(res == 'admin'){
                    window.location.href="/admin"
                }

            }
        })
    }
}

function notemail(){
    otp = document.getElementById('otpdiv')
    email = document.getElementById('emaildiv')
    varfy_otp = document.getElementById('varifyotp_btn')
    sendotp = document.getElementById('sendotp_btn')
    alink = document.getElementById('alinkdiv')
    error = document.getElementById('forgot_otperror')

    varfy_otp.style.display="none";
    otp.style.display="none";
    alink.style.display="none";
    error.style.display="none";
    email.style.display = 'block'
    sendotp.style.display = 'block'

}


function send_otp(){
    email = document.getElementById('forgot_email').value
    send_btn = document.getElementById('sendotp_btn')
    otp_text = document.getElementById('otpdiv')
    varify_btn = document.getElementById('varifyotp_btn')
    //error
    email_error = document.getElementById('forgot_emailerror')
    var checkemail = textboxerror('forgot_emailerror','forgot_email','Please Enter Email.','email');
    if(checkemail)
    {
        loader.style.display="block"
        $.ajax({
            url : "/send_otp",
            type : 'GET',
            data : {'email' :email},
            success : function(res){
                loader.style.display="none";
                if (res == 'success'){
                    //hide email and button 
                    document.getElementById('emaildiv').style.display="none"
                    send_btn.style.display="none";
                    shownotification('success','OTP Send Success.')
                    //show otp text and varify button
                    otp_text.style.display = 'block';
                    varify_btn.style.display='block';
                }
                else if(res == 'Googlelogin'){
                    shownotification('error','You Email Register for Google login.')
                }
                else
                {
                    shownotification('error','Email Not Registered')
                }

            }
        })
    }
}


function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;
    // Remove any non-numeric characters
    input.value = value.replace(/[^0-9]/g, '');
}

function varify_otp(){
    email = document.getElementById('forgot_email').value
    otp = document.getElementById('forgot_otptext').value
    otp_text = document.getElementById('otpdiv')
    varify_btn = document.getElementById('varifyotp_btn')
    password = document.getElementById('passworddiv')
    finalbtn = document.getElementById('forgot_btn')
    //error
    otp_error = document.getElementById('forgot_otperror')

    var checkotp = textboxerror('forgot_otperror','forgot_otptext','Please Enter OTP.')
    if(checkotp){
        loader.style.display="block";
        $.ajax({
            url : "/varify_otp",
            type : 'GET',
            data : {'email' : email ,'otp':otp},
            success: function(res){
                loader.style.display="none";
                if (res == 'match'){
                    otp_text.style.display="none";
                    varify_btn.style.display="none";
                    password.style.display='block';
                    finalbtn.style.display = 'block';
                }
                else if(res == 'not match'){
                    shownotification('error','OTP Not Match.')
                }
                else{
                    otp_text.style.display="none";
                    varify_btn.style.display="none";
                    shownotification('error','OTP Is Expire.')
                    document.getElementById('emaildiv').style.display='block';
                    document.getElementById('sendotp_btn').style.display='block';
                }

            }
        })

    }
    

}

function forgot_now(){
    email = document.getElementById('forgot_email').value
    password = document.getElementById('forgot_password').value
    //error
    var checkpassword = textboxerror('forgot_passworderror','forgot_password','Please Enter Password.','password');
    if (checkpassword){
        loader.style.display="none";
        $.ajax({
            url : "/forgot_save",
            type : 'GET',
            data : {'email':email , 'password' : password},
            success : function(res){
//                console.log(res)
                if (res == 'done'){
                    shownotification('success','Password Forget Success.',"/login")
                 
                }
            }
        })
    }
}


function validateemail(email){
    const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const isValid = emailPattern.test(email); 
    return isValid
}

function validatepassword(password){
    const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    let isvalid = passregex.test(password)
    return isvalid
}

function validateNumber(number) {
    var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
  
    return re.test(number)
  }


function textboxerror(errorid,textboxid,error,anyvalidation=''){
//    console.log(anyvalidation)
    if(anyvalidation==''){
        if(document.getElementById(textboxid).value == ''){
            document.getElementById(errorid).innerHTML=error
            document.getElementById(errorid).style.display='block';
            return false
        }
        else{
            
            document.getElementById(errorid).style.display='none';
            return true
        }

    }
    else if(anyvalidation=='email'){
        if((document.getElementById(textboxid).value == '')){
            document.getElementById(errorid).innerHTML=error
            document.getElementById(errorid).style.display='block';
            return false
        }
        else if((!validateemail(document.getElementById(textboxid).value)) && (document.getElementById(textboxid).value != '')){
            document.getElementById(errorid).innerHTML="Plase Enter Valid Email."
            document.getElementById(errorid).style.display='block';
            return false
        }
        else{
            
            document.getElementById(errorid).style.display='none';
            return true
        }
    }
    else if(anyvalidation=='mobile'){
        if((document.getElementById(textboxid).value == '')){
            document.getElementById(errorid).innerHTML=error
            document.getElementById(errorid).style.display='block';
            return false
        }
        else if((document.getElementById(textboxid).value != '') && (!validateNumber(document.getElementById(textboxid).value))){
            document.getElementById(errorid).innerHTML='Enater Valide Mobile Number.'
            document.getElementById(errorid).style.display='block';
            return false
        }
        else{
            
            document.getElementById(errorid).style.display='none';
            return true
        }
    }
    else if(anyvalidation=='password'){
        if((document.getElementById(textboxid).value == '') ){
            document.getElementById(errorid).innerHTML=error
            document.getElementById(errorid).style.display='block';
            return false
        }
        else if((document.getElementById(textboxid).value != '') && (!validatepassword(document.getElementById(textboxid).value))){
            document.getElementById(errorid).innerHTML="Enter Password in must requirement match like Example@123."
            document.getElementById(errorid).style.display='block';
            return false
        }
        else{
            document.getElementById(errorid).style.display='none';
            return true
        }
    }
    else if(anyvalidation == 'passwordmatch'){
        if(document.getElementById(textboxid).value == ''){
            document.getElementById(errorid).innerHTML=error
            document.getElementById(errorid).style.display='block';
            return false
        }
        else{
            password = document.getElementById('register_password').value
            conform_pass = document.getElementById(textboxid).value
            if(password == conform_pass){
                document.getElementById(errorid).style.display='none';
                return true
            }
            else{
                document.getElementById(errorid).innerHTML='Password and Conform Password Not Match.'
                document.getElementById(errorid).style.display='block';
                return false

            }
            
        }

    }
    
}

