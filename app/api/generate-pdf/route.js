import jsPDF from 'jspdf';
const config = require('../../../config/config');

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Create new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = margin;

    // Helper function to add text with word wrapping
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

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Header
    pdf.setFillColor(217, 119, 6); // Solar orange color
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(config.company.name, margin, 20);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(config.company.address, margin, 25);

    // Reset text color and position
    pdf.setTextColor(0, 0, 0);
    yPosition = 45;

    // Document title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    const titleY = addText(formData.documentType, margin, yPosition, pageWidth - 2 * margin);
    yPosition = titleY + 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Document Date: ${new Date().toLocaleDateString()}`, margin, yPosition) + 10;

    // Client Information Section
    checkNewPage(60);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('CLIENT INFORMATION', margin, yPosition) + 5;
    
    // Draw line under heading
    pdf.setDrawColor(217, 119, 6);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`Name: ${formData.clientName}`, margin, yPosition) + 3;
    yPosition = addText(`Email: ${formData.clientEmail}`, margin, yPosition) + 3;
    yPosition = addText(`Mobile: ${formData.clientMobile}`, margin, yPosition) + 3;
    yPosition = addText(`Address: ${formData.clientAddress}`, margin, yPosition, pageWidth - 2 * margin) + 10;

    // Project Details Section
    checkNewPage(80);
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
      pdf.setFont('helvetica', 'normal');
    } else {
      yPosition += 10;
    }

    // Project Overview Section
    checkNewPage(100);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('PROJECT OVERVIEW', margin, yPosition) + 5;
    
    pdf.setDrawColor(217, 119, 6);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const overviewText = `This document serves as a comprehensive ${formData.documentType.toLowerCase()} for the solar photovoltaic (PV) system installation project for ${formData.clientName}. Our team at ${config.company.name} is committed to providing high-quality solar energy solutions that meet your specific energy needs and budget requirements.

The proposed solar installation will be located at ${formData.projectLocation || formData.clientAddress} and will feature a ${formData.systemCapacity ? `${formData.systemCapacity} solar PV system` : 'professionally designed solar PV system'} utilizing premium-quality solar modules and inverters.`;

    yPosition = addText(overviewText, margin, yPosition, pageWidth - 2 * margin) + 10;

    // System Components
    checkNewPage(80);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('System Components & Features:', margin, yPosition) + 5;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const components = [
      '• High-efficiency monocrystalline solar panels',
      '• Advanced power optimization technology',
      '• Professional-grade mounting system',
      '• Comprehensive monitoring system',
      '• Grid-tie inverter with safety features',
      '• Complete electrical installation'
    ];

    components.forEach(component => {
      checkNewPage(15);
      yPosition = addText(component, margin + 5, yPosition, pageWidth - 2 * margin - 5) + 3;
    });

    yPosition += 10;

    // Installation Process
    checkNewPage(60);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Installation Process:', margin, yPosition) + 5;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const processText = 'Our certified installation team will handle all aspects of your solar project, from initial site assessment to final system commissioning. The installation process includes structural assessment, electrical design, permit acquisition, professional installation, utility interconnection, and system testing.';
    yPosition = addText(processText, margin, yPosition, pageWidth - 2 * margin) + 10;

    // Warranty & Support
    checkNewPage(50);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('Warranty & Support:', margin, yPosition) + 5;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const warrantyText = `We provide ${formData.warrantyPeriod || 'comprehensive warranty coverage'} on all components and workmanship. Our dedicated support team is available for ongoing maintenance, monitoring, and technical assistance throughout the system's operational life.`;
    yPosition = addText(warrantyText, margin, yPosition, pageWidth - 2 * margin) + 10;

    // Additional Notes
    if (formData.additionalNotes) {
      checkNewPage(40);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Additional Notes:', margin, yPosition) + 5;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(formData.additionalNotes, margin, yPosition, pageWidth - 2 * margin) + 10;
    }

    // Terms & Conditions (New Page)
    pdf.addPage();
    yPosition = margin;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText('TERMS & CONDITIONS', margin, yPosition) + 5;
    
    pdf.setDrawColor(217, 119, 6);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const terms = [
      '• All installations are performed by licensed and insured professionals',
      '• System performance monitoring is included for the first year',
      '• Regular maintenance recommendations will be provided',
      '• All applicable permits and inspections are handled by our team',
      '• Net metering assistance and utility interconnection support included',
      '• Final pricing subject to site assessment and local permit requirements'
    ];

    terms.forEach(term => {
      yPosition = addText(term, margin, yPosition, pageWidth - 2 * margin) + 5;
    });

    // Footer
    yPosition = pageHeight - 40;
    pdf.setFillColor(217, 119, 6);
    pdf.rect(0, yPosition - 10, pageWidth, 50, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Thank you for choosing ${config.company.name}`, pageWidth / 2, yPosition, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Your trusted partner in sustainable energy solutions', pageWidth / 2, yPosition + 7, { align: 'center' });
    pdf.text(`Contact: ${config.company.phone} | ${config.company.email}`, pageWidth / 2, yPosition + 14, { align: 'center' });
    pdf.text(`Visit: ${config.company.website}`, pageWidth / 2, yPosition + 21, { align: 'center' });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${formData.documentType.replace(/\s+/g, '_')}_${formData.clientName.replace(/\s+/g, '_')}.pdf"`
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return Response.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}