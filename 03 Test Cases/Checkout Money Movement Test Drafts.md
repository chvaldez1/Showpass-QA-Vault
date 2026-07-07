# Checkout Money Movement Test Drafts

Draft Qase/manual cases only after source-backed findings are identified in [[02 Feature QA/Checkout Critical Path Gap Analysis]].

Related notes:
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[06 Prompts/Showpass QA Test Case Generator]]

## Draft Index

| Local ID | Priority | Score | Title | Source Finding | Qase Status |
| --- | --- | ---: | --- | --- | --- |
|  |  |  |  |  |  |

## Draft Case Template

```markdown
### TC-#: [Surface] - Checkout - [Money Movement Area] - Verify [Expected Behavior]

**Priority:** P0/P1/P2/P3  
**Risk score:** 0/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#heading]]  
**Description:**  

**Preconditions:**  
- 

**Postconditions:**  
- 

**Tags:** checkout, payment

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | Public Checkout |
| PaymentPath | SuccessfulCard |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
|  |  |  |

**Qase mapping:**  
- Existing case:
- Proposed suite:
- Write action:

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog]]
```

## Drafting Rules

- Do not draft broad checkout cases until the source finding is specific.
- Prefer one case per materially different money movement risk.
- Keep manual cases readable and Qase-ready.
- Reference source paths instead of copying implementation details.
- Do not create or update Qase cases without explicit confirmation of exact scope.
