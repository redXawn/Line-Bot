# LINEBOT TUTORIAL

## Getting Started
Clone the Repo and Create your own **provider** from https://developers.line.biz/en/, this provider will be used to generate  **CHANNEL SECRET** and **CHANNEL ACCESS TOKEN**, also we can submit our own callback API in the line developer dashboard

After you clone and create a new provider, type in the terminal
- Npm install / yarn install
- Create a new **ENV** file for the **channel secret and access token**
- Createdb line-dev / **any db  name you like** 
  >(dont' forget to change the config json database name)
- Sequelize db:migrate:all
- Npm run start / yarn run start
- Register your callback API
  > If you don't have heroku, use ngrok for static server using your localhost
- Done and you can try hit some api