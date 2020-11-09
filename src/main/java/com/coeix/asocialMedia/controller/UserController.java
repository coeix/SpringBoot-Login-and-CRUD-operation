package com.coeix.asocialMedia.controller;

import java.io.IOException;
import java.util.ArrayList;

//import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.context.request.RequestAttributes;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.coeix.asocialMedia.entity.User;
import com.coeix.asocialMedia.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

// -------------------------------------------- /home --------------------------------------------------

	@GetMapping(value = { "/", "/home" })
	// creo all'interno del controller un metodo home che risponde all’url /home o /
	public ModelAndView home(HttpServletResponse response, @ModelAttribute User user) throws IOException {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("home"); // e' possibile utilizzare il metodo setViewName()
								// per dire in quale pagina voglio andare
		return mv;
	}

// -------------------------------------------- /addNewUser ---------------------------------------------
	/*
	@GetMapping(value = "/addNewUser")
	public ModelAndView displayNewUserForm() {

		ModelAndView mv = new ModelAndView("addUser");
		mv.addObject("headerMessage", "Sing up");
		mv.addObject("subHeader", "It’s quick and easy");
		mv.addObject("user", new User());
		return mv;
	}*/

	@PostMapping(value = "/defAddUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User createNewUser(@RequestBody User user) {

		User userCheck = userRepository.save(user);
		return userCheck;
	}
	
// -------------------------------------------- /profile ------------------------------------------------

	@GetMapping(value = "/profile")
	public ModelAndView goToProfile() {

		ModelAndView mv = new ModelAndView("profile");
		return mv;
	}

// -------------------------------------------- /login --------------------------------------------------
	
	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User loginProfile(@RequestBody User user) {

		User userCheck = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		
		// ------------------------------ another Session ---------------------------------------
		/*RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;
        HttpServletRequest request = attributes.getRequest();
        HttpSession session = request.getSession(true);*/
        // Session control
        /*if (userCheck!=null) {
        	session.setAttribute("userLogged", userCheck);*/
        	return userCheck;
        /*}
        else {
        	session.setAttribute("error", "Login error, try again");
        	return new User();
        }*/
		
	}
	
//-------------------------------------------- /findAll --------------------------------------------------

	@PostMapping(value = "/findAll", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ArrayList<User> findAllUsers() {
		ArrayList<User> usersList = (ArrayList<User>) userRepository.findAll();
		return usersList;
	}
	
//-------------------------------------------- /delete --------------------------------------------------

	@DeleteMapping(value = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE)
	public void deleteUser(@RequestBody User user) {
		//System.out.println("--------------------------------------id nel delete: "+user.getId());
		userRepository.deleteById(user.getId());
	}
	
//-------------------------------------------- /update --------------------------------------------------
	
	@PutMapping(value = "/updateOldUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User updateUser(@RequestBody User user) {
		User userCheck = userRepository.save(user);
		return userCheck;
	}
}