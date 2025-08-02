const config = require('../../config/config');

export default function DocumentPreview({ 
  formData, 
  onBack, 
  onGeneratePDF, 
  onSendEmail, 
  isGenerating, 
  isSending 
}) {
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          ← Back to Form
        </button>
        
        <div className="space-x-4">
          <button
            onClick={onSendEmail}
            disabled={isSending}
            className="btn-secondary"
          >
            {isSending ? 'Sending...' : 'Email to Admin'}
          </button>
          <button
            onClick={onGeneratePDF}
            disabled={isGenerating}
            className="btn-primary"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Document Preview */}
      <div id="pdf-content" className="card max-w-4xl mx-auto pdf-content">
        {/* Header */}
        <div className="pdf-header text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-solar-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-3xl">☀</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-solar-700">{config.company.name}</h1>
              <p className="text-gray-600">{config.company.address}</p>
              <p className="text-gray-600">
                Phone: {config.company.phone} | Email: {config.company.email}
              </p>
            </div>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {formData.documentType}
          </h2>
          <p className="text-gray-600">
            Document Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Client Information */}
        <div className="pdf-section">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-solar-200 pb-2">
            Client Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> <span className="pdf-highlight">{formData.clientName}</span></p>
              <p><strong>Email:</strong> <span className="pdf-highlight">{formData.clientEmail}</span></p>
              <p><strong>Mobile:</strong> <span className="pdf-highlight">{formData.clientMobile}</span></p>
            </div>
            <div>
              <p><strong>Address:</strong></p>
              <p className="pdf-highlight ml-4">{formData.clientAddress}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="pdf-section">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-solar-200 pb-2">
            Project Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Installation Location:</strong> <span className="pdf-highlight">{formData.projectLocation || 'Same as client address'}</span></p>
              <p><strong>System Capacity:</strong> <span className="pdf-highlight">{formData.systemCapacity || 'TBD'}</span></p>
            </div>
            <div>
              <p><strong>Installation Date:</strong> <span className="pdf-highlight">{formatDate(formData.installationDate)}</span></p>
              <p><strong>Warranty Period:</strong> <span className="pdf-highlight">{formData.warrantyPeriod || 'As per manufacturer terms'}</span></p>
            </div>
          </div>
          {formData.totalCost && (
            <p className="mt-4"><strong>Total Project Cost:</strong> <span className="pdf-highlight text-xl">{formData.totalCost}</span></p>
          )}
        </div>

        {/* Document Content */}
        <div className="pdf-section">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-solar-200 pb-2">
            Project Overview
          </h3>
          <div className="space-y-4 text-justify">
            <p>
              This document serves as a comprehensive {formData.documentType.toLowerCase()} for the solar photovoltaic (PV) system installation 
              project for <span className="pdf-highlight">{formData.clientName}</span>. Our team at {config.company.name} is committed to 
              providing high-quality solar energy solutions that meet your specific energy needs and budget requirements.
            </p>
            
            <p>
              The proposed solar installation will be located at <span className="pdf-highlight">{formData.projectLocation || formData.clientAddress}</span> 
              and will feature a {formData.systemCapacity ? `${formData.systemCapacity} solar PV system` : 'professionally designed solar PV system'} 
              utilizing premium-quality solar modules and inverters. Our installation follows industry best practices and complies with all 
              local electrical codes and regulations.
            </p>
            
            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">System Components & Features:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>High-efficiency monocrystalline solar panels with tier-1 manufacturer warranty</li>
              <li>Advanced power optimization technology for maximum energy production</li>
              <li>Professional-grade mounting system designed for your roof type</li>
              <li>Comprehensive monitoring system for real-time performance tracking</li>
              <li>Grid-tie inverter system with safety disconnect features</li>
              <li>Complete electrical installation including production meter</li>
            </ul>
            
            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Installation Process:</h4>
            <p>
              Our certified installation team will handle all aspects of your solar project, from initial site assessment 
              to final system commissioning. The installation process typically includes structural assessment, electrical 
              design, permit acquisition, professional installation, utility interconnection, and system testing.
            </p>
            
            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Warranty & Support:</h4>
            <p>
              We provide {formData.warrantyPeriod || 'comprehensive warranty coverage'} on all components and workmanship. 
              Our dedicated support team is available for ongoing maintenance, monitoring, and any technical assistance 
              you may require throughout the system's operational life.
            </p>
            
            {formData.additionalNotes && (
              <>
                <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Additional Notes:</h4>
                <p className="pdf-highlight">{formData.additionalNotes}</p>
              </>
            )}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="pdf-section">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-solar-200 pb-2">
            Terms & Conditions
          </h3>
          <div className="text-sm space-y-2">
            <p>• All installations are performed by licensed and insured professionals</p>
            <p>• System performance monitoring is included for the first year</p>
            <p>• Regular maintenance recommendations will be provided</p>
            <p>• All applicable permits and inspections are handled by our team</p>
            <p>• Net metering assistance and utility interconnection support included</p>
            <p>• Final pricing subject to site assessment and local permit requirements</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-solar-200 pt-6 mt-8 text-center">
          <p className="text-lg font-semibold text-gray-900">
            Thank you for choosing {config.company.name}
          </p>
          <p className="text-gray-600 mt-2">
            Your trusted partner in sustainable energy solutions
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>For questions or support, contact us at {config.company.phone} or {config.company.email}</p>
            <p>Visit us online at {config.company.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}