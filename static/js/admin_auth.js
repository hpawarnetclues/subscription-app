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


        function login_now(){
            var email = document.getElementById('login_email').value
            var password = document.getElementById('login_password').value

            //error
            var email_error = document.getElementById('login_emailerror')
            var password_error = document.getElementById('login_passworderror')

            var checkemail = textboxerror('login_emailerror', 'login_email', 'Please Enter Email.','email');
            var checkpass = textboxerror('login_passworderror', 'login_password', 'Please Enter Password.', 'password');

            if (checkemail && checkpass){
                document.getElementById('loader').style.display='block';
                $.ajax({
                    url : "/admin/admin_validat_login",
                    type : 'POST',
                    data : {'email' : email,'password' : password },
                    success : function(res){
                        if (res == 'success'){
                            document.getElementById('loader').style.display='none';
                            shownotification('success','Login success',"/admin")
                        }
                        else if(res == 'email'){
                            document.getElementById('loader').style.display='none';
                            shownotification('error','Email not Registered')
                        }
                        else if(res == 'password'){
                            document.getElementById('loader').style.display='none';
                            shownotification('error','Password Not Match')

                        }
                    }
                })
            }
        }


        //for validate email
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

        function textboxerror(errorid,textboxid,error,anyvalidation=''){
            // console.log(anyvalidation)
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
            
        }