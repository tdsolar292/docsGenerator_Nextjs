# PV Solar Documentation System

A professional Next.js application for generating solar installation documents with PDF export and email functionality.

## Features

- ✅ Professional document generation for solar installations
- ✅ Dynamic PDF creation with client information
- ✅ Email functionality to send documents to admin
- ✅ Responsive and modern UI with Tailwind CSS
- ✅ Multiple document types support
- ✅ Configuration file for easy customization
- ✅ Professional PDF formatting with company branding

## Quick Start

### 1. Installation

```bash
# Clone or copy all files to your project directory
cd your-project-directory

# Install dependencies
npm install
```

### 2. Configuration

Edit `config/config.js` to set up your:

- **Email Settings**: Update Gmail credentials (use App Password for Gmail)
- **Company Information**: Add your company details
- **Document Types**: Customize available document types

```javascript
// config/config.js
const config = {
  email: {
    adminEmail: 'tdsolar292@gmail.com',
    adminPassword: 'your-app-password-here', // Gmail App Password
  },
  company: {
    name: 'Your Company Name',
    address: 'Your Company Address',
    phone: 'Your Phone Number',
    email: 'Your Email',
  }
};
```

### 3. Gmail Setup (For Email Feature)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `config.js`

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` to access the application.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── generate-pdf/
│   │   │   └── route.js          # PDF generation API
│   │   └── send-email/
│   │       └── route.js          # Email sending API
│   ├── components/
│   │   ├── DocumentForm.js       # Client information form
│   │   └── DocumentPreview.js    # Document preview component
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main page component
├── config/
│   └── config.js                 # Configuration file
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## How to Use

1. **Fill Client Information**:
   - Enter client name, email, mobile, and address (required fields)
   - Add project details like system capacity, installation date, etc.

2. **Preview Document**:
   - Click "Preview Document" to see the formatted document
   - Review all information before generating PDF

3. **Generate PDF**:
   - Click "Download PDF" to generate and download the document
   - PDF includes professional formatting with company branding

4. **Email Document**:
   - Click "Email to Admin" to send the document to configured admin email
   - Includes PDF attachment and formatted email summary

## Document Types

Default document types included:
- Solar Module Installation Proposal
- Solar System Maintenance Agreement
- Solar Installation Completion Certificate
- Solar System Warranty Document

Add more types in `config/config.js` under `documentTypes` array.

## Customization

### Adding Company Logo
1. Place your logo file in the `public/` folder as `logo.png`
2. Update the logo path in `config/config.js`

### Modifying PDF Template
Edit `app/api/generate-pdf/route.js` to customize:
- PDF layout and styling
- Content sections
- Colors and fonts

### Styling Changes
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for custom colors
- Edit component files for UI changes

## Email Configuration

The system supports various email providers:

### Gmail
```javascript
email: {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  adminEmail: 'your-email@gmail.com',
  adminPassword: 'your-app-password',
}
```

### Outlook
```javascript
email: {
  service: 'outlook',
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  adminEmail: 'your-email@outlook.com',
  adminPassword: 'your-password',
}
```

## Dependencies

- **Next.js 14**: React framework
- **Tailwind CSS**: Utility-first CSS framework
- **jsPDF**: PDF generation library
- **Nodemailer**: Email sending library
- **React 18**: UI library

## Troubleshooting

### PDF Generation Issues
- Ensure all required form fields are filled
- Check browser console for errors

### Email Not Sending
- Verify email configuration in `config/config.js`
- Check if Gmail App Password is correct (not regular password)
- Ensure 2FA is enabled on Gmail account

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (recommended: 18+)

## Production Deployment

1. Update `config/config.js` with production values
2. Build the application: `npm run build`
3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## Security Notes

- Store sensitive email credentials in environment variables for production
- Use App Passwords instead of regular passwords for Gmail
- Consider implementing user authentication for production use

## Support

For issues or questions:
1. Check the configuration in `config/config.js`
2. Review browser console for error messages
3. Ensure all dependencies are properly installed

## License

This project is for internal business use. Customize as needed for your solar installation business.