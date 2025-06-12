graph TD
    %% Order Origination & Submission
    A[PM/Trader Order Origination] --> B[Order Submission via API]
    B --> C{Regulatory Gateway & Pre-Trade Checks}

    %% Validation & Intent Paths
    C -->|Valid Order| D[Intent Classification Engine]
    C -->|Invalid/Rejected| Z1[Rejection / Error (Audit Log)]

    %% Intent Processing Core
    subgraph Intent_Processing ["Intent Processing & Matching (AlcyoneX Core)"]
        D --> E[Universal Intent Expression Model]
        E --> F[Intent Scoring & Parameters]
        F --> G{Routing Decision Engine}
        G -->|Intent-Based Matching Path| H[Intent-Based Matching System (IBMS)]
        H --> I[Adaptive Cohort Formation]
        I --> J[Temporal Micro-Auction]
        J --> K[Execution/Fill (IBMS)]
        G -->|CLOB Path| L[Continuous Limit Order Book (CLOB)]
        L --> M[Price-Time Matching]
        M --> N[Execution/Fill (CLOB)]
    end

    %% Compliance & Audit
    subgraph Compliance_Framework ["Regulatory & Audit"]
        C
        O[Immutable Audit Layer]
        P[Post-Trade Reporting]
        Z1
    end

    %% Data & Analytics
    subgraph Data_Analytics ["Data & Analytics"]
        Q[Performance Analytics]
        R[Execution Metrics]
        S[Feedback Data]
        T[ML Framework]
        U[Algorithm Updates]
        V[Routing Updates]
        Z2[Data Storage]
    end

    %% Post-Execution Flow
    K --> O
    N --> O
    O --> P
    O --> Q
    O --> Z2

    %% Feedback Loops
    Q --> R --> S
    S --> T --> U & V
    U -.-> F
    V -.-> G
    S -.-> D

    %% Styling (Optional)
    classDef regulatory fill:#f9f2ff,stroke:#7a1f9d
    classDef core fill:#e6f3ff,stroke:#0066cc
    classDef analytics fill:#e8f7ec,stroke:#2e7d32
    classDef external fill:#fff,stroke:#666

    class Compliance_Framework regulatory
    class Intent_Processing core
    class Data_Analytics analytics
    class A,B external
