import nodemailer from 'nodemailer';
import jsPDF from 'jspdf';
const config = require('../../../config/config');

export async function POST(request) {
  try {
    const formData = await request.json();

    // Generate PDF (same logic as generate-pdf route)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = margin;

    // Helper functions (same as in generate-pdf)
    const addText = (text, x, y, maxWidth, fontSize = 12, style = 'normal') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', style);
      
      if (maxWidth) {
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
          pdf.text(line, x, y + (index * lineHeight));
        });
        return y + (lines.length * lineHeight);
      } else {
        pdf.text(text, x, y);
        return y + lineHeight;
      }
    };

    const checkNewPage = (requiredSpace = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Generate PDF content (abbreviated version for email)
    // Header
    pdf.setFillColor(217, 119, 6);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(config.company.name, margin, 20);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(config.company.address, margin, 25);

    pdf.setTextColor(0, 0, 0);
    yPosition = 45;

    // Document title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(formData.documentType, margin, yPosition, pageWidth - 2 * margin) + 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Document Date: ${new Date().toLocaleDateString()}`, margin, yPosition) + 15;

    // Client Information
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('CLIENT INFORMATION', margin, yPosition) + 5;
    
    pdf.setDrawColor(217, 119, 6);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Name: ${formData.clientName}`, margin, yPosition) + 3;
    yPosition = addText(`Email: ${formData.clientEmail}`, margin, yPosition) + 3;
    yPosition = addText(`Mobile: ${formData.clientMobile}`, margin, yPosition) + 3;
    yPosition = addText(`Address: ${formData.clientAddress}`, margin, yPosition, pageWidth - 2 * margin) + 15;

    // Project Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('PROJECT DETAILS', margin, yPosition) + 5;
    
    pdf.setDrawColor(217, 119, 6);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Installation Location: ${formData.projectLocation || 'Same as client address'}`, margin, yPosition, pageWidth - 2 * margin) + 3;
    yPosition = addText(`System Capacity: ${formData.systemCapacity || 'TBD'}`, margin, yPosition) + 3;
    yPosition = addText(`Installation Date: ${formData.installationDate ? new Date(formData.installationDate).toLocaleDateString() : 'TBD'}`, margin, yPosition) + 3;
    yPosition = addText(`Warranty Period: ${formData.warrantyPeriod || 'As per manufacturer terms'}`, margin, yPosition) + 3;
    
    if (formData.totalCost) {
      pdf.setFont('helvetica', 'bold');
      yPosition = addText(`Total Project Cost: ${formData.totalCost}`, margin, yPosition) + 10;
    }

    if (formData.additionalNotes) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Additional Notes:', margin, yPosition) + 5;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(formData.additionalNotes, margin, yPosition, pageWidth - 2 * margin);
    }

    // Get PDF as buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: config.email.service,
      auth: {
        user: config.email.adminEmail,
        pass: config.email.adminPassword,
      },
    });

    // Email options
    const mailOptions = {
      from: '"TD SOLAR INVOICE" <contact@tdsolar.in>',
      to: config.email.adminEmail,
      subject: `New Solar Document: ${formData.documentType} - ${formData.clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #d97706; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">${config.company.name}</h1>
            <p style="margin: 5px 0 0 0;">Solar Documentation System</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #d97706; margin-top: 0;">New Document Generated</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Document Information</h3>
              <p><strong>Document Type:</strong> ${formData.documentType}</p>
              <p><strong>Generated Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Generated Time:</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Client Details</h3>
              <p><strong>Name:</strong> ${formData.clientName}</p>
              <p><strong>Email:</strong> ${formData.clientEmail}</p>
              <p><strong>Mobile:</strong> ${formData.clientMobile}</p>
              <p><strong>Address:</strong> ${formData.clientAddress}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Project Summary</h3>
              <p><strong>Location:</strong> ${formData.projectLocation || 'Same as client address'}</p>
              <p><strong>System Capacity:</strong> ${formData.systemCapacity || 'TBD'}</p>
              <p><strong>Installation Date:</strong> ${formData.installationDate ? new Date(formData.installationDate).toLocaleDateString() : 'TBD'}</p>
              <p><strong>Warranty:</strong> ${formData.warrantyPeriod || 'Standard terms'}</p>
              ${formData.totalCost ? `<p><strong>Total Cost:</strong> ${formData.totalCost}</p>` : ''}
            </div>
            
            ${formData.additionalNotes ? `
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #333; margin-top: 0;">Additional Notes</h3>
                <p>${formData.additionalNotes}</p>
              </div>
            ` : ''}
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #d97706;">
              <p style="margin: 0;"><strong>📎 PDF Document Attached</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">The complete document is attached as a PDF file for your records.</p>
            </div>
          </div>
          
          <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">This email was generated automatically by the Solar Documentation System</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">${config.company.address}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">${config.company.phone} | ${config.company.email}</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${formData.documentType.replace(/\s+/g, '_')}_${formData.clientName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ 
      success: true, 
      message: 'Document sent successfully to admin email' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ 
      error: 'Failed to send email. Please check your email configuration.' 
    }, { status: 500 });
  }
}