---
title: "MaiPDF Security Features Overview"
description: "Comprehensive guide to MaiPDF's security features including access controls, copy protection, and email verification"
publishDate: "11 Oct 2024"
tags: ["security", "features", "protection"]
updatedDate: 6 December 2024
---

## MaiPDF Security Features Quick Start

1. **Upload your PDF** to MaiPDF platform and configure access controls
2. **Set viewing limits** - Control how many times your PDF can be accessed
3. **Enable email verification** - Require email verification before PDF access
4. **Configure copy/print protection** - Prevent unauthorized copying and printing
5. **Generate secure links and QR codes** - Share your PDFs securely
6. **Monitor access analytics** - Track who accessed your PDF and when

![Upload Section Interface](/maipdf-images/upload_section.png)

## What Makes MaiPDF Secure

MaiPDF provides enterprise-level security for your PDF documents, ensuring only authorized users can access your content under the conditions you specify.

Our platform offers multiple layers of protection including view limits, time-based expiration, email verification, IP restrictions, and comprehensive access tracking. Each PDF is protected with advanced encryption and served through secure channels.

![Security Settings Dashboard](/maipdf-images/security_setting.png)

### Comprehensive Security Controls

The security settings interface provides granular control over every aspect of document access. From basic view limits to advanced IP restrictions, you can configure protection levels that match your specific security requirements.

### Email Verification System

![Email Verification Required](/maipdf-images/get_email_verification_before_read.jpg)

One of MaiPDF's most powerful security features is the email verification system. When enabled, recipients must verify their email address before accessing the PDF, providing an additional layer of identity confirmation for sensitive documents.

### Multi-Level Security Configuration

![Security Levels](/maipdf-images/security_level_in_pdf_setting.png)

MaiPDF offers multiple security levels to accommodate different use cases:

- **Basic**: View limits and expiration dates
- **Standard**: Email verification and copy protection
- **Advanced**: IP restrictions and watermarking
- **Enterprise**: Full audit trails and compliance features

### Copy and Print Protection

![Protection Icons](/maipdf-images/pdf_icon_of_no_printing_no_downloading.png)

Visual indicators clearly show when copy and print protection is active, ensuring users understand the security restrictions in place. This transparency helps prevent unauthorized attempts to reproduce your content.

### Dynamic Watermarking

![Watermark Example](/maipdf-images/dynamic_water_mark_example.jpg)

Add custom watermarks to your PDFs that can include:
- User-specific information
- Access timestamps
- Custom text or branding
- Dynamic content based on viewer

### Access Control Lists

![Email Access Control](/maipdf-images/put_email_addresses_in_security_setting.png)

Configure specific email addresses that are authorized to access your PDFs. This whitelist approach ensures only designated personnel can view confidential business documents, making it ideal for:

- Internal company reports
- Confidential client presentations
- Sensitive financial documents
- Legal agreements requiring restricted access

### Real-Time Monitoring

Track document access in real-time with detailed analytics that show:
- Who accessed your document and when
- Geographic location of access attempts
- Device and browser information
- Time spent viewing the document
- Failed access attempts

### Post-Creation Security Updates

![Update Settings After Creation](/maipdf-images/pdf_change_setting_after_sent.png)

Unlike traditional file sharing, MaiPDF allows you to modify security settings even after the link has been created and shared. This means you can:

- Extend or reduce expiration dates
- Add or remove authorized email addresses
- Change view limits based on usage patterns
- Enable additional security features as needed

This flexibility ensures your security posture can adapt to changing requirements without disrupting the sharing workflow.

## Steps to add it to your own site

Your going to have to create a couple of accounts to get things up-and-running. But, the first thing you need to ensure is that your social links are correct.

### Add link(s) to your profile(s)

Firstly, you need to add a link on your site to prove ownership. If you have a look at [IndieLogin's](https://indielogin.com/setup) instructions, it gives you 2 options, either an email address and/or GitHub account. I've created the component `src/components/SocialList.astro` where you can add your details into the `socialLinks` array, just include the `isWebmention` property to the relevant link which will add the `rel="me authn"` attribute. Whichever way you do it, make sure you have a link in your markup as per IndieLogin's [instructions](https://indielogin.com/setup)

```html
<a href="https://github.com/your-username" rel="me">GitHub</a>
```

### Sign up to Webmention.io

Next, head over to [Webmention.io](https://webmention.io/) and create an account by signing in with your domain name, e.g. `https://maipdf.com/`. Please note that .app TLDs don't function correctly. Once in, it will give you a couple of links for your domain to accept webmentions. Make a note of these and create a `.env` file (this template include an example `.env.example` which you could rename). Add the link feed and api key with the key/values of `WEBMENTION_URL` and `WEBMENTION_API_KEY` respectively, and the optional `WEBMENTION_PINGBACK` url if required. Please try not to publish this to a repository!

:::note
You don't have to include the pingback link. Maybe coincidentally, but after adding it I started to receive a higher frequency of spam in my mailbox, informing me that my website could be better. TBH they're not wrong. I've now removed it, but it's up to you.
:::

### Sign up to Brid.gy

You're now going to have to use [brid.gy](https://brid.gy/). As the name suggests, it links your website to your social media accounts. For every account you want to set up (e.g. Mastodon), click on the relevant button and connect each account you want brid.gy to search. Just to note again, brid.gy currently has an issue with .app TLDs.

## Testing everything works

With everything set, it's now time to build and publish your website. **REMEMBER** to set your environment variables `WEBMENTION_API_KEY` & `WEBMENTION_URL` with your host.

You can check to see if everything is working by sending a test webmention via [webmentions.rocks](https://webmention.rocks/receive/1). Log in with your domain, enter the auth code, and then the url of the page you want to test. For example, to test this page I would add `https://maipdf.com/posts/webmentions/`. To view it on your website, rebuild or (re)start dev mode locally, and you should see the result at the bottom of your page.

You can also view any test mentions in the browser via their [api](https://github.com/aaronpk/webmention.io#api).

## Things to add, things to consider

- At the moment, fresh webmentions are only fetched on a rebuild or restarting dev mode, which obviously means if you don't update your site very often you wont get a lot of new content. It should be quite trivial to add a cron job to run the `getAndCacheWebmentions()` function in `src/utils/webmentions.ts` and populate your blog with new content. This is probably what I'll add next as a github action.

- I have seen some mentions have duplicates. Unfortunately, they're quite difficult to filter out as they have different id's.

- I'm not a huge fan of the little external link icon for linking to comments/replies. It's not particularly great on mobile due to its size, and will likely change it in the future.

## Acknowledgements

Many thanks to [Kieran McGuire](https://github.com/KieranMaguire) for the helpful posts. I'd never heard of webmentions before, and now with this update hopefully others will be able to make use of them. Additionally, articles and examples from [kld](https://kld.dev/adding-webmentions/) and [ryanmulligan.dev](https://ryanmulligan.dev/blog/) really helped in getting this set up and integrated, both a great resource if you're looking for more information!
