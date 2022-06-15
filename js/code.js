const urlBase = 'http://group17.rocks/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function openmkpopup(){
	document.getElementById("mkpopup").style.display = "block";
}
function closmkpopup(){
	document.getElementById("mkpopup").style.display = "none";
}

function openmkpopup2(i){
  //let updatebutton = "";
	document.getElementById("mkpopup2").style.display = "block";
  //updatebutton = "<button class='button' onclick = 'updateContact("+i+");'>"+"<i class='fa fa-edit'></i>"+"</button>";
  //document.getElementsByTagName("p")[5].innerHTML = updatebutton;
 document.getElementById("demo").onclick = function() {myFunction(i)};

  function myFunction(i) {
    
    updateContact(i);
    document.location.reload(true);
  }
}
function closmkpopup2(){
	document.getElementById("mkpopup2").style.display = "none";
}

function showDiv() {
   document.getElementById('modalRegisterForm').style.display = "block";
}

function showDiv2() {
   document.getElementById('modalRegisterForm').style.display = "none";
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
  var hash = md5(password);
	
	document.getElementById("loginResult").innerHTML = "";

	//let tmp = {login:login,password:password};
  var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
        
				if(userId < 1)
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "   Welcome! <br /><i class='fa fa-user' aria-hidden='true'></i> " + firstName + " " + lastName + "";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function register()
{
	userId = 0;

  let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let login = document.getElementById("registerName").value;
	let password = document.getElementById("registerPassword").value;
 
	document.getElementById("registerResult").innerHTML = "";
  var hash = md5(password);
	let tmp = { firstname: firstName, lastname: lastName, login: login, password: hash };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Register.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
 if(firstName == "")
 {
     document.getElementById("registerResult").innerHTML = "Please enter First Name!";
 }
 else if(lastName == "")
 {
     document.getElementById("registerResult").innerHTML = "Please enter a Last Name!";
 }
 else if(login == "")
 {
     document.getElementById("registerResult").innerHTML = "Please enter a Username!";
 }
 else if(password == "")
 {
     document.getElementById("registerResult").innerHTML = "Please enter a Password!";
 }
 else{
 
	try {
    		xhr.onreadystatechange = function () {
    			if (this.readyState == 4 && this.status == 200) {
    			
    				document.getElementById("registerResult").innerHTML = "User has been registered. Please login now";
    			}
    		};
    		xhr.send(jsonPayload);
  }
	catch (err) {
		document.getElementById("Result").innerHTML = err.message;
	}
 }
}

function addContact()
{
  let Name = document.getElementById("Name").value;
	let Phone = document.getElementById("Phone").value;
	let Email = document.getElementById("Email").value;
  let ID = userId;
  let tmp = { contactName: Name, contactPhone: Phone, contactEmail: Email, userId: ID};
	let jsonPayload = JSON.stringify(tmp);
  
  let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
     if(Name == "")
     {
         openmkpopup();
         document.getElementById("contactAddResult").innerHTML = "Please enter a Name!";
     }
     else if(Phone == "")
     {
         openmkpopup();
         document.getElementById("contactAddResult").innerHTML = "Please enter a Phone Number!";
     }
     else if(Email == "")
     {
         openmkpopup();
         document.getElementById("contactAddResult").innerHTML = "Please enter an Email!";
     }
     else{
    	try
    	{
    		xhr.onreadystatechange = function() 
    		{
    			if (this.readyState == 4 && this.status == 200) 
    			{
    				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
            searchContact();
    			}
    		};
    		xhr.send(jsonPayload);
    	}
    	catch(err)
    	{
    		document.getElementById("contactAddResult").innerHTML = err.message;
    	}
     }
}

function updateContact(i)
{

	let updatedName = document.getElementById("nameEdit").value;
	let updatedPhone = document.getElementById("phoneEdit").value;
	let updatedEmail = document.getElementById("emailEdit").value;
	let updatedId = i;
	document.getElementById("updateResult").innerHTML = "";


    
	let tmp =  {contactName: updatedName, contactPhone: updatedPhone, contactEmail: updatedEmail, contactId: updatedId};;
  let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + '/UpdateContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("updateResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("updateResult").innerHTML = err.message;
	}
}

