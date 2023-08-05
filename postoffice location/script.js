let locat=JSON.parse(sessionStorage.getItem('locate'));
console.log(locat);
let city=locat.city;
let org=locat.org;
let host=locat.ipinfo;
let timezone=locat.timezone;
let pincode=locat.postal;
let datetime=new Date().toLocaleString("en-US", { timeZone: timezone });
let organisation=locat.org;
let region=locat.region;

let lat=locat.lat;
let long=locat.long;

document.getElementById("iframe").innerHTML+=`
<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"
>
</iframe>
`;

let ip=locat.ip;
let ipaddress=document.getElementById("ip-address");
ipaddress.innerHTML=`<div class="label">IP Address : </div><div class="label-info">${ip}</div>`;

let results=document.getElementById("results");

document.getElementById("city").innerHTML=`<div class="label">City: </div><div class="label-info">${city}</div>`;
document.getElementById("organisation").innerHTML=`<div class="label">Organisation: </div><div class="label-info">${organisation}</div>`;
document.getElementById("hostname").innerHTML=`<div class="label">Hostname: </div><div class="label-info">${host}</div>`;
document.getElementById("region").innerHTML=`<div class="label">Region: </div><div class="label-info">${region}</div>`;
document.getElementById("long").innerHTML=`<div class="label">Long: </div><div class="label-info">${long}</div>`;
document.getElementById("lat").innerHTML=`<div class="label">Lat: </div><div class="label-info">${lat}</div>`;
document.getElementById("timezone").innerHTML=`<div class="label">Timezone: </div><div class="label-info">${timezone}</div>`;
document.getElementById("date-time").innerHTML=`<div class="label">Date And Time: </div><div class="label-info">${datetime}</div>`;
document.getElementById("pincode").innerHTML=`<div class="label">Pincode: </div><div class="label-info">${pincode}</div>`;

let postofficearray;
     
    //    let postoffice= await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
       
    //   let res= postoffice[0];
    //   console.log(postoffice);
    //     document.getElementById("message").innerHTML=`${res.Message}`;

//[{"Message":"Number of pincode(s) found:2","Status":"Success",
//"PostOffice":[{"Name":"Khursipar Bhilai","Description":null,"BranchType":"Sub Post Office","DeliveryStatus":"Delivery",
//"Circle":"Chattisgarh","District":"Durg","Division":"Durg","Region":"Raipur","Block":"Durg","State":"Chattisgarh",
//"Country":"India","Pincode":"490011"},{"Name":"New Khursipar Bhilai","Description":null,"BranchType":"Sub Post Office","DeliveryStatus":"Non-Delivery","Circle":"Chattisgarh","District":"Durg","Division":"Durg","Region":"Raipur","Block":"Durg","State":"Chattisgarh","Country":"India","Pincode":"490011"}]}]
// let url=`https://api.postalpincode.in/pincode/${pincode}`;
// let fetched=fetch(url);
// console.log(JSON.stringify(fetched));
async function getpost(pincode){
   

    await fetch(`https://api.postalpincode.in/pincode/${locat.postal}`)
    .then(response => response.json())
    .then( response => response[0] )
    .then(response => {
      console.log(response.PostOffice);
      document.getElementById("message").innerHTML=`<div class="label">Message: </div><div class="label-info">${response.Message}</div>`;
     return response.PostOffice;
      } )
     .then(data =>{
        
  
      postofficearray=data;
      console.log(postofficearray.length);
        renderitems(postofficearray);
     
    
    
})



}

function renderitems(){
    results.innerHTML="";
        let elements="";
        for(let i=0;i<postofficearray.length;i++){
            let o=postofficearray[i];
            elements += ` <div class="card" style="background-color:#575A85">
            <div>Name : ${o.Name}</div>
            <div>Branch Type : ${o.BranchType}</div>
            <div>Delivery Status : ${o.DeliveryStatus}</div>
            <div>District : ${o.District}</div>
            <div>Division : ${o.Division}</div>
          </div>`;
        }
        results.innerHTML=elements;
}
    
//     catch(error){ alert("Problem with fetching data")};




function searchPostOffice(){
    results.innerHTML="";
    let val=document.getElementById("search-input").value;
    for(let i=0;i<postofficearray.length;i++){
      val=val.toLowerCase();
      let o=postofficearray[i];
      let n=o.Name.toLowerCase();
      let b=o.BranchType.toLowerCase();
        if(n.includes(val)||b.includes(val)){
            results.innerHTML += ` <div class="card">
            <div>Name : ${o.Name}</div>
            <div>Branch Type : ${o.BranchType}</div>
            <div>Delivery Status : ${o.DeliveryStatus}</div>
            <div>District : ${o.District}</div>
            <div>Division : ${o.Division}</div>
          </div>`;
        }
    }
}

getpost(pincode);

document.getElementById("search-input").addEventListener("keyup",searchPostOffice);