'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, TextArea, Button } from '@/app/components/common';
import { applicationService } from '@/services';
import type { ApplicationFormData } from '@/types';

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplicationForm({
  jobId,
  jobTitle,
}: ApplicationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<
    Omit<ApplicationFormData, 'job_id'>
  >({
    name: '',
    email: '',
    resume_link: '',
    cover_note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email';
    }
    if (!formData.resume_link.trim()) next.resume_link = 'Resume link is required';
    else {
      try {
        new URL(formData.resume_link);
      } catch {
        next.resume_link = 'Please enter a valid URL';
      }
    }
    if (!formData.cover_note?.trim()) next.cover_note = 'Cover note is required';
    else if ((formData.cover_note?.length ?? 0) < 10) {
      next.cover_note = 'Cover note must be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await applicationService.create({
        job_id: jobId,
        ...formData,
      });
      if (response.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          resume_link: '',
          cover_note: '',
        });
      }
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error ? err.message : 'Failed to submit application',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-green-800">
          Application Submitted!
        </h3>
        <p className="mb-4 text-green-600">
          Your application for {jobTitle} has been submitted successfully.
        </p>
        <Button type="button" variant="outline" onClick={() => router.push('/jobs')}>
          Browse More Jobs
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Apply for this position
      </h3>

      {errors.submit && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errors.submit}
        </div>
      )}

      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        required
      />

      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        required
      />

      <Input
        type="url"
        label="Resume Link"
        placeholder="https://drive.google.com/your-resume"
        value={formData.resume_link}
        onChange={handleChange('resume_link')}
        error={errors.resume_link}
        required
      />

      <TextArea
        label="Cover Note"
        placeholder="Tell us why you're interested in this position..."
        value={formData.cover_note}
        onChange={handleChange('cover_note')}
        error={errors.cover_note}
        rows={4}
        required
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isSubmitting}
      >
        Submit Application
      </Button>
    </form>
  );
}
