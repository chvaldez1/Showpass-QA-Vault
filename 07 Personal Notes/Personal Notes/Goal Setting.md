## **QA Performance Goals & Development Plan**

## **Overall Goal**

**Increase confidence in releases by raising QA standards through deeper technical involvement, increased automation, and outcome-driven testing.**

**What this means:**  
Evolve QA from primarily validating features to actively preventing risk by being more technically embedded in development, expanding meaningful automation, and focusing on measurable outcomes such as release confidence, stability, and reduced regressions.



## **Core Focus: Raising QA Standards**

Raise QA standards across the team by:

- Increasing technical involvement in development
- Expanding high-impact automation
- Driving measurable quality outcomes



## **1. Strengthen QA Ownership Through Technical Involvement, Automation, and Outcomes**

**Goal:**  
Increase release confidence by embedding QA earlier in development, focusing automation on high-impact areas, and ensuring QA work drives measurable outcomes.

### **Technical Involvement**

- Participate earlier in feature planning to identify risks.
- Build stronger understanding of  technical literature
- Collaborate with engineers on test strategy and testability improvements.

### **Automation (High-Impact Focus)**

- Prioritize automation for:
  - High-risk user flows
  - Frequently regressed areas
  - Config-heavy scenarios
- Convert stable manual tests into Playwright automation.
- Regularly review automation gaps based on production issues.
- Focus on reliability and signal quality over test volume.

### **Outcome-Driven QA**

- Define QA “done” criteria per feature (coverage, risk, confidence).
- Clearly communicate release confidence and risks.
- Track QA impact through:
  - Reduction in production bugs
  - Fewer hotfixes
  - Improved test reliability
- Proactively recommend improvements when gaps are identified.



## **2. Improve Test Coverage Through Realistic and High-Risk Scenarios**

**Goal:**  
Ensure testing reflects real-world usage and complex configurations to reduce production issues.

### **Integration & Configuration Coverage**

- Identify high-risk configurations (feature flags, memberships, venue setups).
- Expand integration tests across config combinations.
- Prioritize coverage based on production impact and historical issues.

### **Real-World Environment Alignment**

- Mirror sanitized real organizer and venue setups in QA environments.
- Maintain “golden” test accounts:
  - Simple setups
  - Complex setups
  - Edge-case scenarios
- Document what each setup is intended to validate.



## **3. Improve Reliability and Trust in QA Signals**

**Goal:**  
Ensure QA results are stable, actionable, and trusted by the team.

### **Reduce Test Flakiness**

- Track and categorize flaky tests (timing, data, environment).
- Improve test stability through better waits, assertions, and isolation.
- Refactor or remove low-value or noisy tests.
- Reduce the need for repeated test runs.

### **Increase Visibility of QA Results**

- Introduce clear visual summaries (coverage, regression vs smoke, release readiness).
- Use QA tools to communicate:
  - What is covered
  - What is not covered
  - Known risk areas
- Provide QA summaries in release notes with clear confidence levels.



## **4. Standardise QA Processes and Tooling**

**Goal:**  
Improve consistency, efficiency, and scalability of QA practices.

**Actions:**

- Define guidelines for manual vs automated testing.
- Standardize test structure, naming, and documentation.
- Improve consistency in QA tools (e.g., test clarity, tagging, organization).
- Explore improvements for reporting, flakiness tracking, and test management.



## **5. Anticipate and Prevent Quality Risks**

**Goal:**  
Shift from reactive testing to proactively identifying and mitigating risk.

**Actions:**

- Identify recurring problem areas and ensure they are covered.
- Maintain awareness of high-risk areas before releases.
- Recommend targeted regression or exploratory testing based on recent changes.

# **Personal Goals**

## 2 paths, either more intermediate/senior role or a more technical role



Milan feedback

- more systemic approach to things
- raise the quality on a day-to-day basis
  - even in standup
  - good argument and investigation
- test coverage to finish line
- learning better in fundamentals
- feedback loop before things are launched
  - more initiative/pressure to developers
  - fix it if you can
  - dont stop at creating jira ticket



Katie feedback

- sharing visibility on coverage
- Then level up on this
- Katie challenge: 
  - fix small bugs
  - explore how other companies do it

