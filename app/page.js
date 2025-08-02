'use client';

import { useState } from 'react';
import DocumentForm from './components/DocumentForm';
import DocumentPreview from './components/DocumentPreview';

export default function Home() {
  const [formData, setFormData] = useState({
    documentType: 'Solar Module Installation Proposal',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientMobile: '',
    projectLocation: '',
    systemCapacity: '',
    installationDate: '',
    warrantyPeriod: '',
    totalCost: '',
    additionalNotes: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.documentType.replace(/\s+/g, '_')}_${formData.clientName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Error generating PDF');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Document sent successfully to admin email!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Solar Documentation Generator
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create professional solar installation documents with ease. 
          Fill in the client details and generate PDF documents instantly.
        </p>
      </div>

      {!showPreview ? (
        <DocumentForm 
          formData={formData}
          onChange={handleFormChange}
          onPreview={handlePreview}
        />
      ) : (
        <DocumentPreview 
          formData={formData}
          onBack={handleBackToForm}
          onGeneratePDF={handleGeneratePDF}
          onSendEmail={handleSendEmail}
          isGenerating={isGenerating}
          isSending={isSending}
        />
      )}
    </div>
  );
}