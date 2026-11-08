import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "Open Media iletişim formu aracılığıyla işlenen kişisel verilere ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return (
    <LegalPage eyebrow="Yasal" title="KVKK Aydınlatma Metni">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla [Şirket unvanı]
        (“Open Media”) olarak, web sitemizdeki iletişim formu aracılığıyla paylaştığınız kişisel verileri aşağıda
        açıklanan kapsamda işlemekteyiz.
      </p>

      <h2>İşlenen kişisel veriler</h2>
      <ul>
        <li>Kimlik ve iletişim bilgileri: ad soyad, e-posta adresi, telefon numarası (isteğe bağlı)</li>
        <li>İşletme bilgileri: işletme adı, işletme türü</li>
        <li>Talep bilgileri: ilgilenilen hizmet, proje açıklaması, bütçe aralığı (isteğe bağlı)</li>
      </ul>

      <h2>İşleme amaçları</h2>
      <p>
        Kişisel verileriniz; proje talebinizin değerlendirilmesi, sizinle iletişime geçilmesi ve size teklif
        sunulması amaçlarıyla işlenir.
      </p>

      <h2>Hukuki sebep ve toplama yöntemi</h2>
      <p>
        Verileriniz, web sitemizdeki form aracılığıyla elektronik ortamda; KVKK’nın 5/2-c (bir sözleşmenin kurulması
        veya ifasıyla doğrudan ilgili olması) ve 5/2-f (veri sorumlusunun meşru menfaati) maddelerine dayanılarak
        toplanır.
      </p>

      <h2>Aktarım</h2>
      <p>
        Form verileri, hizmet aldığımız altyapı sağlayıcılarının sunucularında saklanır ve bildirim e-postası olarak
        iletilir: Google Firebase (veri saklama), Resend (e-posta gönderimi) ve Vercel (barındırma). Bu sağlayıcıların
        sunucuları yurt dışında bulunabilir. Yurt dışına aktarım, KVKK’nın 9. maddesinde öngörülen şartlara uygun
        olarak gerçekleştirilir. [Uygulanan aktarım mekanizması belirtilmelidir.]
      </p>

      <h2>Saklama süresi</h2>
      <p>Verileriniz, işleme amacının gerektirdiği süre boyunca ve en fazla [süre] saklanır; ardından silinir.</p>

      <h2>Haklarınız</h2>
      <p>
        KVKK’nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini
        veya silinmesini isteme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı
        [başvuru e-posta adresi] adresine iletebilirsiniz.
      </p>

      <h2>Veri sorumlusu</h2>
      <p>
        [Şirket unvanı]
        <br />
        [Adres]
        <br />
        [MERSİS / vergi numarası]
      </p>
    </LegalPage>
  );
}
