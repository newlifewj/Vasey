# -- host.js --
The **router** for hosting -- accessing hostpage

### URL 
_**'/'**_ or _**' '**_ is the Url for hostpage.  Assuming the webBase is _http://www.myweb.com_, 
the following Urls:

	http://www.myweb.com			//get hostpage
	http://www.myweb.com/			//get hostpage
	
**Note:** Sometimes the routers or interceptors mounted ahead continue error silently (by next()) and 
redirect to the hostpage. 
