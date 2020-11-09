// ---------------------------- addUserFunction() ------------------------------------------

function addUserFunction() {

	var json = { "name": $("#name").val(), "surname": $("#surname").val(), "birthDate": $("#birthDate").val(), "email": $("#email").val(), "password": $("#password").val() }

	$.ajax({
		type: "POST", // praticamente il nostro method nei form
		contentType: "application/json", // formato dei dati che stiamo facendo viaggiare
		url: "/defAddUser", // praticamente il nostro action nei form
		data: JSON.stringify(json), //"stringo" il pacchetto di dati che viaggia
		dataType: 'json', // formato dei dati che ci arriva in ritorno
		cache: false, // vorrei non venisse salvato nulla nella cache
		success: function(result) {

			if (result.name.length > 4) {
				//console.log("stampo il nome del tizio salvato " + result.name);
				alert("New User " + result.name + " " + result.surname + " created");
			} else {
				//console.log("BUUUUUU");
				alert("New User has a short name... anyway " + result.name + " " + result.surname + " created");
			}
			window.location.href = "http://localhost:8080/";
		},
		error: function(_e) {
			alert("errore, qualcosa e' andato storto");
		}
	});
}

// ------------------------------ loginFunction() -------------------------------------------

function loginFunction() {

	var json = { "email": $("#emailLogin").val(), "password": $("#passwordLogin").val() }

	$.ajax({
		type: "POST", // praticamente il nostro method nei form
		contentType: "application/json", // formato dei dati che stiamo facendo viaggiare
		url: "/login", // praticamente il nostro action nei form
		data: JSON.stringify(json), //"stringo" il pacchetto di dati che viaggia
		dataType: 'json', // formato dei dati che ci arriva in ritorno
		cache: false, // vorrei non venisse salvato nulla nella cache
		success: function(result) {
			// Check browser support
			if (typeof (Storage) !== "undefined") {
				// Store
				userLogged = JSON.stringify(result);
				sessionStorage.setItem("userLogged", userLogged);
				//alert("Store user: " + JSON.parse(sessionStorage.getItem("userLogged")).email);
			} else {
				document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
			}
			//alert("User " + result.email + " logged");
			window.location.href = "http://localhost:8080/profile";
		},
		error: function(_e) {
			alert("errore, qualcosa e' andato storto nella login!");
		}
	});
}

// -------------------------------- findAllUser() --------------------------------------------
var justShowed = false;
function findAllUser() {

	var html = "";
	var user = null;
	if (justShowed == false) {
		$.ajax({
			type: "POST", // praticamente il nostro method nei form
			url: "/findAll", // praticamente il nostro action nei form
			dataType: 'json', // formato dei dati che ci arriva in ritorno
			cache: false, // vorrei non venisse salvato nulla nella cache
			//result dovrebbe essere un arrayList ma in js ci sono solo gli Array semplici
			success: function(result) {
				//alert(JSON.stringify(result));
				//questo serve per svuotare la tabella completamente
				//$("#userTable").empty();
				for (var i = 0; i < result.length; i++) {
					user = JSON.stringify(result[i]);
					html += '<tr id="rowTable' + i + '" class="border">';
					html += '<td id="idField">' + result[i].id + '</td>';
					html += '<td id="nameField">' + result[i].name + '</td>';
					html += '<td id="surnameField">' + result[i].surname + '</td>';
					html += '<td id="birthDateField">' + result[i].birthDate + '</td>';
					html += '<td id="emailField">' + result[i].email + '</td>';
					html += '<td id="pswField">' + result[i].password + '</td>';
					html += '<td id="deleteButton"> <button onClick="deleteUserFunction(' + result[i].id + ',' + i + ')">Delete</button> </td>';
					html += '<td id="updateButton"> <button onClick="showUpdateField(' + i + ')">Update</button> </td>';
					html += '</tr>';
					//alert("sono in findAllUser con i="+ i+" e userToUpdate="+user);
					localStorage.setItem("userToUpdate" + i, user);
				}
				$("#userTable").append(html);
				justShowed = true;
			},
			error: function(_e) {
				alert("errore, qualcosa e' andato storto nel findAllUser");
			}
		});
	}
}

// ------------------------------- showUpdateField() -----------------------------------------------

