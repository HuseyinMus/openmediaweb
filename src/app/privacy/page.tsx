import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Open Media web sitesinin gizlilik politikası.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Yasal" title="Gizlilik Politikası">
      <p>
        Bu politika, Open Media web sitesini ziyaret ettiğinizde ve iletişim formunu kullandığınızda bilgilerinizin
        nasıl ele alındığını açıklar.
      </p>

      <h2>Topladığımız bilgiler</h2>
      <p>
        Yalnızca iletişim formu aracılığıyla bize kendi isteğinizle ilettiğiniz bilgileri topluyoruz. Ayrıntılar için{" "}
        <Link href="/kvkk" className="font-medium text-om-blue underline underline-offset-2">
          KVKK Aydınlatma Metni
        </Link>
        ’ni inceleyebilirsiniz.
      </p>

      <h2>Çerezler ve analiz</h2>
      <p>
        Web sitemiz şu anda reklam veya analiz çerezi kullanmaz. Tarayıcınızda yalnızca giriş animasyonunun bir oturumda
        bir kez gösterilmesi için teknik bir oturum kaydı tutulur. Analiz aracı eklendiğinde bu bölüm güncellenecektir.
      </p>

      <h2>Bilgilerin kullanımı</h2>
      <p>
        Paylaştığınız bilgileri yalnızca talebinizi yanıtlamak ve sizinle iletişim kurmak için kullanırız. Bilgilerinizi
        satmayız ve pazarlama amacıyla üçüncü kişilerle paylaşmayız.
      </p>

      <h2>Güvenlik</h2>
      <p>
        Form verileri sunucu tarafında doğrulanır ve erişimi kısıtlanmış bir veritabanında saklanır. İnternet üzerinden
        yapılan hiçbir aktarımın tamamen güvenli olduğu garanti edilemese de verilerinizi korumak için makul teknik
        önlemleri uygularız.
      </p>

      <h2>İletişim</h2>
      <p>Gizlilikle ilgili sorularınız için: [iletişim e-posta adresi]</p>
    </LegalPage>
  );
}
