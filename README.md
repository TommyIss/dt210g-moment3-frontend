# Moment 3 i kursen DT210G, Förjdupad frontend-utveckling

## Moment 3 Frontend
Repositoryt innehåller en single-page applikation med React frontend-ramverk, NestJS backend-ramverk, och PostgreSQL databas-server. 
Webbplatsen består av:
- Startsida
- Min sida
- Logga in
- Skapa konto

Applikationen använder React Router för att sköta navigering till olika sidor och skydda Min sida från otillåten åtkomst. 
Både frontend- samt backend-delen, tillåter besökaren att skapa en ny användarprofil, autentisera inloggning och hämta och hantera skyddade uppgifter med en giltig JWT. Dessutom frontend-delen har två olika vyer en vanlig användare och admin, där en vanlig användare kan se och hantera endast sina egna uppgifter, medan en inloggad admin har extra behörigheter för att se även alla övriga konton, hantera dem, skapa en ny användare samt admin.    

### Tommy Issa, tois2401