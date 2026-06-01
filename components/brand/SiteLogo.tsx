import Image from 'next/image';

const LOGO_PATH = '/images/okuhle-homes-logo.png';
const LOGO_SIZE = 1500;

type SiteLogoProps = {
  /** Size of the square logo area (Tailwind classes, e.g. h-11 w-11) */
  className?: string;
  /** Passed to next/image `sizes` for responsive srcset (match your layout width) */
  sizes?: string;
  /** Use `""` when the logo sits inside a link/button that already has an accessible name */
  alt?: string;
  priority?: boolean;
};

export function SiteLogo({
  className = 'h-14 w-14 sm:h-16 sm:w-16',
  sizes = '(max-width: 640px) 56px, 64px',
  alt = 'Okuhle Homes',
  priority = false,
}: SiteLogoProps) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}>
      <Image
        src={LOGO_PATH}
        alt={alt}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        className="h-full w-full object-contain"
        sizes={sizes}
        priority={priority}
      />
    </span>
  );
}
