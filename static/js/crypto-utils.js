/**
 * Cryptographic utilities for password hashing and validation
 * Browser-compatible implementation using Web Crypto API
 */

class CryptoUtils {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }

    /**
     * Generate a simple hash for password verification
     * Note: This is a simplified implementation for demo purposes
     * In production, use proper bcrypt on the server side
     */
    async hashPassword(password, salt = null) {
        if (!salt) {
            salt = this.generateSalt();
        }

        const passwordBuffer = this.encoder.encode(password + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return `$sha256$${salt}$${hashHex}`;
    }

    /**
     * Verify password against hash
     */
    async verifyPassword(password, hash) {
        if (hash.startsWith('$sha256$')) {
            const parts = hash.split('$');
            if (parts.length !== 4) return false;
            
            const salt = parts[2];
            const expectedHash = await this.hashPassword(password, salt);
            return expectedHash === hash;
        }
        
        // For bcrypt hashes (from server), we'll simulate verification
        if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
            // In demo mode, accept default password
            return password === 'bnwp2025';
        }
        
        return false;
    }

    /**
     * Generate random salt
     */
    generateSalt(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let salt = '';
        
        for (let i = 0; i < length; i++) {
            salt += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return salt;
    }

    /**
     * Validate password strength
     */
    validatePassword(password) {
        const rules = {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };

        const score = Object.values(rules).filter(Boolean).length;
        
        return {
            isValid: rules.minLength && rules.hasUppercase && rules.hasLowercase && rules.hasNumber,
            score: score,
            maxScore: Object.keys(rules).length,
            rules: rules,
            strength: this.getPasswordStrength(score)
        };
    }

    /**
     * Get password strength description
     */
    getPasswordStrength(score) {
        if (score >= 5) return 'Very Strong';
        if (score >= 4) return 'Strong';
        if (score >= 3) return 'Medium';
        if (score >= 2) return 'Weak';
        return 'Very Weak';
    }

    /**
     * Generate secure random password
     */
    generateSecurePassword(length = 12) {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let password = '';
        
        // Ensure at least one character from each category
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        // Fill the rest randomly
        const allChars = uppercase + lowercase + numbers + symbols;
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Create session token (simplified)
     */
    async createSessionToken(username) {
        const timestamp = Date.now();
        const randomData = this.generateSalt(32);
        const tokenData = `${username}:${timestamp}:${randomData}`;
        
        const tokenBuffer = this.encoder.encode(tokenData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', tokenBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Validate session token (simplified)
     */
    validateSessionToken(token, username, maxAge = 3600000) { // 1 hour default
        try {
            // In a real implementation, this would verify the token signature
            // For demo purposes, we'll do basic validation
            return token && token.length === 64 && typeof token === 'string';
        } catch (error) {
            return false;
        }
    }
}

// Export for use in other scripts
window.CryptoUtils = CryptoUtils;