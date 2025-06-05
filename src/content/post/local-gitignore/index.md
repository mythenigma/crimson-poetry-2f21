---
title: "MaiPDF API Environment Configuration"  
description: "Secure configuration management for MaiPDF API keys, environment variables, and local development setup"  
publishDate: "05 Mar 2025"  
tags: ["api", "security", "configuration", "maipdf"]
ogImage: "/maipdf-images/security_setting.png"
draft: false
---

## Secure MaiPDF API Configuration

Proper configuration management is crucial for MaiPDF API integration. This guide covers secure practices for managing API keys, environment variables, and local development configurations without exposing sensitive information.

![MaiPDF Security Configuration](/maipdf-images/security_setting.png)

## Environment Variables Setup

### 1. Create Environment Configuration
```bash
# Create .env file for local development
touch .env.local
```

### 2. Add to .gitignore (Never commit API keys)
```bash
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
echo "config/secrets.json" >> .gitignore
```

### 3. Configure MaiPDF Environment Variables
```bash
# .env.local - Local development configuration
MAIPDF_API_KEY=your_api_key_here
MAIPDF_API_SECRET=your_api_secret_here
MAIPDF_REGION=us-east-1
MAIPDF_ENVIRONMENT=development
MAIPDF_BASE_URL=https://api.maipdf.com/v1
MAIPDF_WEBHOOK_SECRET=your_webhook_secret
```

## API Key Management

### Development Configuration
```javascript
// config/maipdf.js
const config = {
  development: {
    apiKey: process.env.MAIPDF_API_KEY,
    apiSecret: process.env.MAIPDF_API_SECRET,
    region: process.env.MAIPDF_REGION || 'us-east-1',
    baseUrl: 'https://api-dev.maipdf.com/v1',
    debug: true
  },
  production: {
    apiKey: process.env.MAIPDF_PROD_API_KEY,
    apiSecret: process.env.MAIPDF_PROD_API_SECRET,
    region: process.env.MAIPDF_REGION || 'us-east-1',
    baseUrl: 'https://api.maipdf.com/v1',
    debug: false
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

### Secure Configuration Loading
```javascript
// utils/config.js
const fs = require('fs');
const path = require('path');

function loadMaiPDFConfig() {
  // Try to load from environment variables first
  if (process.env.MAIPDF_API_KEY) {
    return {
      apiKey: process.env.MAIPDF_API_KEY,
      apiSecret: process.env.MAIPDF_API_SECRET,
      region: process.env.MAIPDF_REGION,
      baseUrl: process.env.MAIPDF_BASE_URL
    };
  }
  
  // Fallback to local config file (not in git)
  const configPath = path.join(__dirname, '../config/local.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  
  throw new Error('MaiPDF configuration not found');
}

module.exports = { loadMaiPDFConfig };
```

## Local Development Setup

### 1. Clone Repository and Setup
```bash
# Clone your MaiPDF integration project
git clone https://github.com/yourorg/maipdf-integration.git
cd maipdf-integration

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Local Environment
```bash
# Edit .env.local with your MaiPDF credentials
nano .env.local
```

### 3. Git Configuration for Secrets
```bash
# Ensure secrets never get committed
git update-index --skip-worktree .env.local
git update-index --skip-worktree config/local.json
```

## Security Best Practices

### API Key Rotation
```javascript
// utils/apiKeyRotation.js
class MaiPDFKeyManager {
  constructor() {
    this.currentKey = process.env.MAIPDF_API_KEY;
    this.backupKey = process.env.MAIPDF_BACKUP_API_KEY;
  }
  
  async rotateKey() {
    // Implement key rotation logic
    try {
      const newKey = await this.generateNewApiKey();
      await this.updateEnvironmentKey(newKey);
      await this.revokeOldKey(this.currentKey);
      
      console.log('API key rotated successfully');
    } catch (error) {
      console.error('Key rotation failed:', error);
      // Rollback logic here
    }
  }
}
```

### Environment Validation
```javascript
// utils/validateConfig.js
function validateMaiPDFConfig() {
  const required = [
    'MAIPDF_API_KEY',
    'MAIPDF_API_SECRET',
    'MAIPDF_REGION'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate API key format
  if (!/^mk_[a-zA-Z0-9]{32}$/.test(process.env.MAIPDF_API_KEY)) {
    throw new Error('Invalid MaiPDF API key format');
  }
  
  console.log('✅ MaiPDF configuration validated');
}

module.exports = { validateMaiPDFConfig };
```

## Production Deployment

### Environment-Specific Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  maipdf-app:
    build: .
    environment:
      - MAIPDF_API_KEY=${MAIPDF_PROD_API_KEY}
      - MAIPDF_API_SECRET=${MAIPDF_PROD_API_SECRET}
      - MAIPDF_REGION=${MAIPDF_REGION}
      - NODE_ENV=production
    env_file:
      - .env.production
```

### Kubernetes Secrets
```yaml
# k8s/maipdf-secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: maipdf-secrets
type: Opaque
data:
  api-key: <base64-encoded-api-key>
  api-secret: <base64-encoded-api-secret>
  webhook-secret: <base64-encoded-webhook-secret>
```

## Testing Configuration

### Local Testing Setup
```javascript
// tests/config.test.js
const { loadMaiPDFConfig } = require('../utils/config');

describe('MaiPDF Configuration', () => {
  beforeEach(() => {
    // Set test environment variables
    process.env.MAIPDF_API_KEY = 'test_key_123';
    process.env.MAIPDF_API_SECRET = 'test_secret_456';
    process.env.MAIPDF_REGION = 'us-west-2';
  });
  
  afterEach(() => {
    // Clean up test environment
    delete process.env.MAIPDF_API_KEY;
    delete process.env.MAIPDF_API_SECRET;
    delete process.env.MAIPDF_REGION;
  });
  
  test('should load configuration from environment', () => {
    const config = loadMaiPDFConfig();
    expect(config.apiKey).toBe('test_key_123');
    expect(config.region).toBe('us-west-2');
  });
});
```

## Troubleshooting

### Common Configuration Issues

1. **API Key Not Found**
   ```bash
   # Check environment variables
   printenv | grep MAIPDF
   
   # Verify .env file exists and is readable
   ls -la .env.local
   cat .env.local
   ```

2. **Permission Errors**
   ```bash
   # Fix file permissions
   chmod 600 .env.local
   chmod 600 config/local.json
   ```

3. **Git Accidentally Committed Secrets**
   ```bash
   # Remove from git history
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch .env.local' \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (be careful!)
   git push --force --all
   ```

## Monitoring and Alerts

### API Key Usage Monitoring
```javascript
// utils/monitoring.js
const { CloudWatch } = require('aws-sdk');

class MaiPDFMonitoring {
  constructor() {
    this.cloudwatch = new CloudWatch();
  }
  
  async trackApiUsage(endpoint, responseTime, statusCode) {
    const params = {
      Namespace: 'MaiPDF/API',
      MetricData: [{
        MetricName: 'ResponseTime',
        Dimensions: [{
          Name: 'Endpoint',
          Value: endpoint
        }],
        Value: responseTime,
        Unit: 'Milliseconds'
      }]
    };
    
    await this.cloudwatch.putMetricData(params).promise();
  }
}
```

This configuration guide ensures your MaiPDF API integration remains secure while providing flexible development and deployment options. Always follow the principle of least privilege and regularly rotate your API credentials.