'use client';

export function ContactMap() {
  const embedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.0!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1';
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
      <iframe
        title="PhilaHomes location"
        src={embedUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full sm:h-80"
      />
    </div>
  );
}
