# **PoBa Projekt**
*** 

# Tartalom

* Követelmények futtatáshoz
* Telepítés
* Indítási útmutató

***
# Követelmények futtatáshoz

* Docker ([Docker Desktop](https://www.docker.com/products/docker-desktop/))
* Node.js ([Node.js](https://nodejs.org/en))
* Kódszerkesztő ([IntelliJ](https://www.jetbrains.com/idea/) vagy [VSC](https://code.visualstudio.com))
* (ajánlott) Git ([Git](https://git-scm.com/downloads))
* [UNAS](https://unas.hu/belepes) webshop(ok) és apikulcs(ok)

***
# Telepítés

## Első futtatás előtt
* futtatás előtt szükséges létrehozni a /Backend/poba-backend/ mappába .env nevű fájlt az alábbi tartalommal
```
JWT_SECRET=BalatonTagadok
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=nojminoj01
DB_DATABASE=postgres
```

### Adatbázis előkészítés
1. Docker Desktop futtatása
2. Parancssor megnyitása a /Backend/poba-backend mappában
3. ```
   docker-compose up --build
   ```
4. Felállás után böngészőben megnyitni a [pgAdmin](http://localhost:5050) felületét
5. Bejelentkezés
   ```
   email: poba@gmail.com
   password: nojminoj01
   ```
   ![image](https://github.com/AelinGalathyn/PoBa/assets/70639095/26406ef4-2e2d-4ade-a163-305849d28bbd)
6. Szerver hozzáadása
   -> New Server

General
   
* Name: postgres

![image](https://github.com/AelinGalathyn/PoBa/assets/70639095/42faecc1-e2aa-4239-8066-e6e5c9d87287)

Connection
	
* Host name/address: db
* Port: 5432
* Username: postgres
* Password: nojminoj01
	
![image](https://github.com/AelinGalathyn/PoBa/assets/70639095/3f32e613-f1d4-4c05-911a-49a68155165b)

7. Schema importálása

* Servers -> postgres -> Databases -> postgres -> Schemas -> public
* jobb kattintás a publicra, aztán CREATE Script kiválasztása
* Alt + O
* Options -> Upload

![image](https://github.com/AelinGalathyn/PoBa/assets/70639095/fb378b0e-c483-4d2e-915d-88e4b7bbed95)

* SQL fájl feltöltése majd kiválasztása

![image](https://github.com/AelinGalathyn/PoBa/assets/70639095/229f812d-a480-4155-856f-3fa79df3cf51)

8. futtatás

***
## Indítási útmutató
Indításkor fontos, hogy a docker induljon el először, így biztosítva a :3000 portot a backendnek.

### Backend indítása

1. Indítsuk el a Docker Desktop-ot
2. Parancssorban lépjünk be a /Backend/poba-backend/ mappába
3. Futtassuk az alábbi parancsot
```
docker-compose up --build
```

A backend és az adatbázis innentől fut.
Leállításhoz nyomjuk meg a **Ctrl+C** billentyűkombinációt.


### Web kliens indítása

1. Parancssorban lépjünk be a /Web/poba-web mappába
2. Futtassuk az alábbi parancsot
```
npm run dev
```
3. Nyissuk meg böngészőben a [http://localhost:3001](http://localhost:3001) címet
4. Üres oldal esetén frissítsük


### Android app indítása


