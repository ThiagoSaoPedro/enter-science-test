# Test - Dev Enter Science Internship:

Web application for hiring artists for private shows.

### Technologies used:

<ul>
<li><b>Back-end:</b></li>
<ul>
<li>Laravel.</li>
</ul>
<li><b>Front-end:</b></li>
<ul>
<li>React (vite);</li>
<li>Bootstrap.</li>
</ul>
<li><b>Database:</b></li>
<ul>
<li>Postgresql.</li>
</ul>
<li><b>API's:</b></li>
<ul>
<li>Spotify.</li>
</ul>

</ul>


###  Configuration and Installation Guide:

Configure your PostgreSQL data in ./enter-science/backend/.env:
```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=eventos
DB_USERNAME=postgres #Seu usuario no postgres
DB_PASSWORD=admin  #Sua senho no postgres
```
Front-end:
Create an .env file in ./enter-science/frontend and insert your spotify api id's

```bash
VITE_CLIENT_ID=YOURID
VITE_CLIENT_SECRET=YOURID

```


```bash
cd frontend
npm install
npm run dev
```
Back-end:
```bash
composer install
composer update
php artisan migrate
php artisan key:generate
php artisan serve
```

Then simply access the front-end's default port:
http://localhost:5173/
Select the artist and enter the necessary data.