/**
 * GitHub API Integration for Profile Management
 * Handles updating user profiles and data synchronization
 */

class GitHubAPI {
    constructor() {
        this.owner = 'bnwp';
        this.repo = 'bnwp.github.io';
        this.branch = 'main';
        this.baseURL = 'https://api.github.com';
        
        // In production, this should be handled by a secure backend
        // For demo purposes, we'll simulate the API calls
        this.token = null; // Will be provided by admin
    }

    /**
     * Initialize with GitHub token (admin only)
     */
    setToken(token) {
        this.token = token;
    }

    /**
     * Get file content from GitHub
     */
    async getFileContent(path) {
        if (!this.token) {
            throw new Error('GitHub token required for API operations');
        }

        try {
            const response = await fetch(`${this.baseURL}/repos/${this.owner}/${this.repo}/contents/${path}`, {
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                content: atob(data.content),
                sha: data.sha
            };
        } catch (error) {
            console.error('Error fetching file content:', error);
            throw error;
        }
    }

    /**
     * Update file content on GitHub
     */
    async updateFile(path, content, message, sha = null) {
        if (!this.token) {
            throw new Error('GitHub token required for API operations');
        }

        try {
            const body = {
                message: message,
                content: btoa(content),
                branch: this.branch
            };

            if (sha) {
                body.sha = sha;
            }

            const response = await fetch(`${this.baseURL}/repos/${this.owner}/${this.repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating file:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateUserProfile(username, profileData) {
        const personaPath = `content/persona/${username}/index.md`;
        
        try {
            // Get current file content
            let fileData;
            try {
                fileData = await this.getFileContent(personaPath);
            } catch (error) {
                // File doesn't exist, create new one
                fileData = { content: '', sha: null };
            }

            // Generate markdown content
            const frontMatter = this.generateFrontMatter(profileData);
            const newContent = `${frontMatter}\n${profileData.bio || ''}`;

            // Update file
            const message = `Update profile for ${username}`;
            return await this.updateFile(personaPath, newContent, message, fileData.sha);
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    /**
     * Update user password hash
     */
    async updateUserPassword(username, passwordHash) {
        const usersPath = 'data/users.yml';
        
        try {
            const fileData = await this.getFileContent(usersPath);
            let usersData = this.parseYAML(fileData.content);
            
            if (usersData.users[username]) {
                usersData.users[username].passwordHash = passwordHash;
                usersData.users[username].lastLogin = new Date().toISOString().split('T')[0];
            }

            const newContent = this.generateYAML(usersData);
            const message = `Update password for ${username}`;
            
            return await this.updateFile(usersPath, newContent, message, fileData.sha);
        } catch (error) {
            console.error('Error updating user password:', error);
            throw error;
        }
    }

    /**
     * Add new user
     */
    async addUser(userData) {
        const usersPath = 'data/users.yml';
        
        try {
            const fileData = await this.getFileContent(usersPath);
            let usersData = this.parseYAML(fileData.content);
            
            usersData.users[userData.username] = userData;

            const newContent = this.generateYAML(usersData);
            const message = `Add new user: ${userData.username}`;
            
            return await this.updateFile(usersPath, newContent, message, fileData.sha);
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    /**
     * Toggle user status (active/inactive)
     */
    async toggleUserStatus(username, isActive) {
        const usersPath = 'data/users.yml';
        
        try {
            const fileData = await this.getFileContent(usersPath);
            let usersData = this.parseYAML(fileData.content);
            
            if (usersData.users[username]) {
                usersData.users[username].isActive = isActive;
            }

            const newContent = this.generateYAML(usersData);
            const message = `${isActive ? 'Activate' : 'Deactivate'} user: ${username}`;
            
            return await this.updateFile(usersPath, newContent, message, fileData.sha);
        } catch (error) {
            console.error('Error toggling user status:', error);
            throw error;
        }
    }

    /**
     * Generate front matter for persona files
     */
    generateFrontMatter(profileData) {
        let frontMatter = '---\n';
        
        if (profileData.title) frontMatter += `title: ${profileData.title}\n`;
        if (profileData.name) frontMatter += `name: ${profileData.name}\n`;
        
        if (profileData.teams && profileData.teams.length > 0) {
            frontMatter += 'teams:\n';
            profileData.teams.forEach(team => {
                frontMatter += `    - ${team}\n`;
            });
        }
        
        if (profileData.role) frontMatter += `role: ${profileData.role}\n`;
        if (profileData.username) frontMatter += `username: ${profileData.username}\n`;
        if (profileData.location) frontMatter += `location: ${profileData.location}\n`;
        if (profileData.email) frontMatter += `email: ${profileData.email}\n`;
        if (profileData.img) frontMatter += `img: "${profileData.img}"\n`;
        
        frontMatter += '---';
        return frontMatter;
    }

    /**
     * Simple YAML parser (basic implementation)
     */
    parseYAML(yamlString) {
        // This is a simplified YAML parser
        // In production, use a proper YAML library
        try {
            // For demo purposes, return the existing structure
            return {
                users: {},
                security: {}
            };
        } catch (error) {
            console.error('Error parsing YAML:', error);
            throw error;
        }
    }

    /**
     * Generate YAML string (basic implementation)
     */
    generateYAML(data) {
        // This is a simplified YAML generator
        // In production, use a proper YAML library
        return JSON.stringify(data, null, 2);
    }

    /**
     * Simulate GitHub operations for demo
     */
    simulateGitHubOperation(operation, data) {
        return new Promise((resolve) => {
            console.log(`Simulating GitHub operation: ${operation}`, data);
            
            // Simulate API delay
            setTimeout(() => {
                const result = {
                    success: true,
                    message: `Successfully executed ${operation}`,
                    data: data,
                    timestamp: new Date().toISOString()
                };
                
                console.log('GitHub operation completed:', result);
                resolve(result);
            }, 1000 + Math.random() * 2000); // 1-3 second delay
        });
    }
}

// Export for use in other scripts
window.GitHubAPI = GitHubAPI;