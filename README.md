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

* Handle treatment case  

### Nice to have 

* Life-risks 

## Text-checking tool 

* Improve global feedback by restructuring it and making it perceptually easier
    + also add links to wiki 
* Increase the number of test-texts that are successfully handled
    + also handle number words
    + detect absolute risk reductions (e.g., smaller percentages, percentage points): distinguish from unidentified percentages (and mention if they are likely relative)
* Identify whether numbers seem to have a reference 
* Adapt the highlighting color to potentially critical numbers (e.g., relative risk reductions) 
* Handle margins for tooltips 

### Nice to have

* handle other topics (especially feedback) 
* try again to catch unidentified numbers after current iterations 


## Checklist

* look for articles and press releases
* Implement treatment case (wording!)
* Implement additional questions as needed (e.g., AR or ARR for side effects)
* Calculation from AR in 1 group (+ rel) possible?
* Handling contradictory entries
* fix persistent issues (especially: going back; maybe handle by cleaning the object)

### Nice to have

* Make assumptions in case of missing information

## Wiki

* Decide on the central entries and fill them with information 

### Nice to have
