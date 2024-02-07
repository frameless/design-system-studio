'use client';

import {
  Button,
  Heading2,
  LinkList,
  LinkListLink,
  Paragraph,
  AccordionProvider,
  Page,
  PageContent,
} from '@utrecht/component-library-react';
import { TopTaskLink } from '@/components/TopTask/TopTaskLink';
import { TopTaskNavigation } from '@/components/TopTask/TopTaskNavigation';
import {
  UtrechtIconAfvalScheiden,
  UtrechtIconMeldingKlacht,
  UtrechtIconNummerbord,
  UtrechtIconPaspoort,
  UtrechtIconVerhuizen,
  UtrechtIconWerken,
  UtrechtIconChevronRight,
} from '@utrecht/web-component-library-react';
import { ExampleHeader } from '@/components/ExampleHeader/ExampleHeader';
import { ExampleFooter } from '@/components/ExampleFooter/ExampleFooter';
import { ExampleNavigation } from '@/components/ExampleNavigation/ExampleNavigation';

export default function Home() {
  return (
    <Page className="voorbeeld-page--flex">
      <ExampleHeader />
      <ExampleNavigation />
      <PageContent className="voorbeeld-page-content--flex">
        <section className="voorbeeld-section-page voorbeeld-section--spacing">
          <TopTaskNavigation className="grid">
            <TopTaskLink icon={<UtrechtIconPaspoort />}>Paspoort of ID-kaart aanvragen</TopTaskLink>
            <TopTaskLink href="/meldingen/" icon={<UtrechtIconMeldingKlacht />}>
              Meldingen openbare ruimte
            </TopTaskLink>
            <TopTaskLink icon={<UtrechtIconVerhuizen />}>Verhuizing doorgeven</TopTaskLink>
            <TopTaskLink icon={<UtrechtIconWerken />}>Werken bij de gemeente</TopTaskLink>
            <TopTaskLink icon={<UtrechtIconNummerbord />}>Parkeren: kentekenwijziging doorgeven</TopTaskLink>
            <TopTaskLink icon={<UtrechtIconAfvalScheiden />}>Afval</TopTaskLink>
          </TopTaskNavigation>
        </section>
        <section className="voorbeeld-section-page voorbeeld-section--spacing">
          <div className="voorbeeld-section-content">
            <div className="voorbeeld-container-wrapper">
              <Heading2 className="voorbeeld-heading-2">Zelf regelen</Heading2>
              <Button className="voorbeeld-button-more" appearance="primary-action-button">
                Meer bekijken
              </Button>
            </div>
            <AccordionProvider
              sections={[
                {
                  headingLevel: 2,
                  body: (
                    <div className="voorbeeld-container-wrapper voorbeeld-container-accordion">
                      <Paragraph>
                        Met een paspoort, identiteitskaart of rijbewijs kunt u zich identificeren en reizen. Onder
                        voorwaarden kunt u de Nederlandse identiteit krijgen.
                      </Paragraph>
                      <LinkList>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Paspoort aanvragen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          ID-kaart aanvragen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Rijbewijs aanvragen
                        </LinkListLink>
                      </LinkList>
                    </div>
                  ),
                  expanded: undefined,
                  label: 'Paspoort, ID-kaart en rijbewijs',
                },
                {
                  body: (
                    <div className="voorbeeld-container-wrapper voorbeeld-container-accordion">
                      <LinkList>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Verhuizing naar Gemeente voorbeeld
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Verhuizing vanuit het buitenland naar Gemeente voorbeeld doorgeven
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Verhuizing naar het buitenland doorgeven
                        </LinkListLink>
                      </LinkList>
                    </div>
                  ),
                  expanded: undefined,
                  label: 'Verhuizen',
                },
                {
                  body: (
                    <div className="voorbeeld-container-wrapper voorbeeld-container-accordion">
                      <Paragraph>
                        Wilt u het kenteken aanpassen van uw parkeervergunning, garageabonnement of
                        gehandicaptenparkeerplaats? Kies hier wat u wilt aanpassen.
                      </Paragraph>
                      <LinkList>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Parkeervergunning bewoner, kenteken aanpassen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Parkeervergunning huurauto of leenauto, kenteken aanpassen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Parkeervergunning gehandicapte, kenteken aanpassen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Parkeervergunning hulpverlener (ga naar Parkeervergunning bewoner, kenteken aanpassen)
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Gehandicaptenparkeerplaats, kenteken aanpassen
                        </LinkListLink>
                        <LinkListLink href="#" icon={<UtrechtIconChevronRight />}>
                          Garageabonnement bewoner (kenteken aanpassen) (pdf, 182 kB)
                        </LinkListLink>
                      </LinkList>
                    </div>
                  ),
                  expanded: undefined,
                  label: 'Kentekenwijziging doorgeven',
                },
              ]}
            />
          </div>
        </section>
      </PageContent>
      <ExampleFooter />
    </Page>
  );
}
