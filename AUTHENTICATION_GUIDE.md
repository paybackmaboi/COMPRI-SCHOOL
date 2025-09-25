# Authentication System Guide

## Overview
The System Monitor AI now includes a comprehensive authentication system with registration and login functionality.

## Features

### 🔐 Registration System
- **Email Validation**: Validates proper email format using regex
- **Password Requirements**: 
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter  
  - At least one number
  - At least one special character
- **Name Field**: Full name input with validation
- **Password Confirmation**: Ensures passwords match
- **Duplicate Email Check**: Prevents multiple accounts with same email

### 🚪 Login System
- **Email/Password Authentication**: Validates against registered users
- **Session Management**: Maintains user session across browser tabs
- **Auto-redirect**: Redirects to dashboard on successful login
- **Error Handling**: Clear error messages for invalid credentials

### 🛡️ Security Features
- **Protected Routes**: All dashboard pages require authentication
- **Session Persistence**: User stays logged in across browser sessions
- **Secure Logout**: Clears session data and redirects to login
- **Loading States**: Shows loading indicators during auth operations

## How to Use

### First Time Setup
1. Navigate to the application (starts at login page)
2. Click the "Register" tab
3. Fill in your details:
   - Full Name (required)
   - Email (must be valid format)
   - Password (must meet requirements)
   - Confirm Password (must match)
4. Click "Create Account"
5. You'll be automatically logged in and redirected to the dashboard

### Logging In
1. Use the "Login" tab
2. Enter your registered email and password
3. Click "Secure Login"
4. You'll be redirected to the dashboard

### User Experience
- **Tab-based Interface**: Easy switching between login and registration
- **Visual Feedback**: Success/error messages with icons
- **Password Visibility**: Toggle to show/hide passwords
- **Responsive Design**: Works on all screen sizes
- **Professional UI**: Modern gradient design with smooth animations

### Account Management
- **Profile Display**: Shows user info in sidebar and account page
- **Profile Updates**: Edit name and email in account settings
- **Session Info**: View account creation date and user ID
- **Secure Logout**: One-click logout from sidebar

## Technical Implementation

### Data Storage
- Uses `localStorage` for persistence (client-side)
- Stores user data and registered users separately
- Maintains session across browser refreshes

### State Management
- React Context API for global auth state
- Real-time UI updates based on auth status
- Loading states and error handling

### Route Protection
- `ProtectedRoute` component wraps all dashboard pages
- Automatic redirect to login for unauthenticated users
- Loading spinner during auth checks

## File Structure
```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── components/
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   └── Layout.tsx               # Updated with user info & logout
├── pages/
│   ├── Login.tsx                # Registration & login forms
│   └── Account.tsx              # User profile management
└── App.tsx                      # Updated with auth provider & protected routes
```

## Security Notes
⚠️ **Development Only**: This implementation uses localStorage for demo purposes. In production, you should:
- Use secure backend authentication
- Implement JWT tokens
- Hash passwords with bcrypt
- Use HTTPS for all communications
- Implement proper session management
- Add rate limiting and CSRF protection

## Demo Credentials
No static credentials exist. Users must register first to access the system.

---

**Ready to use!** The authentication system is now fully functional and provides a professional user experience for your System Monitor AI application.
