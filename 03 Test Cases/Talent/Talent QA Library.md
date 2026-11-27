# Talent QA Library

An Organizer can prepare a Talent profile, a scheduled appearance, and an offering Event. The public Website can present an Experience that customers select and purchase from that relationship. Record the Talent, appearance, linked Event and issued order as distinct records. [[03 Test Cases/Test Cases by Feature|Test library]]

| Surface | Proof target | Saved Qase |
| --- | --- | --- |
| Organizer Talent catalog | A profile belongs to the intended catalog. Compare a permitted edit on an owned profile with a shared read-only profile. | [SPT-5875](https://app.qase.io/case/SPT-5875) · [SPT-5879](https://app.qase.io/case/SPT-5879) |
| Organizer Talent Appearance | The scheduled appearance belongs to the correct Talent and links the intended Event and Experiences. | [SPT-5880](https://app.qase.io/case/SPT-5880) · [SPT-5883](https://app.qase.io/case/SPT-5883) · [[03 Test Cases/Events/event-management-qase-test-cases|Events]] |
| Public Website and checkout | Select the intended Experience and compare the actual item in the basket and completed order. Check analytics against that transaction if licensed and scoped. | [SPT-5886](https://app.qase.io/case/SPT-5886) · [SPT-6016](https://app.qase.io/case/SPT-6016) · [[03 Test Cases/Websites/Websites QA Library|Websites]] |

Backend `apps/websites/api/venue_based/serializers/talents.py` and frontend Dashboard `features/talent` and public `features/talents` provide source anchors for a new check. These are saved definitions.
