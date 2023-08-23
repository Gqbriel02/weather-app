# weather-app
Acest repository utilizeaza ExpressJs, Bootstrap si Docker.

## Bootstrap
Se afla in folderul client. Se foloseste pt frontend-ul proiectului. 

## ExpressJS
Se afla in folderul server. Se foloseste pt backend-ul proiectului. 
Face comunicarea cu MySQL. Am folosit XAMPP cu baza de date locala.

# Cum rulezi aplicatia?
Dupa ce descarci sau clonezi acest repository trebuie sa rulezi urmatoarele comenzi in terminal:

```bash
npm run server-install
```
```bash
npm run client-install
```
```bash
npm run server
```
```bash
npm run client
```
# Pentru implementarea in Docker
Dupa ce descarci sau clonezi acest repository trebuie sa rulezi urmatoarele comenzi in terminal:

```bash
docker-compose up --build
```
Aceasta comanda va rula informatiile din docker-compose.yml si va genera cele 2 imagini + containere aferente.

Aplicația poate fi deschisa la adresa:
http://localhost:3000/
