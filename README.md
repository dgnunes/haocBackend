# haocBackend
=======
NODEJS + MondoDB will be used

Installation steps:

Install NodeJS v 7.0 :

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs


The following commands should be executed:

npm init
npm install express --save
npm install mongoose --save
npm install body-parser --save
npm install jsonwebtoken --save 
npm install mocha -g
npm install chai --save-dev
npm install editorconfig
npm install supertest --save-dev
npm install should --save-dev

If using in production mode, there's no need to hava mongodb on your machine. Else, you will have to install it by following this command:

apt-get update && apt-get install -y mongodb

Node.Js and MongoDB were used in this project because I had no previous experience with any of them and they are used in the actual Job. So I've decided to learn something new from this test.

about the coding itself, I've implemented the bare minimum requirements:
- Users can only be created and used to Login.
- Each user can only see the Lists he created.
- Lists can be created, read, updated and deleted.
- Every list belongs to only one user and cannot be reallocated to another.
- Tasks can be created, read, updated and deleted.
- Every task belongs to only one list and cannot be reallocated to another.

