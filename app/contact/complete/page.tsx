import ContactCompleteComponent from "@/components/contactComponent/ContactCompleteComponent";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";

const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'お問い合わせ完了', href: '/contact/complete' },
];

export default function ContactCompletePage() {
  return (
    <div className="min-h-screen bg-primary-light flex items-center justify-center px-4">
     

      <div className="max-w-lg mx-auto text-center">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="お問い合わせ完了" />
        {/* Main Content */}
        <ContactCompleteComponent />
      </div>
    </div>
  );
}