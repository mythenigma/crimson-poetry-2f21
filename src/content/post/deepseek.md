---
title: "MaiPDF API Integration Guide"
description: "Learn how to integrate MaiPDF's secure PDF sharing features into your applications using our API"
publishDate: "10 Jan 2025"
updatedDate: "22 Dec 2024"
tags: ["api", "integration", "developer"]
---

## MaiPDF API Integration 🔗

Transform your application's document sharing capabilities with MaiPDF's comprehensive API. Whether you're building a document management system, client portal, or content delivery platform, our API provides enterprise-grade security features that protect your PDFs while maintaining seamless user experience.

<!-- Platform overview image placeholder -->

MaiPDF's API enables you to programmatically create secure PDF links, implement granular access controls, track detailed analytics, and generate QR codes for mobile sharing. Built with developers in mind, our RESTful API is designed for easy integration with any tech stack while providing the robust security features your users demand.

### What You Can Do With The API

MaiPDF's API unlocks powerful document security features that go far beyond simple file sharing. Our comprehensive suite of tools empowers developers to build sophisticated document management solutions with enterprise-grade protection.

- **Generate secure PDF links** with custom access controls and time-based restrictions
- **Set granular viewing limits** to control document access precisely
- **Configure advanced copy/print protection** to prevent unauthorized distribution
- **Implement email verification** for additional access security
- **Track comprehensive analytics** including view counts, access times, and user engagement
- **Create QR codes** for seamless mobile sharing and offline distribution
- **Monitor real-time access** with detailed logging and audit trails
- **Set up watermarking** to protect intellectual property
- **Configure IP restrictions** for location-based access control

![Upload Section Interface](/maipdf-images/upload_section.png)

### Document Upload and Processing

The upload process is streamlined for developers, supporting various file formats and providing real-time feedback on processing status. Our API handles file validation, optimization, and security scanning automatically.

### Security Configuration Dashboard

![Security Settings Interface](/maipdf-images/security_setting.png)

MaiPDF provides a comprehensive security configuration system that allows fine-tuned control over document access. The security settings interface demonstrates the depth of control available through our API.

### Integration Examples

**JavaScript: Create Secure PDF Link**
```javascript title="create-secure-link.js"
const maipdfApi = {
  apiKey: 'your-api-key',
  baseUrl: 'https://api.maipdf.com/v1'
};

async function createSecurePDFLink(pdfFile, options = {}) {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  formData.append('maxViews', options.maxViews || 10);
  formData.append('expiresIn', options.expiresIn || '24h');
  formData.append('copyProtection', options.copyProtection || true);
  formData.append('emailVerification', options.emailVerification || false);
  formData.append('watermark', options.watermark || '');
  
  const response = await fetch(`${maipdfApi.baseUrl}/links`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${maipdfApi.apiKey}`,
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

// Advanced usage with all security features
const advancedLink = await createSecurePDFLink(pdfFile, {
  maxViews: 5,
  expiresIn: '7d',
  copyProtection: true,
  emailVerification: true,
  watermark: 'CONFIDENTIAL',
  allowDownload: false,
  trackAnalytics: true
});

console.log('Secure link created:', advancedLink.url);
console.log('QR Code available at:', advancedLink.qrCodeUrl);
```

**Python: Advanced PDF Security Configuration**
```python title="advanced-pdf-security.py"
import requests
import json
from datetime import datetime, timedelta

class MaiPDFSecurityAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.maipdf.com/v1'
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'User-Agent': 'MaiPDF-Python-SDK/1.0'
        })
    
    def create_enterprise_link(self, pdf_path, security_config):
        """Create enterprise-grade secure PDF link with advanced features"""
        
        # Prepare file upload
        with open(pdf_path, 'rb') as pdf_file:
            files = {'pdf': pdf_file}
            
            # Advanced security configuration
            data = {
                'maxViews': security_config.get('max_views', 10),
                'expiresAt': security_config.get('expires_at'),
                'emailVerificationRequired': security_config.get('email_required', True),
                'allowedEmails': json.dumps(security_config.get('allowed_emails', [])),
                'ipWhitelist': json.dumps(security_config.get('ip_whitelist', [])),
                'copyProtection': security_config.get('copy_protection', True),
                'printProtection': security_config.get('print_protection', True),
                'downloadAllowed': security_config.get('allow_download', False),
                'watermarkText': security_config.get('watermark', ''),
                'trackingEnabled': security_config.get('tracking', True),
                'notificationEmails': json.dumps(security_config.get('notifications', []))
            }
            
            response = self.session.post(
                f"{self.base_url}/enterprise/links",
                files=files,
                data=data
            )
            
            response.raise_for_status()
            return response.json()
    
    def get_link_analytics(self, link_id):
        """Retrieve comprehensive analytics for a PDF link"""
        response = self.session.get(f"{self.base_url}/analytics/{link_id}")
        response.raise_for_status()
        return response.json()
    
    def update_security_settings(self, link_id, new_settings):
        """Update security settings for an existing link"""
        response = self.session.patch(
            f"{self.base_url}/links/{link_id}/security",
            json=new_settings
        )
        response.raise_for_status()
        return response.json()

# Example usage with enterprise security
client = MaiPDFSecurityAPI('your-enterprise-api-key')

enterprise_config = {
    'max_views': 3,
    'expires_at': (datetime.now() + timedelta(days=7)).isoformat(),
    'email_required': True,
    'allowed_emails': ['john@company.com', 'sarah@company.com'],
    'ip_whitelist': ['192.168.1.0/24', '10.0.0.0/8'],
    'copy_protection': True,
    'print_protection': True,
    'allow_download': False,
    'watermark': 'COMPANY CONFIDENTIAL',
    'tracking': True,
    'notifications': ['admin@company.com']
}

