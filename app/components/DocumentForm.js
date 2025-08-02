const config = require('../../config/config');

export default function DocumentForm({ formData, onChange, onPreview }) {
  const handleInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const isFormValid = () => {
    return formData.clientName && 
           formData.clientAddress && 
           formData.clientEmail && 
           formData.clientMobile;
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Client Information & Document Details
      </h3>
      
      <form className="space-y-6">
        {/* Document Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select 
            name="documentType"
            value={formData.documentType}
            onChange={handleInputChange}
            className="input-field"
          >
            {config.documentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name *
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter client's full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="clientMobile"
              value={formData.clientMobile}
              onChange={handleInputChange}
              className="input-field"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Email *
          </label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleInputChange}
            className="input-field"
            placeholder="client@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Address *
          </label>
          <textarea
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleInputChange}
            className="input-field h-24"
            placeholder="Enter complete address..."
            required
          />
        </div>

        {/* Project Details */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Project Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Location
              </label>
              <input
                type="text"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Installation site address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Capacity (kW)
              </label>
              <input
                type="text"
                name="systemCapacity"
                value={formData.systemCapacity}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., 5.5 kW"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Installation Date
              </label>
              <input
                type="date"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warranty Period
              </label>
              <input
                type="text"
                name="warrantyPeriod"
                value={formData.warrantyPeriod}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., 25 Years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Cost
              </label>
              <input
                type="text"
                name="totalCost"
                value={formData.totalCost}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., $15,000"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            className="input-field h-24"
            placeholder="Any additional information or special requirements..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onPreview}
            disabled={!isFormValid()}
            className={`btn-primary ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Preview Document
          </button>
        </div>
      </form>
    </div>
  );
}