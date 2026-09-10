import Hero from '@/components/hero/Hero'
import IntroSection from '@/components/intro/IntroSection'
import NameStrip from '@/components/name/NameStrip'
import CertificationsSection from '@/components/certifications/CertificationsSection'
import StudioSection from '@/components/studio/StudioSection'
import SiteFooter from '@/components/footer/SiteFooter'
import PaperRun from '@/components/paper/PaperRun'

export default function Page() {
  return (
    <main>
        {}
        <PaperRun>
          <Hero />
          <IntroSection />
          <NameStrip />
          <StudioSection />
          <CertificationsSection />
          <SiteFooter />
        </PaperRun>
    </main>
  )
}
