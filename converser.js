function Client(apikey)
{
	this.apikey = apikey;
    var httpregisterdevice;
	if (typeof XMLHttpRequest == "undefined")
  			XMLHttpRequest = function () {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) {}
    //Microsoft.XMLHTTP points to Msxml2.XMLHTTP and is redundant
    throw new Error("This browser does not support XMLHttpRequest.");
  	};

 	this.registerdevice = function(useridentity, deviceos, devicemodel, successcb){
	   var dat = '{"ident" : "' + useridentity + '", "device" : { "os" : "' + deviceos + '", "model" : "' + devicemodel + '"}}';
 	   console.log(dat);
     console.log('dat.length :' + dat.length);
     httpregisterdevice = new XMLHttpRequest();
     httpregisterdevice.open("POST", "https://api.converser.io/subscribe", true);
	   httpregisterdevice.setRequestHeader("X-CONVERSER-APP-ID", this.apikey);
	   httpregisterdevice.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	   httpregisterdevice.setRequestHeader("Content-length", dat.length);
     
     httpregisterdevice.onreadystatechange = function() {
       console.log(httpregisterdevice);
       	    // httpregisterdevice.status == 200 no status in response
			if(httpregisterdevice.readyState == 4) {
				console.log(httpregisterdevice.getAllResponseHeaders());
				console.log("recieved : " + httpregisterdevice.responseText);
				successcb(httpregisterdevice.responseText);
			}
		}
       httpregisterdevice.send(dat);
 	}	
}