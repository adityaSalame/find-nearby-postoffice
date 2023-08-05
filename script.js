let ipbutton=document.getElementById("get-started");
let ipaddress=document.getElementById("ip-address");
let IP;
ipbutton.addEventListener("click", navigate);
 $.getJSON("https://api.ipify.org?format=json", function(data) {
         
    
    IP=data.ip;
    console.log(IP);
    ipaddress.innerHTML=`<div style="color:#B8BCCC">Your Current IP Address is </div><div style="color:white">${IP}</div>`;

})
async function getloaction(ip){
try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=0a77716b0c5398`);
    const data = await response.json();
    let coord=data.loc.split(',');
    let obj={
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country,
        lat:coord[0],
        long:coord[1],
        org:data.org,
        postal:data.postal,
        timezone:data.timezone

    }
    sessionStorage.setItem('locate',JSON.stringify(obj));
    sessionStorage.setItem('ip',obj.ip);
    window.location.href='./postoffice location';
    return data;
  } catch (error) {
    alert('Error getting location by IP:'+error);
    return null;
  }
}
function navigate(e){
    e.preventDefault();
    let res=getloaction(IP);
        if(res==null) {alert("location cannot be fetched");}
        else{
            const result=res;
           
           
            
        // function getLocation() {
        //     if (navigator.geolocation) {
        //         console.log(navigator.geolocation);
        //       navigator.geolocation.getCurrentPosition(showPosition);
        //     } else {
        //       x.innerHTML = "Geolocation is not supported by this browser.";
        //     }
        //   }
          
        //   function showPosition(position) {
        //     console.log( position.coords.latitude);
        //     console.log( position.coords.longitude);
        //   }
          //getLocation();
     }
    
    
   
}