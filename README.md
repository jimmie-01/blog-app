# BLOG APP

## Features;
* Register and validate user credentials (if they do not have an account).
* Login and validate user credentials (if they already have an account).
* Read: All blog post are listed on blog page with link to view each post in details
* Create: users can creatte new blog posts with title, snippet and body. 
* Update: Users can update an existing blog post by editing its content.
* Delete: Users can delete a blog post.

## Technologies Used
* Node.js: Server-side Javascript runtime. 
* Express (JavaScript) - Web framework for building the RESTful API and rendering views.
* EJS (Javascript) - Template engine  for rendering HTML views.
* MongoDB - NoSQL database for storing user and blog data on the database.
* Git/Github - Version Control an d workflow.

## Installation

### Prerequisites
* Node.js installed on your machine.
* MongoDB installed and install mongoose as a dependency( better yet you can register on atlas to use a remote database).

## Steps to run application locally
1. Clone th repository:
```sh
$ git clone https://github.com/jimmie-01/blog-app.git
```
2. Change the project directory:
```sh
$ cd blog-app
```
3. Install the dependencies:
```sh
$ npm install
```
4. Create a `.env` file in the root of the project and add your MongoDB connection string:
```sh
$ MONGODB_URI=mongodb://localhost:3000/blog
```
5. Start the server
```sh
$ npm run dev
```
6. Open your browser and navigate to:
```sh
$ http://localhost:3000
```

## Usage
* Home: Login/Register and Views list of all blogs afterwards
* Create blog: Click the "New Blogs" on the nav bar to create new blog post
* Edit: Click the "Edit" button on an individual post page to modify the content.
* Delete: Click the "delete icon" on an individual post page to remove the post.

- **Fakile Razaq** <[jimmie-01](https://github.com/jimmie-01)>