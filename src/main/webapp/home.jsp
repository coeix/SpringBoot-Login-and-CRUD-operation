<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
		<style type="text/css">
     		<%@include file="css/style.css"%>
		</style>
		<title>Welcome</title>
	</head>
	
	<body>
		<div class="page">
			<!-- ----------------------- Navbar ------------------------ -->
			<ul class="nav nav-tabs" id="myTab">
				<li class="nav-item">
					<a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="home" aria-selected="true">
					Login</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="signIn-tab" data-toggle="tab" href="#signIn" role="tab" aria-controls="profile" aria-selected="false">
					Sign in</a>
				</li>
			</ul>
			<div class="tab-content" id="myTabContent">
				<!-- --------------------- Login ------------------------ -->
				<div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
					<br/><br/>
					<p>
						<input type="text" id="emailLogin" /><br/>
						<label>Email</label><br/>
						<input type="text" id="passwordLogin" /><br/>
						<label>Password</label><br/>
					</p>
					<br/>
					<button onClick="loginFunction()">Login</button>
					<br/><br/>
					<p class="subtitle">
						Don't have an account? <a href="#signIn" onclick="goToSignIn()">Sign in</a>
					</p>
				</div>
				<!-- --------------------- Sing in ----------------------- -->
				<div class="tab-pane fade" id="signIn" role="tabpanel" aria-labelledby="signIn-tab">
					<br/><br/>
					<p>
						<input type="text" id="name" /><br/>
						<label>Name</label><br/>
						<input type="text" id="surname" /><br/>
						<label>Surname</label><br/>
						<input type="text" id="birthDate" /><br/>
						<label>Birth Date</label><br/>
						<input type="text" id="email" /><br/>
						<label>Email</label><br/>
						<input type="text" id="password" /><br/>
						<label>Password</label><br/>
					</p>
					<br/>
					<button onClick="addUserFunction()">Create new user</button>
					<br/><br/>
					<p class="subtitle">
						Do you already have an account? 
						<a href="#login" onclick="goToLogin()">Log in</a>
					</p>
				</div>
				
			</div>
		</div>
	</body>
</html>