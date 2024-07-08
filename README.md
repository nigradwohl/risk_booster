# Readme: Science X Media Risk Booster 

This tool has the aim to aid journalists to transparently communicate risks, including health risks, but also the efficacy of treatments and vaccination. 
It consists of 3 parts: 

1. A text-checking tool, where users can enter a text (finished article or press release; currently only in German) and can receive feedback about the transparency of their risk communication.
2. An interactive checklist that allows users to judge whether the numbers in any text (including scientific publications), allow to communicate risks transparently.
3. A Wiki that summarizes the  [guidelines for transparent, evidence-based health communication](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.ebm-netzwerk.de/de/medien/pdf/leitlinie-evidenzbasierte-gesundheitsinformation-fin.pdf&ved=2ahUKEwj4qPyDqpKGAxVE_7sIHXAMDNsQFnoECBIQAQ&usg=AOvVaw2JvtJWGC4VuUWCM1IMnl11)
and is liked from the other parts.

# Future features 

Features are sorted by importance and are further split by features that should be implemented soon and those that may be implemented at a later point in time.

## General 

* Design of landing page
* Handle treatment case  

### Nice to have 

* Life-risks 

## Text-checking tool 

* Increase the number of test-texts that are successfully handled
    + detect absolute risk reductions (e.g., smaller percentages, percentage points): distinguish from unidentified percentages (and mention if they are likely relative)
* detect if numbers have a reference (e.g., is only the number of infections or percentages in groups reported? 
Do we also have the group sizes?)
* Additional topic: alcohol abuse, vaccination against ticks, Unstatistik as source

### Nice to have

* handle other topics (especially feedback)
* try again to catch unidentified numbers after current iterations 


## Checklist

* Screenings as case (sensitivity/specificity) 
* look for articles and press releases to process (SciMedia center; JAMA network open!; BMJ, JAMA, Lancet, Annals of internal medicine, NEJM; Tim, get endpoints and superordinate terms; Cochrane?)
* Superordinate statement: "Das uns interessierende **Ereignis**"
* Implement additional questions as needed (e.g., OR, AR or ARR for side effects)
* Calculation from AR in 1 group (+ rel) possible?
* Handle case control studies
* Handle ORs

### Nice to have

* allow to show only 1 icon array
* Make assumptions in case of missing information

## Wiki

* Decide on the central entries and fill them with information
* Implement navigation on the side (in progress)

### Nice to have

* Make main texts extendable?