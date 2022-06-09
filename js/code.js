const urlBase = 'http://group17.rocks/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

let globalId = 0;


function openmkpopup(){
	document.getElementById("mkpopup").style.display = "block";
}
function closmkpopup(){
	document.getElementById("mkpopup").style.display = "none";
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
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
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
        globalId = jsonObject.id;
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
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
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

	let tmp = { firstname: firstName, lastname: lastName, login: login, password: password };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Register.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
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

function addContact()
{
  let Name = document.getElementById("Name").value;
	let Phone = document.getElementById("Phone").value;
	let Email = document.getElementById("Email").value;
  let ID = userId;
  let tmp = { contactName: Name, contactPhone: Phone, contactEmail: Email, userId: ID};
	let jsonPayload = JSON.stringify(tmp);
  
  let url = urlBase + '/AddContact.' + extension;
  /*
	let newContact = document.getElementById("contactText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {contact:newContact,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	*/
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function updateContact()
{
	let updatedName = document.getElementById("nameEdit").value;
	let updatedPhone = document.getElementById("phoneEdit").value;
	let updatedEmail = document.getElementById("emailEdit").value;
	let contactId = idNum;
	document.getElementById("updateResult").innerHTML = "";

	let jsonPayload = '{"Name" : "' + updatedName + '", "Phone" : "' + updatedPhone + '", "Email" : "' + updatedEmail + '", "ID" : "' + contactId + '"}';

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
	
  const str = " ";
	let contactList = "";
  let fullName = "";
	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Search Results:";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
        
					contactList += jsonObject.results[i].Name + "  |  "  + jsonObject.results[i].Email + "  |  " + jsonObject.results[i].Phone;
          document.getElementById("edit").innerHTML += "<button class='editbutton'>"+"<i class='fa fa-edit'></i>"+"</button>";
          document.getElementById("edit").innerHTML += "<button class='editbutton'>"+"<i class='fa fa-remove'></i>"+"</button>";
          
           //parse contactID as variable through update and delete and grab to use for functions 
           //button[i] on click delete/update get contactid[i]
              
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact()
{

}   
