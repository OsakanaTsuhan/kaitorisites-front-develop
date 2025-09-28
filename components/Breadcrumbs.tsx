'use client';

import Link from 'next/link';

type Breadcrumb = {
  label: string;
  href: string;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex lg:mt-4 mb-12 lgmb-4 space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <span>＞</span>}
            <Link href={crumb.href} className="ml-2 text-sm text-gray-500 hover:text-gray-700">
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}