function showUpdateField(index) {

	var userToUpdate = null;
	userToUpdate = localStorage.getItem("userToUpdate" + index);
	//alert("stampo l utente recuperato " + userToUpdate);
	userToUpdate = JSON.parse(userToUpdate);
	var riga = "#rowTable" + index;
	//aggiorno campi della tabella con input per inserire le modifiche
	$(riga).attr("style", style="background-color:ghostwhite");
	$(riga + " #idField").html("<input type='text' id='id' readonly='readonly' value='" + userToUpdate.id + "' />");
	$(riga + " #nameField").html("<input type='text' id='name' value='" + userToUpdate.name + "' />");
	$(riga + " #surnameField").html("<input type='text' id='surname' value='" + userToUpdate.surname + "' />");
	$(riga + " #birthDateField").html("<input type='text' id='birthDate' value='" + userToUpdate.birthDate + "' />");
	$(riga + " #emailField").html("<input type='text' id='email' value='" + userToUpdate.email + "' />");
	$(riga + " #pswField").html("<input type='text' id='password' value='" + userToUpdate.password + "' />");
	$(riga + " #deleteButton").html("<button onClick='updateUserFunction(" + index + ")'>Update</button>");
	$(riga + " #updateButton").html("<button onClick='cancelUpdateUserFunction(" + index + ")'>Cancel</button>");
	//$(riga + " #updateButton").click(updateUserFunction());
}

// -------------------------------- deleteUserFunction() ------------------------------------------

function deleteUserFunction(id, index) {

	var json = { "id": id };
	var riga = "#rowTable" + index;
	//alert("id: " + id + " row " + riga);
	$.ajax({
		type: "DELETE", // praticamente il nostro method nei form
		contentType: "application/json", // formato dei dati che stiamo facendo viaggiare
		url: "/delete", // praticamente il nostro action nei form
		data: JSON.stringify(json), //"stringo" il pacchetto di dati che viaggia
		cache: false, // vorrei non venisse salvato nulla nella cache
		success: function() {

			$(riga).remove();
		}
	});
}

// ---------------------------------- updateUserFunction() ---------------------------------------

function updateUserFunction(i) {

	var json = { "id": $("#id").val(), "name": $("#name").val(), "surname": $("#surname").val(), "birthDate": $("#birthDate").val(), "email": $("#email").val(), "password": $("#password").val() }
	var html = "";
	var riga = "#rowTable" + i;
	$.ajax({
		type: "POST", // praticamente il nostro method nei form
		contentType: "application/json", // formato dei dati che stiamo facendo viaggiare
		url: "/updateOldUser", // praticamente il nostro action nei form
		data: JSON.stringify(json), //"stringo" il pacchetto di dati che viaggia
		dataType: 'json', // formato dei dati che ci arriva in ritorno
		cache: false, // vorrei non venisse salvato nulla nella cache
		success: function(result) {
			html += '<td id="idField">' + result.id + '</td>';
			html += '<td id="nameField">' + result.name + '</td>';
			html += '<td id="surnameField">' + result.surname + '</td>';
			html += '<td id="birthDateField">' + result.birthDate + '</td>';
			html += '<td id="emailField">' + result.email + '</td>';
			html += '<td id="pswField">' + result.password + '</td>';
			html += '<td id="deleteButton"> <button onClick="deleteUserFunction(' + result.id + ',' + i + ')">Delete</button> </td>';
			html += '<td id="updateButton"> <button onClick="showUpdateField(' + i + ')">Update</button> </td>';
			$(riga).attr("style", style="background-color:white");
			$(riga).html(html);
			//alert("result = "+result);
			user = JSON.stringify(result);
			localStorage.setItem("userToUpdate" + i, user);
		},
		error: function(_e) {
			alert("errore, qualcosa e' andato storto nell'update dell'utente");
		}
	});
}

// -------------------------------- cancelUpdateUserFunction() -------------------------------------

function cancelUpdateUserFunction(i) {

	var userToUpdate = null;
	userToUpdate = localStorage.getItem("userToUpdate" + i);
	userToUpdate = JSON.parse(userToUpdate);
	var html = "";
	var riga = "#rowTable" + i;
	html += '<td id="idField">' + userToUpdate.id + '</td>';
	html += '<td id="nameField">' + userToUpdate.name + '</td>';
	html += '<td id="surnameField">' + userToUpdate.surname + '</td>';
	html += '<td id="birthDateField">' + userToUpdate.birthDate + '</td>';
	html += '<td id="emailField">' + userToUpdate.email + '</td>';
	html += '<td id="pswField">' + userToUpdate.password + '</td>';
	html += '<td id="deleteButton"> <button onClick="deleteUserFunction(' + userToUpdate.id + ',' + i + ')">Delete</button> </td>';
	html += '<td id="updateButton"> <button onClick="showUpdateField(' + i + ')">Update</button> </td>';
	$(riga).attr("style", style="background-color:white");
	$(riga).html(html);

}

// ---------------------------- goToSignIn() and goToLogin() -------------------------------------

function goToSignIn() {

	$("#signIn-tab").click();
	$("#signIn-tab").attr("class", "nav-link active");
	$("#login-tab").attr("class", "nav-link");
}
function goToLogin() {

	$("#login-tab").click();
	$("#login-tab").attr("class", "nav-link active");
	$("#signIn-tab").attr("class", "nav-link");
}

// ------------------------------ logout() --------------------------------------------------------

function logout() {
	localStorage.clear();
	sessionStorage.clear();
	window.location.href = "http://localhost:8080";
}
