Börja med att köra npm install



För registrering:
http://localhost:3030/user/register
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord", "isAdmin": Boolean}

För login : 
http://localhost:3030/user/login
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}
Tillbaka skickas en token för att kunna använda stock funktioner

För att hantera lagret:
http://localhost:3030/stock
GET för att kunna se vad som finns i lager

POST för att kunna lägga till en produkt
{
  "id": "5",
  "title": "Gringo Minimum",
  "desc": "MINI MINI",
  "price": 20
}
Datum sparas också när den sparas
I headern behöver Authorization med den token som gavs vid inloggning vara med 

PUT för att ändra en produkt
Samma typ av request utan id nu uppdateras även modifiedAt när produkten läggs till
I headern behöver Authorization med den token som gavs vid inloggning vara med 
{
  "title": "Gringo Dark ",
  "desc": "No blend",
  "price": 100
}

DELETE görs med adressen med id på slutet ex localhost:3030/stock/666b4e7e722914432f85f19e
Id är det som ges till produkten av mongoDB
I headern behöver Authorization med den token som gavs vid inloggning vara med 


För att lägga till kampanjer:
http://localhost:3030/user/campaigns

En vanlig get för att se alla kampanjer

POST för att skapa en kampanj
{
    "products":[{"title": "Gringo maximus"}, {"title": "Gringo Minimum"}],
    "price": 120
}
Kräver att products är en array av objekt och att price är positivt

