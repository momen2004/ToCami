# EmailJS Setup Instructions

To enable automatic email sending, you need to set up EmailJS (free service).

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (it's free for up to 200 emails/month)

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your email
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** Movie Night Plans 🎬

**Content:**
```
Hi!

We're watching: {{movie_name}}
Time: {{movie_time}}

{{message}}

See you then! 💕🍿
```

4. **Copy the Template ID** (you'll need this)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. **Copy your Public Key**

## Step 5: Update script.js
Open `script.js` and replace these values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // ← Replace with your Public Key
    SERVICE_ID: 'YOUR_SERVICE_ID', // ← Replace with your Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // ← Replace with your Template ID
    TO_EMAIL: 'momnsami000@gmail.com'
};
```

## Alternative: Mailto Fallback
If you don't want to set up EmailJS, the code will automatically use a mailto link (opens your default email client) as a fallback. The email will still be pre-filled with the movie name and time!

