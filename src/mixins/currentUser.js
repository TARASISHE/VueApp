/*import firebase from 'firebase/app'
import { getUid } from '../firebase'



export default {
    data (){
        return{
            userData:null,
        }
    },
    methods: {
        async getUid(){
            const user = firebase.auth().currentUser;
            return user? user.uid : null
        },
        async getName(){
            const userId = await this.getUid();
            let name;
            if(!userId) return name = null;
            await firebase.database().ref(`/users/${userId}/info`).once('value', function(snapshot){
                name = snapshot.val();
            });
            return name.name;
        },
        getCurrUser(){
            const user = firebase.auth().currentUser;
            this.userData = user;
        }
    }
}
*/