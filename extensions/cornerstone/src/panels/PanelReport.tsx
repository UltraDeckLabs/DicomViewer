import React, { useState } from 'react';
import { Input } from '@ohif/ui-next';
import { Label } from '@ohif/ui-next';
import { Button } from '@ohif/ui-next';

export default function PanelReport({ servicesManager }) {
  const [formData, setFormData] = useState({
    examInformation: '',
    findings: '',
    impression: '',
    recommendations: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // API endpoint - replace with your actual endpoint
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      setSubmitStatus('success');
      // Clear form after successful submission
      setFormData({
        examInformation: '',
        findings: '',
        impression: '',
        recommendations: '',
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="text-lg font-semibold text-white">Report Form</div>

      {/* Exam Information */}
      <div className="flex flex-col space-y-2">
        <Label
          htmlFor="examInformation"
          className="text-sm text-white"
        >
          Exam Information
        </Label>
        <textarea
          id="examInformation"
          value={formData.examInformation}
          onChange={e => handleInputChange('examInformation', e.target.value)}
          placeholder="Enter exam information"
          className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        />
      </div>

      {/* Findings */}
      <div className="flex flex-col space-y-2">
        <Label
          htmlFor="findings"
          className="text-sm text-white"
        >
          Findings
        </Label>
        <textarea
          id="findings"
          value={formData.findings}
          onChange={e => handleInputChange('findings', e.target.value)}
          placeholder="Enter findings"
          className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        />
      </div>

      {/* Impression */}
      <div className="flex flex-col space-y-2">
        <Label
          htmlFor="impression"
          className="text-sm text-white"
        >
          Impression
        </Label>
        <textarea
          id="impression"
          value={formData.impression}
          onChange={e => handleInputChange('impression', e.target.value)}
          placeholder="Enter impression"
          className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        />
      </div>

      {/* Recommendations */}
      <div className="flex flex-col space-y-2">
        <Label
          htmlFor="recommendations"
          className="text-sm text-white"
        >
          Recommendations
        </Label>
        <textarea
          id="recommendations"
          value={formData.recommendations}
          onChange={e => handleInputChange('recommendations', e.target.value)}
          placeholder="Enter recommendations"
          className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none focus:ring-2"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report'}
      </Button>

      {/* Status Message */}
      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-900/50 p-3 text-sm text-green-400">
          Report submitted successfully!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-400">
          Failed to submit report. Please try again.
        </div>
      )}
    </div>
  );
}
