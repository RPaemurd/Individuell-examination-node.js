Börja med att köra npm init -y, nedb-promises, joi, nodemon, express, uuid



Vi har alla i gruppen bidragit med kod men pga strul med tider så är det bara Alexander och Baran som pushat upp till main. Vi har skickat vår kod över discord och lagt in det separat för att få det att fungera på ett relativt vettigt sätt. 


Menyn:
För att kolla menyn : http://localhost:8080/menu
För att kolla efter specifikt id: http://localhost:8080/menu/  (här skriver du in det långa id som du hittar i airbean.db t.ex. Az3b6aeCng6rbrET)

Varukorgen:
För att kolla innehållet i varukorgen : http://localhost:8080/cart
För att lägga till i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8080/cart
För att ta bort i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8080/cart/ (här skriver du det långa id:et. T.ex. http://localhost:8080/cart/XFMyYITYP52LXcYq)

Om oss:
Endpoint för om oss: http://localhost:8080/about


För registrering:
http://localhost:8080/auth/register
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

För login : 
http://localhost:8080/auth/login
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

För att lägga en beställning som gäst:
Gå till http://localhost:8080/checkout och gör ett POST-anrop
Gå sedan till http://localhost:8080/status för att se när ditt kaffe levereras

För att lägga en beställning som användare
Gå till http://localhost:8080/checkout därefter skriver du i headers key : Content-Type, Value : application.json
Raden under i headers. Key : user-id, Value : (här skriver du in ditt unika id som du hittar i users.db)
Sen gör du ett POST-anrop.

För att se orderhistory:
http://localhost:8080/orderhistory/ (här skriver du in din användares unika id)

För att se status på din order: 
http://localhost:8080/status




