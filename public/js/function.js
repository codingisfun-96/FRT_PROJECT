//function to validate image format and then preview it
function validateImage() {
    // var formData = new FormData();
    // var file = document.getElementById("file").files[0];
    // formData.append("Filedata", file);
    // var t = file.type.split('/').pop().toLowerCase();
    // if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif") {
    //     alert("error",'Please select a valid image file');
    //     document.getElementById("file").value = '';
    //     return false;
    // }
    // if (file.size > 1024000) {
    //     alert("error",'Max Upload size is 1MB only');
    //     document.getElementById("file").value = '';
    //     return false;
    // }
    // else{
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
    
        reader.addEventListener("load", function () {
        preview.src = reader.result;
        }, false);
    
        if (file) {
        reader.readAsDataURL(file);
        return true;
        }
    }
//}

//Loading animation
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};
//Password show/ hide
function eye(){
    var x = document.getElementById("pass");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if(x.type === 'password'){
        x.type = 'text';
        y.style.display = "block";
        z.style.display = "none";
    }
    else{
        x.type = 'password';
        y.style.display = "none";
        z.style.display = "block";
    }
}

function myFunction(){
    try{
        var x = document.getElementsById("eye");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    catch{}
    finally{}
}


//Alert message
function alert(status,message)
	{
        var alert = document.getElementById("alert");

        alert.style.display = "block";
        setTimeout(() =>alert.style.display = "none",3000);
        if (status=="error"){
        alert.style.backgroundColor = "lightcoral";
        }
        else{
        alert.style.backgroundColor = "lightgreen";
        }
        alert.innerHTML=message;
}
//Email-validation
function ValidateEmail() 
{
  var form = document.getElementById("signup");
  var email=document.getElementById("e-mail").value;
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern)){
    form.classList.add("valid");
    form.classList.remove("invalid");
    text.innerHTML = "Your Email address is valid!";
    text.style.color = "#00ff00";
  }
  else{
    form.classList.remove("valid");
    form.classList.add("invalid");
    text.innerHTML = "Please enter valid Email address!";
    text.style.color = "#ff0000";
  }
  if (email == ""){
    form.classList.remove("valid");
    form.classList.remove("invalid");
    text.innerHTML = "";
    text.style.color = "#00ff00";
  }
}

function search_function(){
    let alert_search = document.getElementById("alert_search");
    let filter =  document.getElementById("myInput").value.toUpperCase();
    let table = document.getElementById("pass_table");
    let tr = table.getElementsByTagName('tr');
    
    for(var i=1; i<tr.length; i++)
    {
      let td = tr[i].getElementsByTagName('td')[1];
      if(td){
          let textvalue = td.textContent || td.innerHTML;
          
          if(textvalue.toUpperCase().indexOf(filter) > -1){
            tr[i].style.display = "";    
          }else{
            tr[i].style.display = "none";
          }
      }
        
    }
    
    var count=0;
    for(var i=1; i<tr.length; i++)
    {
      if(tr[i].style.display=="none")
    {
      count+=1;
    }
    }
    if(count==tr.length-1)
    {
      alert_search.style.display = "block";
      alert_search.innerHTML="No result";
    }
    else{
      alert_search.style.display = "none";
    }
    

}

function table_view(){
    count = 0;
    let table = document.getElementById("pass_table");
    let tr = table.getElementsByTagName('tr');
    for(var i=1; i<tr.length; i++)
    {
        let td = tr[i].getElementsByTagName('td')[0];
        let chk_box = td.getElementsByTagName('input')[0];
        if(chk_box.checked==true){
            count +=1;
            value = tr[i].getElementsByTagName('td')[1].innerHTML;
            position = i;
        }else{
            // console.log(tr[i].getElementsByTagName('td')[1].textContent,"not checked");
        }
    }
    if(count>1){
        console.log("Select One");
    }
    if(count==1){
        console.log(persondata[position-1].site);
    }
}
function getPasswordStrength(password){
    let s = 0;
    if(password.length > 5){
      s++;
    }
    if(password.length > 7){
      s++;
    }
    if(/[A-Z]/.test(password)){
      s++;
    }
    if(/[0-9]/.test(password)){
      s++;
    }
    if(/[^A-Za-z0-9]/.test(password)){
      s++;
    }
    return s;
  }

  document.querySelector(".pw-meter #password").addEventListener("focus",function(){
    document.querySelector(".pw-meter .pw-strength").style.display = "block";
  });
  document.querySelector(".pw-meter #password").addEventListener("blur",function(){
    document.querySelector(".pw-meter .pw-strength").style.display = "none";
  });
  document.querySelector(".pw-meter .pw-display-toggle-btn").addEventListener("click",function(){
    let el = document.querySelector(".pw-meter .pw-display-toggle-btn");
    if(el.classList.contains("active")){
      document.querySelector(".pw-meter #password").setAttribute("type","password");
      el.classList.remove("active");
    } else {
      document.querySelector(".pw-meter #password").setAttribute("type","text");
      el.classList.add("active");
    }
  });

  document.querySelector(".pw-meter #password").addEventListener("keyup",function(e){
    let password = e.target.value;
    let strength = getPasswordStrength(password);
    let passwordStrengthSpans = document.querySelectorAll(".pw-meter .pw-strength span");
    strength = Math.max(strength,1);
    passwordStrengthSpans[1].style.width = strength*20 + "%";
    if(strength < 2){
      passwordStrengthSpans[0].innerText = "Weak";
      passwordStrengthSpans[0].style.color = "#fff";
      passwordStrengthSpans[1].style.background = "#d13636";
    } else if(strength >= 2 && strength <= 4){
      passwordStrengthSpans[0].innerText = "Medium";
      passwordStrengthSpans[0].style.color = "#fff";
      passwordStrengthSpans[1].style.background = "#e6da44";
    } else {
      passwordStrengthSpans[0].innerText = "Strong";
      passwordStrengthSpans[0].style.color = "#fff";
      passwordStrengthSpans[1].style.background = "#20a820";
    }
  });
