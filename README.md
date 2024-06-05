# KitKat system front-end files

This repository contains the necessary files to run the front-end for the KitKat site.
For the back end files, see this repository:
- https://github.com/r-rozenvalds/be-kitkat

### This front-end system is built using React JS, Vite, Typescript & Tailwind CSS.

# Instructions 

### Necessary programs: XAMPP (or similar web-hosting alternative), php, Composer, Node.js

1. Download the front-end and back-end files and put them in a folder.
2. Open XAMPP (or similar web-hosting alternative), start Apache & MySQL
3. Open the command prompt in the front-end folder and write ```npm run dev```
4. Wait for the system to start, then open the provided link.
5. Open the command prompt in the back-end folder and write ```php artisan serve```
6. Wait for the back-end to start and refresh the front-end site.

If the connection between front-end and back-end cannot be made, check that the correct port (DB_PORT) is written in the back-end .env file and that DB_DATABASE is a database that exists on your web-hosting application.
