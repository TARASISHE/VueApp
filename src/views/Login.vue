<template>
	<main class="login">
		<section class="forms">
			<form class="login" @submit.prevent="login"> <!--@submit.prevent="$store.dispatch('login')"-->
				<h2>Login</h2>
				<input 
					name="email"
					type="email" 
					placeholder="Email address"
					v-model="login_form.email" />
				<input 
					name="password"
					type="password" 
					placeholder="Password" 
					v-model="login_form.password" />
					<!--<button 
					class="login_btn"
					@click="$store.dispatch('login')">
						Login
					</button>  якщо роблю через кнопку то видає помилку при вході на сторінку через Composition API, бо не виде реф-->
				<input 
					type="submit" 
					value="Login" />
				<p class="register-note">Don't have an account? <router-link class="access-link" to="/register">Register</router-link></p>

			</form>
		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'


export default {
	setup () {
		const login_form = ref({});
		const store = useStore();
		const login = () => {
			store.dispatch('login', login_form.value);
		}
		return {
			login_form,
			login,
		}
	},
}
</script>

<!--
	<script>
		export default{
			data(){
				return{
					loginForm:{},
				}
			},
			methods:{
				enterLoginInfo(){
					this.$store.dispatch('login', loginForm)
				}
			}
		}

	</script>
-->
<style scoped>

.login{
	min-height: 100vh;
	padding: 0;
}
.forms {
	display: flex;
	min-height: 100vh;
	background-color: var(--light-color);
}
form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
}
h2 {
	text-align: center;
	font-size: 2rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
	color: var(--medium-dark);
	margin-top: 175px;
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
input::placeholder {
	color: inherit;
}

form.login input:not([type="submit"]) {
	color: var(--medium-dark);
	border-bottom: 2px solid var(--medium-dark);
}

form.login input:not([type="submit"]):focus{
	box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

form.login input[type="submit"] {
	background-color: var(--medium-dark);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all 0.3s;
}
form.login input[type="submit"]:hover{
	border:2px solid var(--medium-dark);
	color: var(--medium-dark);
	background-color: #FFF;
}
.register-note{
	font-size: 18px;
	color: var(--medium-dark);
	text-align: center;
}
.access-link{
	text-decoration: none;
	font-weight: 600;
	color: var(--medium-dark);
	font-size: 18px;
	padding: 0px 15px;
	transition: all 0.3s;
}
.access-link:hover{
	text-decoration: underline;
}
/*
.login_btn{
	background-color: var(--medium-dark);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all 0.3s;
	appearance: none;
	border: none;
	outline: none;
	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 1.0rem 0rem;
	border-radius: 5px;
}
.login_btn:hover{
		border:2px solid var(--medium-dark);
	color: var(--medium-dark);
	background-color: #FFF;
}
*/

@media screen and (max-width:540px){
	.forms{
		padding: 0px 15px;
	}
	h2{
	font-size: 1.5rem;
	margin-bottom: 1rem;
	margin-top: 175px;
	}
	input{
	width: 90%;
	font-size: 1rem;
	margin-bottom: 2.5rem;
	padding: 0.5rem 0rem;
	}
	
}
</style>