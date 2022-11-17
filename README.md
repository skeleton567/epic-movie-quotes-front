<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes Upgraded</h1>
</div>

---
Movie Quotes is an App where you are able to register and see, add, share, comment and like hundreds of movie quotes.

#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)

#
### Prerequisites

* *npm@7 and up*
#
### Tech Stack

* [VueJs@3.x](https://vuejs.org/guide/introduction.html) - front-end framework
* [Vee-validate@4.x](https://vee-validate.logaretm.com/v4/) - package for form validations
* [Tailwind CSS](https://tailwindcss.com) - CSS library
* [Pusher](https://pusher.com) - Real time notification package
* [Vue 3 Google Login](https://yobaji.github.io/vue3-google-login/) - Google authentificaiton package

#
### Getting Started
1\. First of all you need to clone >Movie Quotes Upgraded repository from github:
```sh
git clone https://github.com/RedberryInternship/guram-tsagareishvili-epic-movie-quotes-front
```

2\. Next step requires you to run *npm install* in order to install all the dependencies.
```sh
npm install
```
3\. Now we need to set our env file. 
```sh
cp .env.example .env
```
And now you should provide **.env** file all the necessary environment variables:

#
**App urls:**
>VITE_API_BASE_URL=*****
>VITE_BASE_URL=*****
>VITE_IMAGE_BASE_URL=****

#
**Google Login:**
>VITE_GOOGLE_CLIENT_ID=****

#
**Pusher:**
>VITE_PUSHER_APP_KEY=*****
>VITE_PUSHER_APP_CLUSTER=*****

##### Now, you should be good to go!

#
### Development

You can run Vite built-in development server by executing:

```sh
  npm run dev
```
