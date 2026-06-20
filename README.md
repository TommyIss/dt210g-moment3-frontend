# Moment 3 i kursen DT210G, Förjdupad frontend-utveckling

## Moment 3 Frontend
Repositoryt innehåller en single-page applikation med React frontend-ramverk, NestJS backend-ramverk, och PostgreSQL databas-server. 
Webbplatsen består av:
- Startsida (Publikt)
- Alla inlägg (Publikt)
- Min sida (Skyddad)
- Logga in (Publikt)
- Skapa konto (Publikt)

Applikationen använder React Router för att sköta navigering till olika sidor och skydda Min sida från otillåten åtkomst, och Yup för att validera olika inmatningar. 
Både frontend- samt backend-delen, tillåter besökaren att skapa ett konto, autentisera inloggning, hämta och hantera inlägg samt skyddade uppgifter med en giltig JWT. En vanlig inloggad användare kan skapa, uppdatera och radera sina egna inlägg, medan en inloggad admin har utökade rättigheter och kan se och hantera alla användare samt alla inlägg i systemet, inklusive att skapa nya användare samt administratörer.   

### Tommy Issa, tois2401