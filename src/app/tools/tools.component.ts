import { Component, OnInit, TemplateRef,Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { HttpClient } from '@angular/common/http';
import { PaginationModule, BsModalService, BsModalRef} from 'ngx-bootstrap';
import { BayUpdates } from './bayupdates';
// import { AddTools } from './bayupdates';
import { DataService } from '../data.service';
import { IConsoles,IOwners,Swaptools, IToolCat, AddTools } from '../dashboardhome/consolesInterface';
import { ActivatedRoute } from '@angular/router';
import { BrowserJsonp } from '@angular/http/src/backends/browser_jsonp';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';

interface Tools{
  id:number;
  name:string;
  status:string;
  status_value:string;
  bay: number;
  image: File;
  tool_owner:object; 
  // {
  //     "first_name": "Srinivas",
  //     "id": 71,
  //     "email": "Srinivas_Gopalakrishna@amat.com"
  // },
  bay_number:string;
  current_project: string;
  is_active:boolean;
      }
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit, OnDestroy {
  toolsprojects: any=[];
  projectsid: any;
  toolsusers: any=[];
 
  selectuserstool:any;
  selectprojects:any;
public req1:any;
public req2:any;
private req:any;
  toolList:any;
  console1:any;console2:any;console3:any;console4:any;console5:any;
  console6:any;console7:any;console8:any;nullconsole:any;
movebay:any;
toolid1:any;
public allconsoles:any;
editableSelect:any;
consolenames:any;
EditRowId:any;
p:number = 1;
pageSize:number= 10;
total:number;
modalRef: BsModalRef;
messageresponse:any;
term:any;
toolownerobj:any;
_toolCategory
_postsArray:any;
baytools:BayUpdates = new BayUpdates();
usersid:any;
totaldetails:any;
imageToBackend:any=null;
usersAssigned:any;





// settings = {
//   delete: {
//     confirmDelete: true,
//   },
//   edit: {
//     confirmSave: true,
//   },
//   columns: {
//     id: {
//       title: 'ID',
//     },
//     bay: {
//       title: 'Consoles',
//       valuePrepareFunction: (bay) => {
//         return bay.name;
//       },
//       editor:{
//         type: 'list',
//         config: {
//             list:''           
//         },
//       },
//     },
//     name: {
//       title: 'Tool Name',
//       editor:{
//         type: 'list',
//         config: {
//             list: [
//               {value: 'TRUE', title: 'true'},
//               {value: 'FALSE', title: 'false'},
//             ]
//         }
//       },
//     },
//     status: {
//       title: 'Status',
//     },
//     bay_number:{
//       title: 'Bay Number',
//       editor:{
//         type: 'list',
//         config: {
//             list: [
//               {value: 'TRUE', title: 'true'},
//               {value: 'FALSE', title: 'false'},
//             ]
//         }
//       },
//     },
//     is_active:{
//       title:'Is Active',
//       editor:{
//         type: 'list',
//         config: {
//             list: [
//               {value: 'TRUE', title: 'true'},
//               {value: 'FALSE', title: 'false'},
//             ]
//         }
//       },
//     }

   
//   },
// };

  
  constructor(private http:HttpClient,private _toolservice:DataService,
  private _modalservice:BsModalService,private _dashserve:DataService,private route:ActivatedRoute ) {

   }

   addtools:AddTools = new AddTools();
   swaptools:Swaptools = new Swaptools();
   tools :Tools = {} as Tools;
  ngOnInit() {
    this.toolid1 = this.route.snapshot.params['id'];
    
    this.callAlltools();
    

    // this.req1 = this.http.get('assets/json/movebay.json').subscribe(data => {
    //   console.log(data);
    //   this.movebay = data;
    //   console.log(this.movebay.length)
    //   this.total = this.movebay.length;

      
    // });


    this.req1 = this._toolservice.getTools().subscribe(data=>{
      this.movebay = data; 
      this.total = this.movebay.length;

    })

    // this.req2 = this.http.get('assets/json/consoles.json').subscribe(data => {
    //   console.log(data);
    //   this.allconsoles = data;
      
    // });

    this.req2 = this._toolservice.getConsoles().subscribe(data=>{
      this.allconsoles = data;
    })
// added now for tooladd
      this._dashserve.getConsoles().subscribe(data =>{
          this._postsArray = data as IConsoles[];
        
      })
      this._dashserve.getOwners().subscribe(data=>{
        this.toolownerobj = data;
      
      })

      this._dashserve.getToolCategory().subscribe(data=>{
        this._toolCategory = data;
      //  this._toolCat = this._toolCategory.map(data=>{
      //    return data.category_name;
      //  })
      //  this._toolCatId = this._toolCategory.map(data=>{
      //    return data.id;
      //  })
      })

      this._dashserve.getAllusers().subscribe(data=>{
        this.selectuserstool = data;
      })
      this._dashserve.getAllprojects().subscribe(data=>{
        this.selectprojects =data;

      })
      

}
callAlltools(){
  this.req = this._dashserve.getAllTools().subscribe(data => {
    this.toolList = data as [any];

    this.console1 = this.toolList.filter(data => {
      return data.bay==241 && data.is_active == true});
  
      this.console2 = this.toolList.filter(data => {
      return data.bay==256 && data.is_active == true});

      this.console3 = this.toolList.filter(data => {
      return data.bay==242 && data.is_active == true});

      this.console4 = this.toolList.filter(data => {
      return data.bay==245 && data.is_active == true});

      this.console5 = this.toolList.filter(data => {
      return data.bay==243 && data.is_active == true});

      this.console6 = this.toolList.filter(data => {
      return data.bay==255 && data.is_active == true});

      this.console7 = this.toolList.filter(data => {
      return data.bay==244 && data.is_active == true});

      this.console8 = this.toolList.filter(data => {
      return data.bay==258 && data.is_active == true});

      this.nullconsole = this.toolList.filter(data => {
      return data.bay==257 && data.is_active == false});

  });
}


saveNewTools(tooldata){
  // tooldata.image_field = this.imageToBackend;
  // console.log('IMAGE IN SAVE API',this.imageToBackend);
  this._dashserve.saveNewTools(tooldata).subscribe(data=>{
    this.messageresponse = data;
    this.openModal(this.messageresponse);
    this.callAlltools()
  })

}
userstool(names){
  this.toolsusers=names;

}
assignuserstool(toolusers: TemplateRef<any>,tooldetails){
  this.tools=tooldetails;
  this._dashserve.sendIdGetUsers(tooldetails.id).subscribe(data=>{
  this.toolsusers = data;
  })

  this.modalRef=this._modalservice.show(toolusers,{class:'modal-lg'})
}

toolassignusers(details,id){
  let details2 =[];
  for (let i = 0; i < details.length; i++) {
    details2.push(details[i]['id']);
   }
   let userobjects:object;
   userobjects={'user_ids':details2};

   this._dashserve.toolassignusers(userobjects,id).subscribe(data=>{
   });

}
projectstool(names){
  this.toolsprojects=names;

}
assignprojecttool(toolprojects:TemplateRef<any>,tooldetails){
  this.tools=tooldetails;
  this._dashserve.sendIdGetProjects(tooldetails.id).subscribe(data=>{
    this.toolsprojects = data;
  });
  this.modalRef=this._modalservice.show(toolprojects,{class:'modal-lg'})

}
toolassignprojects(details,id){
  let details2 =[];
  for (let i = 0; i < details.length; i++) {
   //  console.log(abcd[i].id,"this this this this this ");
   //  console.log(abcd,"this is ");
   details2.push(details[i]['id']);
  
  }
  
  let totaldetail:object;
  totaldetail = {'project_ids':details2};
  
  //console.log('object ID',totaldetail)
   this._dashserve.toolprojects(totaldetail,id).subscribe(data=>{
   });

  }

swapTools(data){
  var temp1 = data.too1.bay;
  var temp2 = data.too1.bay_number;
  data.too1.bay = data.too2.bay;
  data.too1.bay_number = data.too2.bay_number;

  data.too2.bay = temp1;
  data.too2.bay_number = temp2;

  type baytool1 = {bay: number, 
    bay_number:string, id:number};

    type baytool2 = {bay: number, 
      bay_number:string, id:number};

      type baytoolarray = {too1:any,too2:any};

  var arr1: baytool1 = {bay: data.too1.bay,
      bay_number: data.too1.bay_number,id:data.too1.id}

      var arr2: baytool2 = {bay: data.too2.bay,
        bay_number: data.too2.bay_number,id:data.too2.id}

        var baytoolarrayObj:baytoolarray = {too1:arr1,too2:arr2};
//  let data1 = [];
//  data1.push(arr1,arr2);

  this._dashserve.swapTools(baytoolarrayObj).subscribe(data=>{
  })
 

}

// openModal(resp){
//   console.log("INSIDE OPENMODAL");
//   const initialState = {
//     title: 'Response',
//     messageresponse:resp
//   };
//   this.modalRef = this._modalservice.show(ModalContentComponent, {initialState});
//   this.modalRef.content.closeBtnName = 'OK';
// }





  

  ngOnDestroy() {
    this.req1.unsubscribe();
    this.req2.unsubscribe();
  }


  EditMove(value){
    this.EditRowId = value;
   
  }

  CancelBayUpdate(){
    this.EditRowId= "";
  }

  UpdateBays(data,template){
    this.EditRowId= "";
    type MyArrayType1 = {bay: number, name: string, 
      bay_number:number, is_active:boolean, id:number,status:string,tool_owner:string};

    var arr: MyArrayType1 = 
      {bay: data.bay.name, name: data.name,
        bay_number: data.bay_number,is_active: data.is_active,
        id:data.id, status:data.status, tool_owner:data.tool_owner.first_name}
    ;
   
    this._toolservice.UpdateBays(arr).subscribe(data =>{
      this.messageresponse = data;
      this.openModal(this.messageresponse);
      this.req1 = this._toolservice.getTools().subscribe(data=>{
        this.movebay = data;
        this.total = this.movebay.length;
      })
          
      //     // this.router.navigate(['dashboard']);
     })

  }
  onImageChange(event){
    console.log(event.target.files[0]);
    this.imageToBackend = event.target.files[0];
    
  }


  uploadToolImage(data){
    let imageObj = {id:data,image:this.imageToBackend}
  this._toolservice.uploadImage(imageObj).subscribe(data=>{
  })
}

  openModal(resp){
    const initialState = {
      title: 'Response',
      messageresponse:resp
    };
    this.modalRef = this._modalservice.show(ModalContentComponent, {initialState});
    this.modalRef.content.closeBtnName = 'OK';
    // this.modalRef = this._modalservice.show(temp);
  }

  titleCaseWord(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    this.addtools.name = str.join(' ');
    // return str.join(' ');
  }

 
}

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header" id="messgHeader">
      <h4 class="modal-title pull-left">Response</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" id="messgBody">
      {{messageresponse}}
    </div>
    <div class="modal-footer" id="messgFooter">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
 
export class ModalContentComponent implements OnInit {
  messageresponse:string;
  closeBtnName: string;
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
  }
}