function searchContact()
{
  var updatebutton = document.getElementById("updateButton")
  var deletebutton = document.getElementById("deleteButton")
  
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
  let jsonObject = "";
  let buttonList = "";
  let buttondeleteList = "";
	let nameList = "";
  let emailList = " ";
  let phoneNumList = " ";
  let fullName = "";
	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
 
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
   document.getElementById("norecords").innerHTML = "";
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
 
        if(xhr.responseText == "No Records Found")
        {
        	  document.getElementById("table_section").style.display = "none";
            nameList = " ";
            emailList = " ";
            phoneNumList = " "; 
            buttonList = " "; 
            buttondeleteList =  " ";
            document.getElementById("contactSearchResult").innerHTML = "Search Results: 0";
  	        document.getElementsByTagName("p")[0].innerHTML = nameList;
            document.getElementsByTagName("p")[1].innerHTML = emailList;
            document.getElementsByTagName("p")[2].innerHTML = phoneNumList;
            document.getElementsByTagName("p")[3].innerHTML = buttonList;
            document.getElementsByTagName("p")[4].innerHTML = buttondeleteList;
            document.getElementById("norecords").innerHTML = "No Records Found";
        }
        
        else{
        
          jsonObject = JSON.parse(xhr.responseText);
         
          //Sorts the contacts by Name
          jsonObject.results.sort(function(a,b){
                var nameA = a.Name.toLowerCase();
                var nameB = b.Name.toLowerCase();
                
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          });
          
  				document.getElementById("contactSearchResult").innerHTML = "Search Results: " + jsonObject.results.length;
         
  				for( let i=0; i<jsonObject.results.length; i++ )
  				{
            
  					nameList += jsonObject.results[i].Name;
            emailList += jsonObject.results[i].Email;
            phoneNumList += jsonObject.results[i].Phone;
            
            let nametmp = JSON.stringify(jsonObject.results[i].Name);
            let phonetmp = JSON.stringify(jsonObject.results[i].Phone);
            let emailtmp = JSON.stringify(jsonObject.results[i].Email);
            
            buttonList +="<button class='editbutton' onclick = 'test("+jsonObject.results[i].ID+","+nametmp+","+phonetmp+","+emailtmp+");'>"+"<i class='fa fa-edit'></i>"+"</button>";
            buttondeleteList +="<button class='deletebutton' onclick = 'remove("+jsonObject.results[i].ID+");'>"+"<i class='fa fa-remove'></i>"+"</button>";
                
  					if( i < jsonObject.results.length - 1 )
  					{
  						nameList += "<br />\r\n";
              emailList += "<br />\r\n";  
              phoneNumList += "<br />\r\n";   
              buttonList += "<br />\r\n";
              buttondeleteList += "<br />\r\n";
                  
  					}
  				}
           
    				document.getElementsByTagName("p")[0].innerHTML = nameList;
            document.getElementsByTagName("p")[1].innerHTML = emailList;
            document.getElementsByTagName("p")[2].innerHTML = phoneNumList;
            document.getElementsByTagName("p")[3].innerHTML = buttonList;
            document.getElementsByTagName("p")[4].innerHTML = buttondeleteList;
          }
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact(i)
{
  let tmp = {contactId: i};
	let jsonPayload = JSON.stringify(tmp);
  
  let url = urlBase + '/DeleteContact.' + extension;
  let xhr = new XMLHttpRequest();
  
	xhr.open("DELETE", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
  try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been Deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

function test(i,j,k,l){
  //alert(i);
  //call popup and pass id
  openmkpopup2(i);
  
  document.getElementById("nameEdit").value=j;
  document.getElementById("phoneEdit").value=k;
  document.getElementById("emailEdit").value=l;
  
}


function remove(i){
  
  //call popup and pass id
  //openmkpopup2(i);
  if (confirm("Are you sure you want to delete this Contact?") == true) {
  deleteContact(i);
  document.location.reload(true);
  searchContact();
} 

}
function logoutconfirm(){
  if(confirm("Are you sure you want to Logout?") == true) {
    doLogout();
  }

  
}

function show(){
  document.getElementById("table_section").style.display = "block";
  //maybe?
  searchContact();
}

