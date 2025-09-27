# Profile Management System Documentation

## Overview

The Bangla WikiConnect profile management system provides a secure web interface for users to update their profile information and for administrators to manage user accounts. The system is accessible at `/update-data/` and integrates with GitHub for data synchronization.

## Features

### For All Users
- **Secure Authentication**: Login with username and password
- **Profile Updates**: Modify personal information, contact details, and bio
- **Password Management**: Change passwords with strong validation
- **Real-time Validation**: Immediate feedback on form inputs
- **GitHub Sync**: All changes are automatically synchronized to the repository

### For Administrators
Administrators (MdsShakil, Yahya, and Aishik) have additional capabilities:
- **User Management**: Add new users to the system
- **Account Control**: Activate/deactivate user accounts
- **Password Reset**: Reset user passwords to default
- **Role Management**: Assign admin or user roles

## Security Implementation

### Password Storage
- **Algorithm**: Passwords are hashed using SHA-256 with salt (client-side demo)
- **Production Recommendation**: Use bcrypt with proper server-side validation
- **Default Password**: All accounts start with `bnwp2025`
- **Password Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - Special characters recommended

### Session Management
- **Client-side Sessions**: Uses browser sessionStorage for demo
- **Session Tokens**: Generated using secure crypto utilities
- **Auto-logout**: Sessions expire when browser closes
- **Production Recommendation**: Implement server-side session management

### Data Validation
- **Input Sanitization**: All form inputs are validated
- **Password Strength**: Real-time password strength checking
- **Form Validation**: Required fields and format validation

## User Data Structure

### User Account (`data/users.yml`)
```yaml
users:
  username:
    username: "string"
    role: "admin|user"
    passwordHash: "hashed_password"
    created: "YYYY-MM-DD"
    lastLogin: "YYYY-MM-DD|null"
    isActive: boolean
```

### Profile Data (`content/persona/username/index.md`)
```markdown
---
title: Display Name
name: Full Name
teams:
  - team1
  - team2
role: Position/Role
username: username
location: Location
email: email@example.com
img: "profile_image_url"
---
Biography content here...
```

## GitHub Integration

### Automatic Synchronization
- **Profile Updates**: Changes to persona files
- **User Management**: Updates to users.yml
- **Password Changes**: Encrypted password storage
- **Commit Messages**: Descriptive commit messages for tracking

### File Operations
1. **Profile Updates**: Updates `content/persona/{username}/index.md`
2. **User Management**: Modifies `data/users.yml`
3. **Account Changes**: Real-time updates to user database

## Usage Instructions

### First-Time Login
1. Visit `/update-data/`
2. Select your username from the dropdown
3. Enter the default password: `bnwp2025`
4. **Important**: Change your password immediately after first login

### Updating Your Profile
1. Log in to the system
2. Fill out the profile form with your information
3. Click "Update Profile" - changes sync to GitHub automatically
4. Changes will appear on the website after the next deployment

### Changing Your Password
1. Navigate to the "Change Password" section
2. Enter your current password
3. Choose a strong new password following the requirements
4. Confirm the new password
5. Click "Change Password"

### Admin Functions
Administrators can:
1. **Add Users**: Create new accounts with default passwords
2. **Reset Passwords**: Reset any user's password to default
3. **Manage Status**: Activate or deactivate user accounts
4. **View Users**: See all users and their current status

## Technical Architecture

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **Bootstrap 5**: Responsive design and components
- **Vanilla JavaScript**: No external dependencies
- **Web Crypto API**: Client-side cryptographic operations

### Backend Integration
- **Static Site**: Hugo-generated static site
- **GitHub API**: Direct integration for file updates
- **YAML Data**: Human-readable configuration files
- **Markdown Content**: Structured profile content

### Security Considerations
- **Client-side Demo**: Current implementation is for demonstration
- **Production Requirements**:
  - Server-side password hashing (bcrypt)
  - Secure session management
  - HTTPS enforcement
  - Rate limiting
  - Input sanitization
  - CSRF protection

## Deployment

### Hugo Build
The system is built as part of the regular Hugo build process:
```bash
hugo --minify --baseURL "https://connect.bnwp.org/"
```

### GitHub Actions
Deployment is handled by GitHub Actions:
1. Code changes pushed to repository
2. Hugo builds the site
3. Site deployed to GitHub Pages
4. Profile changes appear on live site

## Troubleshooting

### Common Issues
1. **Login Failed**: Check username spelling and password
2. **Profile Not Updating**: Verify GitHub sync is working
3. **Password Change Failed**: Ensure new password meets requirements
4. **Admin Panel Missing**: Verify admin role in users.yml

### Password Recovery
If you forget your password:
1. Contact an administrator (MdsShakil, Yahya, or Aishik)
2. Administrator can reset your password to default
3. Log in with `bnwp2025` and change your password

### Support
For technical support or questions:
- Email: connect@bnwp.org
- GitHub Issues: https://github.com/bnwp/bnwp.github.io/issues

## Development Notes

### Future Enhancements
- Server-side API implementation
- Database integration
- Advanced role management
- Email notifications
- Audit logging
- Two-factor authentication

### Contributing
To contribute to the profile management system:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Disclaimer

This current implementation is designed for demonstration and development purposes. For production use, implement proper server-side security measures including:
- Server-side password hashing
- Secure session management
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement
- Regular security audits