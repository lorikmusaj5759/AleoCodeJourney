/* sophisticated_code.js */

// This code is a sophisticated implementation of a social media platform
// It includes features such as user registration, creating and updating profiles,
// posting and commenting on posts, and liking posts

// --------------------------------------- 
// User Object
// ---------------------------------------
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.posts = [];
    this.comments = [];
    this.likes = [];
  }

  createPost(content) {
    const post = new Post(content, this);
    this.posts.push(post);
  }

  updateProfile(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  addComment(post, content) {
    const comment = new Comment(content, this);
    post.addComment(comment);
    this.comments.push(comment);
  }

  likePost(post) {
    post.addLike(this);
    this.likes.push(post);
  }
}

// --------------------------------------- 
// Post Object
// ---------------------------------------
class Post {
  constructor(content, user) {
    this.content = content;
    this.user = user;
    this.comments = [];
    this.likes = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  addLike(user) {
    this.likes.push(user);
  }
}

// --------------------------------------- 
// Comment Object
// ---------------------------------------
class Comment {
  constructor(content, user) {
    this.content = content;
    this.user = user;
  }
}

// --------------------------------------- 
// Usage
// ---------------------------------------
const user1 = new User("John Doe", "john@example.com", 25);
const user2 = new User("Jane Smith", "jane@example.com", 30);

user1.createPost("Hello, world!");
user1.createPost("This is a great day!");

user2.createPost("I'm new here. Nice to meet you all!");

user1.addComment(user2.posts[0], "Welcome, Jane!");
user2.addComment(user1.posts[1], "I agree, John!");

user1.likePost(user2.posts[0]);
user2.likePost(user1.posts[1]);

console.log(user1);
console.log(user2);