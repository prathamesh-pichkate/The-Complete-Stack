# MERN Blogging Website Documentation

## Project Overview
This MERN blogging website is a comprehensive application designed for creating, managing, and interacting with blog posts. The project includes essential features such as user authentication, CRUD operations for blog posts, comment management, user profiles, and admin functionalities. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Tailwind CSS for styling. Google Firebase is used for authentication (Google OAuth), and Cloudinary is integrated for image storage.

## Features
### User Features
- **Authentication**: Google OAuth-based sign-up and sign-in.
- **Dark Mode**: Toggle dark mode for an enhanced user experience.
- **Dashboard**:
  - View, edit, and delete personal blog posts.
  - Upload profile pictures.
  - Update or delete user accounts.
- **Post Management**:
  - Create, edit, and delete blog posts with image uploads.
  - Add, view, and delete comments on posts.
  - Like and edit comments.
- **Search Functionality**: Search for posts using keywords.
- **Recent Articles**: View the latest blog posts on the homepage.

### Admin Features
- **Admin Dashboard**:
  - View and manage all users.
  - Delete users or promote them to admin.
  - View, update, and delete any blog post.
  - Moderate and manage comments.
  - Dashboard overview of user and post statistics.

### Additional Features
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Image Handling**: Cloudinary integration for efficient image storage.
- **Deployment**: The application is deployed on Render for seamless access.

## Tech Stack
- **Frontend**: React.js, Redux Toolkit, Redux Persist, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth (Firebase)
- **Image Storage**: Cloudinary
- **Deployment**: Render

## Project Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- A Cloudinary account
- Firebase project with Google authentication enabled

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     JWT_SECRET=your_jwt_secret
     PORT=your_preferred_port
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     ```

4. **Run the Server**:
   ```bash
   npm run dev
   ```

5. **Run the Client**:
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:<PORT>`.

## Key Components
### Pages and Routes
- **Home Page**: Displays recent blog posts.
- **Signup/Signin Page**: User authentication.
- **Dashboard**: Personalized space for managing posts and profile.
- **Admin Dashboard**: Admin-specific functionalities.
- **Post Page**: Detailed view of individual posts with comment sections.
- **Search Page**: Search results for posts.
- **About Page**: Information about the website.
- **Projects Page**: Additional information and features.

### API Endpoints
#### User
- **Sign Up**: `POST /api/users/signup`
- **Sign In**: `POST /api/users/signin`
- **Update Profile**: `PUT /api/users/update`
- **Delete Account**: `DELETE /api/users/delete`

#### Post
- **Create Post**: `POST /api/posts/create`
- **Get Posts**: `GET /api/posts`
- **Update Post**: `PUT /api/posts/update`
- **Delete Post**: `DELETE /api/posts/delete`

#### Comment
- **Add Comment**: `POST /api/comments/add`
- **Edit Comment**: `PUT /api/comments/edit`
- **Delete Comment**: `DELETE /api/comments/delete`

### Deployment to Render
1. Create a new web service on Render for the backend.
2. Deploy the frontend as a static site.
3. Add the required environment variables in the Render dashboard.
4. Ensure both services are connected for a seamless user experience.

## Resources Used
- React.js Documentation
- Tailwind CSS Documentation
- Firebase Authentication Guide
- Cloudinary Documentation
- MongoDB Documentation

## Contribution
Feel free to fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the [MIT License](LICENSE).