result = client.create_enterprise_link('confidential_report.pdf', enterprise_config)
print(f"Secure enterprise link: {result['secureUrl']}")
print(f"QR Code: {result['qrCodeUrl']}")
print(f"Link ID: {result['linkId']}")
```

![Email Verification Process](/maipdf-images/get_email_verification_before_read.jpg)

### Email Verification Integration

MaiPDF's email verification system adds an extra layer of security by requiring recipients to verify their email address before accessing the PDF. This feature is particularly valuable for sensitive documents that require identity confirmation.

![Security Level Configuration](/maipdf-images/security_level_in_pdf_setting.png)

### Advanced Security Levels

The platform offers multiple security levels, from basic protection to enterprise-grade security with comprehensive access controls and monitoring capabilities.

### API Configuration Options

**Access Control Settings**
```json
{
  "maxViews": 10,
  "expiresIn": "7d",
  "requireEmail": true,
  "allowDownload": false,
  "copyProtection": true,
  "printProtection": true,
  "watermark": "CONFIDENTIAL",
  "ipWhitelist": ["192.168.1.0/24"],
  "allowedEmails": ["user1@company.com", "user2@company.com"],
  "trackingEnabled": true,
  "notificationEmails": ["admin@company.com"]
}
```

![PDF Copy Protection Icons](/maipdf-images/pdf_icon_of_no_printing_no_downloading.png)

### Copy and Print Protection

MaiPDF's copy and print protection features ensure your intellectual property remains secure. The system displays clear indicators when protection is active, preventing unauthorized reproduction of your documents.

![Dynamic Watermark Example](/maipdf-images/dynamic_water_mark_example.jpg)

### Dynamic Watermarking

Implement dynamic watermarks that display user-specific information, timestamps, or custom text to track document usage and prevent unauthorized sharing.

![Email Security Configuration](/maipdf-images/put_email_addresses_in_security_setting.png)

### Email-Based Access Control

Configure specific email addresses that are authorized to access your PDFs. This feature is essential for confidential business documents that should only be accessible to designated personnel.

![Result with QR Code](/maipdf-images/result_of_pdf_link_and_qr_code.png)

### QR Code Generation

Every secure PDF link automatically generates a QR code for easy mobile sharing. Recipients can scan the code to access the document directly on their mobile devices while maintaining all security restrictions.

### Best Practices

- **Rate Limiting**: API calls are limited to 1000 requests per hour for standard accounts, 10,000 for enterprise
- **File Size**: Maximum PDF size is 50MB per upload (100MB for enterprise customers)
- **Security**: Always use HTTPS and keep your API keys secure in environment variables
- **Error Handling**: Implement proper error handling for failed requests and network timeouts
- **Caching**: Cache analytics data to reduce API calls and improve application performance
- **Webhooks**: Use webhook notifications for real-time updates on document access events

![PDF Settings After Creation](/maipdf-images/pdf_change_setting_after_sent.png)

### Dynamic Settings Updates

One of MaiPDF's powerful features is the ability to modify security settings even after a PDF link has been created and shared. This flexibility allows you to respond to changing security requirements without having to generate new links.

![Instant Messenger Sharing](/maipdf-images/send_pdf_link_on_instant_mesenger.png)

### Mobile and Messenger Integration

MaiPDF links work seamlessly across all platforms, including instant messengers, social media, and mobile applications. The responsive design ensures optimal viewing on any device.

![PDF Native View](/maipdf-images/pdf_native_view_on_ui.png)

### Native PDF Viewing Experience

Recipients enjoy a native PDF viewing experience within their browsers, with all security features working transparently in the background. The interface is clean, professional, and maintains document formatting.

![Worldwide PDF Sharing](/maipdf-images/share_pdf_wordwide.png)

### Global Distribution Capabilities

Share your secure PDFs worldwide with confidence. MaiPDF's global CDN ensures fast loading times regardless of recipient location, while maintaining consistent security controls.

### Advanced Analytics and Monitoring

```javascript title="analytics-integration.js"
// Real-time analytics tracking
async function trackPDFAnalytics(linkId) {
  const analytics = await fetch(`${maipdfApi.baseUrl}/analytics/${linkId}`, {
    headers: { 'Authorization': `Bearer ${maipdfApi.apiKey}` }
  });
  
  const data = await analytics.json();
  
  return {
    totalViews: data.totalViews,
    uniqueViewers: data.uniqueViewers,
    lastAccessed: data.lastAccessed,
    averageViewTime: data.averageViewTime,
    geographicDistribution: data.geographicData,
    deviceBreakdown: data.deviceStats,
    accessAttempts: data.securityEvents
  };
}

// Set up real-time notifications
const setupWebhooks = async (webhookUrl) => {
  await fetch(`${maipdfApi.baseUrl}/webhooks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${maipdfApi.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: webhookUrl,
      events: ['document.viewed', 'access.denied', 'link.expired']
    })
  });
};
```

### Error Handling and Resilience

```python title="robust-error-handling.py"
import time
import logging
from requests.exceptions import RequestException, Timeout

class RobustMaiPDFClient:
    def __init__(self, api_key, max_retries=3):
        self.api_key = api_key
        self.max_retries = max_retries
        self.base_url = 'https://api.maipdf.com/v1'
        
    def create_link_with_retry(self, pdf_path, config):
        """Create link with automatic retry logic"""
        for attempt in range(self.max_retries):
            try:
                return self._create_link(pdf_path, config)
            except (RequestException, Timeout) as e:
                if attempt == self.max_retries - 1:
                    logging.error(f"Failed to create link after {self.max_retries} attempts: {e}")
                    raise
                
                wait_time = 2 ** attempt  # Exponential backoff
                logging.warning(f"Attempt {attempt + 1} failed, retrying in {wait_time}s: {e}")
                time.sleep(wait_time)
    
    def _create_link(self, pdf_path, config):
        """Internal method to create PDF link"""
        # Implementation here
        pass
```

:::tip
Start with our sandbox environment to test your integration before going live. The sandbox uses the same API endpoints but doesn't count against your usage limits.
:::

**Ready to secure your PDF sharing? Get started with MaiPDF API today! 🚀**