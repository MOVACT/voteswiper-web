import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import url from 'util/url';
import { VereinPage } from '.';

const Verein: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={t('org:statutes')}
        canonical={url(`/page/verein/satzung`, true)}
      />
      <PageHeader
        title={t('org:statutes')}
        breadcrumb={[
          {
            item: `/page/verein`,
            name: t('org:org'),
          },
          {
            item: `/page/verein/satzung`,
            name: t('org:statutes'),
          },
        ]}
      />
      <Page>
        <Container>
          <VereinPage>
            <div className="prose prose-white">
              <h2>§ 1 Name, Sitz, Geschäftsjahr</h2>

              <ol>
                <li>
                  Der Verein führt den Namen „VoteSwiper“. Er soll in das
                  Vereinsregister eingetragen werden; nach der Eintragung lautet
                  der Name „VoteSwiper e. V.“
                </li>
                <li>Der Verein hat seinen Sitz in Berlin.</li>
                <li>Das Geschäftsjahr des Vereins ist das Kalenderjahr.</li>
              </ol>

              <h2>§ 2 Zweck, Gemeinnützigkeit</h2>

              <ol>
                <li>
                  Der Verein verfolgt ausschließlich und unmittelbar
                  gemeinnützige Zwecke im Sinne des Abschnitts
                  „Steuerbegünstigte Zwecke“ der Abgabenordnung.
                </li>

                <li>
                  Zweck des Vereins ist die allgemeine Förderung des
                  demokratischen Staatswesens, im Geltungsbereich des
                  Grundgesetzes; hierzu gehören nicht Bestrebungen, die nur
                  bestimmte Einzelinteressen staatsbürgerlicher Art verfolgen
                  oder die auf den kommunalpolitischen Bereich beschränkt sind
                  (§ 52 Abs. 2 Nr. 24 AO).
                </li>

                <li>
                  Der Satzungszweck wird insbesondere verwirklicht durch die
                  Herausgabe einer Wahlhilfeanwendung sowie die Publikation oder
                  Durchführung von überparteilichen Angeboten zur politischen
                  Bildung und Information.
                </li>

                <li>
                  Der Verein ist selbstlos und überparteilich tätig; er verfolgt
                  nicht in erster Linie eigenwirtschaftliche Zwecke.
                </li>

                <li>
                  Mittel des Vereins dürfen nur für die satzungsmäßigen Zwecke
                  verwendet werden. Die Mitglieder erhalten keine Zuwendungen
                  aus Mitteln des Vereins.
                </li>

                <li>
                  Es darf keine Person durch Ausgaben, die dem Zweck des Vereins
                  fremd sind, oder durch unverhältnismäßig hohe Vergütungen
                  begünstigt werden.
                </li>

                <li>
                  Bei Auflösung oder Aufhebung des Vereins oder bei Wegfall
                  steuerbegünstigter Zwecke fällt das Vermögen des Vereins an
                  einen gemeinnützigen Verein oder eine andere steuerbegünstigte
                  Körperschaft, der bzw. die es unmittelbar und ausschließlich
                  für die allgemeine Förderung des demokratischen Staatswesens
                  im Sinne von § 52 Abs. 2 Nr. 24 AO, zu verwenden hat.
                </li>
              </ol>

              <h2>§ 3 Erwerb der Mitgliedschaft</h2>

              <ol>
                <li>
                  Ordentliches Mitglied oder Fördermitglied des Vereins kann
                  jede natürliche oder juristische Person werden.
                </li>
                <li>
                  Voraussetzung für den Erwerb der ordentlichen oder
                  Fördermitgliedschaft ist ein schriftlicher Aufnahmeantrag, der
                  an den Vorstand zu richten ist. Bei Minderjährigen ist der
                  Antrag auch von deren gesetzlichen Vertretern zu
                  unterschreiben. Diese müssen sich durch gesonderte
                  schriftliche Erklärung zur Zahlung der Mitgliedsbeiträge für
                  den Minderjährigen verpflichten.
                </li>
                <li>
                  Der Vorstand entscheidet über den Aufnahmeantrag nach freiem
                  Ermessen. Bei Ablehnung des Antrags ist er nicht verpflichtet,
                  dem Antragsteller die Gründe für die Ablehnung mitzuteilen.
                </li>
              </ol>

              <h2>§ 4 Beendigung der Mitgliedschaft</h2>

              <ol>
                <li>
                  Die Mitgliedschaft endet durch Tod, Ausschluss, Streichung von
                  der Mitgliederliste oder Austritt aus dem Verein.
                </li>
                <li>
                  Der Austritt erfolgt durch schriftliche Erklärung gegenüber
                  einem Mitglied des Vorstands. Bei Minderjährigen ist die
                  Austrittserklärung durch die gesetzlichen Vertreter abzugeben.
                  Der Austritt kann nur zum Ende eines Geschäftsjahres erklärt
                  werden, wobei eine Kündigungsfrist von zwei Monaten
                  einzuhalten ist.
                </li>
                <li>
                  Ein Mitglied kann durch Beschluss des Vorstandes von der
                  Mitgliederliste gestrichen werden, wenn es trotz zweimaliger
                  schriftlicher Mahnung mit der Zahlung von Mitgliedsbeiträgen
                  oder von Umlagen im Rückstand ist. Die Streichung darf erst
                  beschlossen werden, wenn nach der Absendung der zweiten
                  Mahnung zwei Monate verstrichen sind und in dieser Mahnung die
                  Streichung angedroht wurde. Der Beschluss des Vorstandes über
                  die Streichung muss dem Mitglied mitgeteilt werden.
                </li>
                <li>
                  Ein Mitglied kann durch Beschluss des Vorstandes aus dem
                  Verein ausgeschlossen werden, wenn es schuldhaft in grober
                  Weise die Interessen des Vereins verletzt. Vor der
                  Beschlussfassung muss der Vorstand dem Mitglied Gelegenheit
                  zur mündlichen oder schriftlichen Stellungnahme geben. Der
                  Beschluss des Vorstandes ist schriftlich zu begründen und dem
                  Mitglied zuzusenden. Gegen den Beschluss kann das Mitglied
                  Berufung an die Mitgliederversammlung einlegen. Die Berufung
                  ist innerhalb eines Monats nach Zugang des Beschlusses beim
                  Vorstand einzulegen. Der Vorstand hat binnen eines Monats nach
                  fristgemäßer Einlegung der Berufung eine Mitgliederversammlung
                  einzuberufen, die abschließend über den Ausschluss
                  entscheidet.
                </li>
              </ol>

              <h2>§ 5 Mitgliedsbeiträge</h2>

              <ol>
                <li>
                  Von den Mitgliedern werden monatliche oder jährliche
                  Mitgliedsbeiträge erhoben. Zur Finanzierung besonderer
                  Vorhaben können Umlagen bis zur doppelten Höhe des
                  Jahresbeitrags erhoben werden.
                </li>
                <li>
                  Höhe und Fälligkeit von Aufnahmegebühren, Mitgliedsbeiträgen
                  und Umlagen werden vom Vorstand festgesetzt.
                </li>
                <li>
                  Ehrenmitglieder sind von der Pflicht zur Zahlung von Beiträgen
                  und Umlagen befreit.
                </li>
                <li>
                  Der Vorstand kann in geeigneten Fällen Gebühren, Beiträge und
                  Umlagen ganz oder teilweise erlassen oder stunden.
                </li>
              </ol>

              <h2>§ 6 Organe des Vereins</h2>

              <p>
                Organe des Vereins sind der Vorstand und die
                Mitgliederversammlung.
              </p>

              <h2>§ 7 Vorstand</h2>

              <ol>
                <li>
                  Der Vorstand des Vereins iSv § 26 BGB besteht aus dem
                  Vorsitzenden, dem Stellvertretenden Vorsitzenden und dem
                  Schatzmeister.
                </li>
                <li>
                  Der Verein wird durch ein Mitglied des Vorstandes gerichtlich
                  und außergerichtlich vertreten. Rechtsgeschäfte mit einem
                  Geschäftswert über 5.000 EUR bedürfen im Innenverhältnis der
                  Zustimmung durch Vorstandsbeschluss in Textform.
                </li>
                <li>
                  Mitgliedern des Vorstands kann eine Vergütung gezahlt werden.
                  Über ihre Höhe entscheidet die Mitgliederversammlung. Die
                  Mitgliederversammlung kann einzelne Vorstandsmitglieder zum
                  Abschluss und zur Kündigung von entsprechenden Verträgen mit
                  anderen Vorstandsmitgliedern ermächtigen.
                </li>
              </ol>

              <h2>§ 8 Zuständigkeit des Vorstands</h2>

              <p>
                Der Vorstand ist für alle Angelegenheiten des Vereins zuständig,
                soweit sie nicht durch die Satzung einem anderen Organ des
                Vereins übertragen sind. Er hat insbes. folgende Aufgaben:
              </p>

              <ol type="a">
                <li>
                  Vorbereitung und Einberufung der Mitgliederversammlung sowie
                  Aufstellung der Tagesordnung;
                </li>
                <li>Ausführung von Beschlüssen der Mitgliederversammlung;</li>
                <li>
                  Vorbereitung des Haushaltsplans, Buchführung, Erstellung des
                  Jahresberichts;
                </li>
                <li>Beschlussfassung über die Aufnahme von Mitgliedern;</li>
                <li>Ernennung von Ehrenmitgliedern.</li>
              </ol>

              <h2>§ 9 Wahl und Amtsdauer des Vorstands</h2>

              <ol>
                <li>
                  Der Vorstand wird von der Mitgliederversammlung für die Dauer
                  von fünf Jahren, gerechnet von der Wahl an, gewählt. Er bleibt
                  jedoch bis zur Neuwahl des Vorstands im Amt. Jedes
                  Vorstandsmitglied ist einzeln zu wählen; die
                  Mitgliederversammlung kann Blockwahl beschließen. Zu
                  Vorstandsmitgliedern können nur ordentliche Mitglieder des
                  Vereins gewählt werden. Mit der Beendigung der Mitgliedschaft
                  im Verein endet auch das Amt eines Vorstandsmitglieds.
                </li>
                <li>
                  Scheidet ein Mitglied des Vorstands vorzeitig aus, so kann der
                  Vorstand für die restliche Amtsdauer des Ausgeschiedenen einen
                  Nachfolger wählen.
                </li>
              </ol>

              <h2>§ 10 Sitzungen und Beschlüsse des Vorstands</h2>

              <ol>
                <li>
                  Der Vorstand beschließt in Sitzungen, die vom Vorsitzenden,
                  bei dessen Verhinderung vom Stellvertretenden Vorsitzenden,
                  einberufen werden; die Tagesordnung braucht nicht angekündigt
                  zu werden. Die Einberufungsfrist beträgt zehn Tage. Die Frist
                  beginnt mit dem auf die Absendung folgenden Tag.
                </li>
                <li>
                  Der Vorstand ist beschlussfähig, wenn mindestens zwei seiner
                  Mitglieder anwesend sind. Bei der Beschlussfassung entscheidet
                  die Mehrheit der abgegebenen gültigen Stimmen; bei
                  Stimmengleichheit entscheidet die Stimme des Vorsitzenden, bei
                  dessen Abwesenheit die des Stellvertretenden Vorsitzenden.
                </li>
                <li>
                  Der Vorstand kann im schriftlichen Verfahren beschließen, wenn
                  alle Vorstandsmitglieder dem zustimmen.
                </li>
              </ol>

              <h2>§ 11 Mitgliederversammlung</h2>

              <ol>
                <li>
                  In der Mitgliederversammlung hat jedes ordentliche Mitglied
                  eine Stimme. Zur Ausübung des Stimmrechts kann ein anderes
                  ordentliches Mitglied schriftlich bevollmächtigt werden. Die
                  Bevollmächtigung ist für jede Mitgliederversammlung gesondert
                  zu erteilen; ein Mitglied darf jedoch nicht mehr als drei
                  fremde Stimmen vertreten.
                </li>
                <li>
                  Die Mitgliederversammlung ist für folgende Angelegenheiten
                  zuständig:
                  <ol type="a">
                    <li>
                      Entgegennahme des Jahresberichts des Vorstands; Entlastung
                      des Vorstands;
                    </li>
                    <li>Wahl und Abberufung der Mitglieder des Vorstands;</li>
                    <li>
                      Beschlussfassung über Änderung der Satzung und über die
                      Auflösung des Vereins;
                    </li>
                    <li>
                      Beschlussfassung über die Berufung gegen einen
                      Ausschließungsbeschluss des Vorstands.
                    </li>
                  </ol>
                </li>
              </ol>

              <h2>§ 12 Einberufung der Mitgliederversammlung</h2>

              <ol>
                <li>
                  Die ordentliche Mitgliederversammlung findet einmal jährlich
                  statt. Sie wird vom Vorstand unter Einhaltung einer Frist von
                  zehn Tagen in Textform per E-Mail unter Angabe der
                  Tagesordnung einberufen. Die Frist beginnt mit dem auf die
                  Absendung des Einladungsschreibens folgenden Tag. Das
                  Einladungsschreiben gilt dem Mitglied als zugegangen, wenn es
                  an die letzte vom Mitglied dem Verein schriftlich bekannt
                  gegebene E-Mail-Adresse gerichtet ist. Die Tagesordnung setzt
                  der Vorstand fest.
                </li>
                <li>Teilnahmeberechtigt sind alle ordentlichen Mitglieder.</li>
                <li>
                  Jedes ordentliche Mitglied kann bis spätestens drei Tage vor
                  einer Mitgliederversammlung beim Vorstand in Textform eine
                  Ergänzung der Tagesordnung beantragen. Der Versammlungsleiter
                  hat zu Beginn der Mitgliederversammlung die Ergänzung bekannt
                  zu geben.
                </li>
              </ol>

              <h2>§ 13 Außerordentliche Mitgliederversammlung</h2>

              <p>
                Eine außerordentliche Mitgliederversammlung ist vom Vorstand
                einzuberufen, wenn das Interesse des Vereins es erfordert oder
                wenn ein Viertel der ordentlichen Mitglieder dies beim Vorstand
                in Textform unter Angabe des Zwecks und der Gründe beantragt.
              </p>

              <h2>§ 14 Beschlussfassung der Mitgliederversammlung</h2>

              <ol>
                <li>
                  Die Mitgliederversammlung wird vom Vorsitzenden, bei dessen
                  Verhinderung vom Stellvertretenden Vorsitzenden oder dem
                  Schatzmeister geleitet. Ist kein Vorstandsmitglied anwesend,
                  bestimmt die Versammlung den Versammlungsleiter. Bei Wahlen
                  kann die Versammlungsleitung für die Dauer des Wahlganges und
                  der vorhergehenden Diskussion einem Wahlausschuss übertragen
                  werden. Der Versammlungsleiter bestimmt einen Protokollführer.
                </li>
                <li>
                  Die Art der Abstimmung bestimmt der Versammlungsleiter. Die
                  Abstimmung muss in Schriftform durchgeführt werden, wenn ein
                  Drittel der erschienenen stimmberechtigten Mitglieder dies
                  beantragt.
                </li>
                <li>
                  Stimmberechtigt sind alle ordentlichen Mitglieder. Förder-
                  oder Ehrenmitglieder sind nicht stimmberechtigt.
                </li>
                <li>
                  Die Mitgliederversammlung ist beschlussfähig, wenn mindestens
                  ein Viertel sämtlicher ordentlicher Vereinsmitglieder anwesend
                  ist. Bei Beschlussunfähigkeit ist der Vorstand verpflichtet,
                  innerhalb von zwei Wochen eine zweite Mitgliederversammlung
                  mit der gleichen Tagesordnung einzuberufen; diese ist ohne
                  Rücksicht auf die Zahl der erschienenen Mitglieder
                  beschlussfähig. Hierauf ist in der Einladung hinzuweisen.
                </li>
                <li>
                  Die Mitgliederversammlung fasst Beschlüsse mit einfacher
                  Mehrheit der abgegebenen gültigen Stimmen; Stimmenthaltungen
                  gelten als ungültige Stimmen. Zur Änderung der Satzung ist
                  jedoch eine Mehrheit von drei Vierteln der abgegebenen
                  gültigen Stimmen, zur Auflösung des Vereins eine solche von
                  neun Zehnteln erforderlich. Eine Änderung des Zwecks des
                  Vereins kann nur mit Zustimmung von neun Zehnteln aller
                  ordentlicher Mitglieder beschlossen werden. Die schriftliche
                  Zustimmung der in der Mitgliederversammlung nicht erschienenen
                  ordentlichen Mitglieder kann gegenüber dem Vorstand nur
                  innerhalb eines Monats erklärt werden.
                </li>
                <li>
                  Bei Wahlen ist gewählt, wer mehr als die Hälfte der
                  abgegebenen gültigen Stimmen erhalten hat. Hat niemand mehr
                  als die Hälfte der abgegebenen gültigen Stimmen erhalten, so
                  findet zwischen den beiden Kandidaten, die die meisten Stimmen
                  erhalten haben, eine Stichwahl statt. Gewählt ist dann
                  derjenige, der die meisten Stimmen erhalten hat. Bei gleicher
                  Stimmenzahl entscheidet das von dem Versammlungsleiter zu
                  ziehende Los.
                </li>
                <li>
                  Über Beschlüsse der Mitgliederversammlung ist ein Protokoll
                  aufzunehmen, das vom jeweiligen Schriftführer zu unterzeichnen
                  ist.
                </li>
              </ol>

              <h2>§ 15 Auflösung des Vereins</h2>

              <ol>
                <li>
                  Die Auflösung des Vereins kann nur in einer
                  Mitgliederversammlung mit einer Mehrheit von neun Zehnteln der
                  abgegebenen gültigen Stimmen beschlossen werden (§ 17 Abs. 4).
                </li>
                <li>
                  Falls die Mitgliederversammlung nichts anderes beschließt,
                  sind der Vorsitzende und der Stellvertretende Vorsitzende
                  gemeinsam vertretungsberechtigte Liquidatoren.
                </li>
              </ol>

              <p>Berlin, 19.07.2021</p>
            </div>
          </VereinPage>
        </Container>
      </Page>
    </>
  );
};

export default Verein;
