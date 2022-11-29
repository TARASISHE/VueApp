<template>
	<main class="login">
		<section class="forms">
			<form class="register" @submit.prevent="register">
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="register_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<input 
					type="submit" 
					value="Register" />
                <p class="login-note">Already have an account?<span> <router-link class="access-linklog" to="/Login">Login</router-link></span></p>
			</form>
		</section>
	</main>
</template>

<script >
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
	setup () {
		const register_form = ref({});
		const store = useStore();
		const register = () => {
			store.dispatch('register', register_form.value);
		}
		return {
			register_form,
			register
		}
	}
}
</script>

<style scoped>
.login{
	min-height: 100vh;
	padding: 0;
}
.forms {
	display: flex;
	min-height: 100vh;
    background-color: #c4dfe6;
}
form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
	margin-top: 55px;
}

h2 {
	font-size: 2rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
    color: #07575b;
	text-align: center;
}
input {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
    border-radius: 5px;
}
input:not([type="submit"]) {
	opacity: 0.8;
	transition: 0.4s;
}
input:focus:not([type="submit"]) {
	opacity: 1;
}
form.register input:not([type="submit"]):focus{
	box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
input::placeholder {
	color: inherit;
}
form.register input:not([type="submit"]) {
    color: #07575b;
	border-bottom: 2px solid #07575b;
}

form.register input[type="submit"] {
	background-color: #07575b;
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
    transition: all 0.3s;
}
form.register input[type="submit"]:hover{
	border:2px solid #07575b;
	color: #07575b;
	background-color: #FFF;
}
.login-note{
    font-size: 18px;
    color: #07575b;
	text-align: center;
}
.access-linklog{
	text-decoration: none;
	font-weight: 600;
	color: #07575b;
    padding: 0px 10px;
    font-size: 18px;
    transition: all 0.3s;
}

.access-linklog:hover{
	text-decoration: underline;
}

@media screen and (max-width:540px){
	.forms{
		padding: 0px 15px;
	}
	h2{
	font-size: 1.5rem;
	margin-bottom: 1rem;
	margin-top: 35px;
	}
	input{
	width: 90%;
	font-size: 1rem;
	margin-bottom: 2.5rem;
	padding: 0.5rem 0rem;
	}
	form {
	margin-top: 0px;
}
	
}


</style>

