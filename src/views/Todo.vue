<template>
    <div class="wrapper">
        <div class="container">
            <h1> Todo-List</h1>             
                    <div class="body-block">
                        <div class="input-wrapper">
                            <input  class="main-input" type="text" placeholder="Add your note" v-model="todo">  
                        </div>
                        <button  class="main-btn" type="submit" value="add" @click="noteHandler" v-text="actionButtonName" />
                    </div>
               
                    <br>
                    <hr>
                        <TransitionGroup tag="ul" name="list" class="list" appear>
                            <li class="list-item" v-for="(todo, index) in todos" :key="todo">
                            {{index + 1}}) {{ todo }}
                            <div>
                            <button class="edit-btn" @click="editTodo(todo, index)" >Edit</button>
                            <button class="delete-btn" @click="deleteTodo(index)" >Delete</button>
                            </div>
                            </li>
                        </TransitionGroup>
                        <p class="nothing-to-do" v-if="(todos.length === 0)">Nothing to do</p>
                    </div>    
         </div>
</template>
<script>
export default{
    data(){
        return{
            selectedIndex: null,
            isEditing : false,
            todo:'',
            todos:[],
        }
    },
    mounted(){
        const data =  localStorage.getItem('todos');
        if(data){
            this.todos = JSON.parse(data);
        }
    },
    computed:{
        actionButtonName(){
            return this.isEditing ? "Edit" : "Add Note";
        }
    },
    methods:{
        noteHandler () {
            if (this.isEditing) {
                this.updateTodo();
            } else {
                this.addToDo();
            }
        },
        
        addToDo(){
            if(this.todo.length > 0){
                this.todos.push(this.todo);
                this.todo = ''
            }
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },

        deleteTodo(index){
            this.todos.splice(index,1);
            localStorage.setItem('todos', JSON.stringify(this.todos))
        },

        editTodo(todo, index){
            console.log(todo)
            this.todo = todo;
            this.selectedIndex = index;
            this.isEditing = true;  
        },

        updateTodo(){
            this.todos.splice(this.selectedIndex, 1 , this.todo);
            this.isEditing = false;
            this.todo = ''
        },
    },
}

</script>

<style  scoped>

h1{
    text-align: center;
    padding-top: 50px;
    color: var(--dark);
}
hr{
    border: none; 
    color: var(--dark); 
    background-color: var(--dark); 
    height: 1px; 
}
.wrapper{
    min-height: 100vh;
}
.container{
    max-width: 1280px;
    margin: 0 auto;
  }

.body-block{
  width: 100%;;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 15px;
}
.input-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.main-input{
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px 0px 16px 0px;
  transition: 0.4s;
}

.main-input:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0px 16px 0px 16px;
}


.main-btn{
    background-color: var(--dark);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 4rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all 0.3s;
    border: none;
    margin: 20px 0px 0px 0px;
}
.main-btn:hover{
	border:2px solid var(--dark);
	color: var(--dark);
	background-color: #FFF;
}
.list{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0px 0px 0px;
    padding: 0px 15px; 
    position: relative;
}

.list-item {
    font-size: 20px;
    color: var(--dark);
}
.edit-btn {
    background-color: var(--dark);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 3rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all 0.3s;
    border: none;
}
.edit-btn:hover{
	border:2px solid var(--dark);
	color: var(--dark);
	background-color: #FFF;
}
.delete-btn {
    background-color: var(--medium-light);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 3rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all 0.3s;
    border: none;
    margin: 20px 30px;
}
.delete-btn:hover{
	border:2px solid var(--dark);
	color: var(--dark);
	background-color: #FFF;
}
.nothing-to-do{
    font-weight: 600;
    padding: 0rem 3rem;
    font-size: 20px;
}

.list-enter-from{
    opacity: 0;
    transform: scale(0.6);
}
.list-enter-to{
    opacity: 1;
    transform: scale(1);
}
.list-enter-active{
    transition: all 0.4s ease;
}

.list-leave-from{
    opacity: 1;
}
.list-leave-to{
    opacity: 0;
}
.list-leave-active{
    transition: all 0.4s ease;
    position: absolute;
}

.list-move{
    transition: all 0.3s ease;
}



@media screen and (max-width:800px){
    h1{
    padding-top: 30px;
    font-size: 26px;
    }
    
    .main-input{
        font-size: 16px;
    }
    .main-btn{
	padding: 1rem 3rem;
    font-size: 12px;
    }
    .list{
    margin: 10px 0px 0px 0px;
    padding: 10px 15px; 
    }
    .delete-btn{
    padding: 1rem 2.5rem;
    font-size: 12px;
    
    }
    .edit-btn{
    padding: 1rem 2.5rem;
    font-size: 12px;
    
    }
    .list-item {
    font-size: 18px;
    color: #003b46;
    }
}

</style>
