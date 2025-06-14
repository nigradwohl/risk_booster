# Readme: Science X Media Risk Booster 

This tool has the aim to aid journalists to transparently communicate risks, including health risks, but also the efficacy of treatments and vaccination. 
It consists of 3 parts: 

1. A text-checking tool, where users can enter a text (finished article or press release; currently only in German) and can receive feedback about the transparency of their risk communication.
2. An interactive checklist that allows users to judge whether the numbers in any text (including scientific publications), allow to communicate risks transparently.
3. A Wiki that summarizes the  [guidelines for transparent, evidence-based health communication](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.ebm-netzwerk.de/de/medien/pdf/leitlinie-evidenzbasierte-gesundheitsinformation-fin.pdf&ved=2ahUKEwj4qPyDqpKGAxVE_7sIHXAMDNsQFnoECBIQAQ&usg=AOvVaw2JvtJWGC4VuUWCM1IMnl11)
and is liked from the other parts.

# Main ToDoS

a. imprint
b. final brush-up for wiki: finalize the texts, then add links, also to sources (guidelines);
c. finalize the feedback elements;
d. testing and handling a few more texts -- together with Tim;
e. maybe: improve detection of number references (percentages and cases)
f. maybe: screening case in risk calculator


# Future features 

Features are sorted by importance and are further split by features that should be implemented soon and those that may be implemented at a later point in time.

## General 
* 
* Typos!

### Nice to have 

* Life-risks 

## Text-checking tool 

* check for fullstops and spaces
* popup tooltips to top from beginning
* Increase the number of test-texts that are successfully handled
    + detect absolute risk reductions (e.g., smaller percentages, percentage points): distinguish from unidentified percentages (and mention if they are likely relative)
* detect if numbers have a reference (e.g., is only the number of infections or percentages in groups reported? 
Do we also have the group sizes?)
* Additional topic: alcohol abuse, vaccination against ticks, Unstatistik as source
    + HPV: https://www.rki.de/SharedDocs/FAQ/Impfen/HPV/FAQ-Liste_HPV_Impfen.html 
    + https://www.tagesschau.de/wissen/gesundheit/hpv-impfung-102.html
    + https://www.sciencemediacenter.de/alle-angebote/research-in-context/details/news/virusverbreitung-bei-hpv-geimpften/



### Nice to have

* Remove/handle relative clauses 
* handle "ein", "einen": only identify as numbers when keywords follow
* handle other topics (especially feedback)
* try again to catch unidentified numbers after current iterations 


## Checklist

* Ask others: good idea to shorten the checker?
* Add links to wiki and tooltips
* Check whether we can skip more entries based on usin ptab and how we can determine this

* look for press releases (maybe articles) to check if "efficacy" or "effectiveness" are used in another context than infections (e.g., mortality, hospital admissions)
  * https://www.thelancet.com/journals/lanres/article/PIIS2213-2600(23)00015-2/fulltext (effectiveness: hospitalization, mortality)
  * https://www.gov.uk/government/news/vaccines-highly-effective-against-hospitalisation-from-delta-variant (effectiveness: hospitalization)
  * https://www.helios-gesundheit.de/qualitaet/aktuelle-studien-zu-den-corona-impfungen/ (mortality)
  * https://www.bmj.com/content/376/bmj-2021-069761 (hospital admissions) 
  * Note "In der medizinischen Statistik und Infektionsepidemiologie gehört die Ermittlung der Impfstoffwirksamkeit (IW),[1] auch Impfwirksamkeit,[2] Schutzwirkung,[3] (englisch vaccine efficacy) oder Impfeffekt[4] genannt," (Wikipedia)
  * Vaccine effectiveness is a measure of how well vaccination protects people against health outcomes such as infection, symptomatic illness, hospitalization, and death. (CDC)
* Make clear which (relative) reduction is meant -- double check
* How do press-releases/articles talk about screenings?
* Recheck harding center
* Treatment categories: Reduktion Symptome, Reduktion Krankheitstage, Reduktion der Symptome (z.B., Schmerzen), Symptomlinderung

* remove or fix "text bearbeiten"

* look for articles and press releases to process (SciMedia center; JAMA network open!; BMJ, JAMA, Lancet, Annals of internal medicine, NEJM; Tim, get endpoints and superordinate terms; Cochrane?)
* Superordinate statement: "Das uns interessierende **Ereignis**"
* Implement additional questions as needed (e.g., OR, AR or ARR for side effects)
* Calculation from AR in 1 group (+ rel) possible?

### Nice to have

* allow to show only 1 icon array: no, is not fully transparent!
* add options for ppv and npv; proportion of positive tests; frequencies?
* Handle case control studies
* Handle ORs

## Wiki

* Decide on the central entries and fill them with information
* Implement navigation on the side (in progress)

### To discuss 

* Swap position of overview and explnatory text?

### Nice to have

* Make main texts extendable?