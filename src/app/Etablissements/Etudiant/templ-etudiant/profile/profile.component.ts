import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  id;
  ids;
  user;
  d
  constructor(private token :TokenStorageService,private router :Router,private userService :UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    this.d=this.userService.getUserById(this.currentUser[0]._id).subscribe(async data=>{
      this.user=data
    
    console.log("user,user",this.user)
  })
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    console.log("ioi",this.ids)
    //this.getExercices();
  }

  
  updateProfileInformations(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updateInformations',iduser])
 console.log("eeeeeeeeeeeeeee")
}

updateProfilePassword(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updatePassword',iduser])
 console.log("eeeeeeeeeeeeeee")
}



}
