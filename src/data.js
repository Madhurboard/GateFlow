export const subjects = [
  {
    id: 'em',
    name: 'Engineering\nMathematics',
    icon: '📐',
    topics: [
      { id: 'em-1', name: 'Discrete Mathematics: Logic & Sets', subtopics: [
        { id: 'em-1-1', name: 'Propositional Logic' },
        { id: 'em-1-2', name: 'First Order Logic' },
        { id: 'em-1-3', name: 'Sets and Relations' },
        { id: 'em-1-4', name: 'Functions' },
        { id: 'em-1-5', name: 'Partial Orders and Lattices' },
      ]},
      { id: 'em-2', name: 'Discrete: Combinatorics & Graph Theory', subtopics: [
        { id: 'em-2-1', name: 'Counting and Permutations' },
        { id: 'em-2-2', name: 'Recurrence Relations' },
        { id: 'em-2-3', name: 'Generating Functions' },
        { id: 'em-2-4', name: 'Graphs and Connectivity' },
        { id: 'em-2-5', name: 'Matching and Coloring' },
      ]},
      { id: 'em-3', name: 'Linear Algebra: Matrices & Systems', subtopics: [
        { id: 'em-3-1', name: 'Matrices and Determinants' },
        { id: 'em-3-2', name: 'System of Linear Equations' },
      ]},
      { id: 'em-4', name: 'Linear Algebra: Eigenvalues & Vectors', subtopics: [
        { id: 'em-4-1', name: 'Eigenvalues and Eigenvectors' },
        { id: 'em-4-2', name: 'LU Decomposition' },
      ]},
      { id: 'em-5', name: 'Calculus: Limits, Continuity, Differentiability', subtopics: [
        { id: 'em-5-1', name: 'Limits' },
        { id: 'em-5-2', name: 'Continuity' },
        { id: 'em-5-3', name: 'Differentiability' },
      ]},
      { id: 'em-6', name: 'Calculus: Maximum, Minimum, Mean Value', subtopics: [
        { id: 'em-6-1', name: 'Maxima and Minima' },
        { id: 'em-6-2', name: 'Mean Value Theorem' },
      ]},
      { id: 'em-7', name: 'Calculus: Integration & Vector Calculus', subtopics: [
        { id: 'em-7-1', name: 'Definite Interpretations and Integrals' },
        { id: 'em-7-2', name: 'Multiple Integrals' },
        { id: 'em-7-3', name: 'Gradient, Divergence and Curl' },
      ]},
      { id: 'em-8', name: 'Probability: Random Variables & Distributions', subtopics: [
        { id: 'em-8-1', name: 'Random Variables' },
        { id: 'em-8-2', name: 'Uniform and Normal Distributions' },
        { id: 'em-8-3', name: 'Exponential and Poisson Distributions' },
        { id: 'em-8-4', name: 'Binomial Distribution' },
      ]},
      { id: 'em-9', name: 'Probability: Statistics & Bayes Theorem', subtopics: [
        { id: 'em-9-1', name: 'Mean, Median, Mode' },
        { id: 'em-9-2', name: 'Standard Deviation' },
        { id: 'em-9-3', name: 'Conditional Probability' },
        { id: 'em-9-4', name: 'Bayes Theorem' },
      ]},
    ],
  },
  {
    id: 'dl',
    name: 'Digital Logic',
    icon: '💡',
    topics: [
      { id: 'dl-1', name: 'Boolean Algebra & Minimization (K-Maps)', subtopics: [
        { id: 'dl-1-1', name: 'Boolean Algebra' },
        { id: 'dl-1-2', name: 'Logic Gates' },
        { id: 'dl-1-3', name: 'Karnaugh Map (K-Map)' },
        { id: 'dl-1-4', name: 'Quine-McCluskey Method' },
      ]},
      { id: 'dl-2', name: 'Combinational Circuits (Mux, Decoder, Adder)', subtopics: [
        { id: 'dl-2-1', name: 'Multiplexers & Demultiplexers' },
        { id: 'dl-2-2', name: 'Encoders & Decoders' },
        { id: 'dl-2-3', name: 'Half & Full Adders' },
        { id: 'dl-2-4', name: 'Subtractors' },
      ]},
      { id: 'dl-3', name: 'Sequential Circuits (Flip-Flops, Counters)', subtopics: [
        { id: 'dl-3-1', name: 'Latches & Flip-Flops (SR, JK, D, T)' },
        { id: 'dl-3-2', name: 'Synchronous Counters' },
        { id: 'dl-3-3', name: 'Asynchronous Counters' },
        { id: 'dl-3-4', name: 'Registers' },
      ]},
      { id: 'dl-4', name: 'Number Representations (Fixed & Floating Point)', subtopics: [
        { id: 'dl-4-1', name: 'Fixed Point Representation' },
        { id: 'dl-4-2', name: 'IEEE 754 Floating Point Representation' },
      ]},
      { id: 'dl-5', name: 'Data Representation & Computer Arithmetic', subtopics: [
        { id: 'dl-5-1', name: 'Base Conversions (Binary, Octal, Hex)' },
        { id: 'dl-5-2', name: "1's and 2's Complement" },
        { id: 'dl-5-3', name: 'Computer Arithmetic (Addition, Subtraction)' },
      ]},
    ],
  },
  {
    id: 'coa',
    name: 'Computer Organization',
    icon: '🔩',
    topics: [
      { id: 'coa-1', name: 'Machine Instructions & Addressing Modes', subtopics: [
        { id: 'coa-1-1', name: 'Machine Instructions' },
        { id: 'coa-1-2', name: 'Addressing Modes' },
        { id: 'coa-1-3', name: 'Instruction Formats' },
      ]},
      { id: 'coa-2', name: 'ALU, Data Path & Control Unit', subtopics: [
        { id: 'coa-2-1', name: 'Arithmetic Logic Unit (ALU)' },
        { id: 'coa-2-2', name: 'Data Path Design' },
        { id: 'coa-2-3', name: 'Hardwired Control Unit' },
        { id: 'coa-2-4', name: 'Microprogrammed Control Unit' },
      ]},
      { id: 'coa-3', name: 'Instruction Pipelining & Hazards', subtopics: [
        { id: 'coa-3-1', name: 'Pipelining Concepts' },
        { id: 'coa-3-2', name: 'Structural Hazards' },
        { id: 'coa-3-3', name: 'Data Hazards & Forwarding' },
        { id: 'coa-3-4', name: 'Control Hazards & Branch Prediction' },
      ]},
      { id: 'coa-4', name: 'Memory Hierarchy: Cache & Main Memory', subtopics: [
        { id: 'coa-4-1', name: 'Cache Memory & Principles of Locality' },
        { id: 'coa-4-2', name: 'Cache Mapping (Direct, Associative)' },
        { id: 'coa-4-3', name: 'Cache Replacement Policies' },
        { id: 'coa-4-4', name: 'Main Memory Organization' },
      ]},
      { id: 'coa-5', name: 'Secondary Storage & I/O Interface', subtopics: [
        { id: 'coa-5-1', name: 'Magnetic Disks' },
        { id: 'coa-5-2', name: 'I/O Interfaces (Interrupt & DMA)' },
      ]},
    ],
  },
  {
    id: 'pds',
    name: 'Programming & Data Structures',
    icon: '🏗️',
    topics: [
      { id: 'pds-1', name: 'Programming in C: Pointers & Memory', subtopics: [
        { id: 'pds-1-1', name: 'Variables and Data Types' },
        { id: 'pds-1-2', name: 'Control Structures and Functions' },
        { id: 'pds-1-3', name: 'Pointers' },
        { id: 'pds-1-4', name: 'Memory Allocation (malloc, calloc, free)' },
      ]},
      { id: 'pds-2', name: 'Recursion', subtopics: [
        { id: 'pds-2-1', name: 'Recursive Functions' },
        { id: 'pds-2-2', name: 'Recurrence Relations Analysis' },
      ]},
      { id: 'pds-3', name: 'Arrays, Stacks, Queues, Linked Lists', subtopics: [
        { id: 'pds-3-1', name: 'Arrays (1D and 2D)' },
        { id: 'pds-3-2', name: 'Stack Operations & Applications' },
        { id: 'pds-3-3', name: 'Queue Operations & Circular Queues' },
        { id: 'pds-3-4', name: 'Singly and Doubly Linked Lists' },
      ]},
      { id: 'pds-4', name: 'Trees: Binary Search Trees, Binary Heaps', subtopics: [
        { id: 'pds-4-1', name: 'Binary Trees & Properties' },
        { id: 'pds-4-2', name: 'Binary Search Trees (BST)' },
        { id: 'pds-4-3', name: 'Tree Traversals (Inorder, Preorder, Postorder)' },
        { id: 'pds-4-4', name: 'Binary Heaps (Min/Max Heap)' },
      ]},
      { id: 'pds-5', name: 'Graph Representations & Traversals', subtopics: [
        { id: 'pds-5-1', name: 'Adjacency List and Matrix' },
        { id: 'pds-5-2', name: 'BFS and DFS Concepts' },
      ]},
    ],
  },
  {
    id: 'algo',
    name: 'Algorithms',
    icon: '⚡',
    topics: [
      { id: 'algo-1', name: 'Asymptotic Analysis & Time Complexity', subtopics: [
        { id: 'algo-1-1', name: 'Big O, Theta, Omega Notations' },
        { id: 'algo-1-2', name: 'Space and Time Complexity' },
        { id: 'algo-1-3', name: 'Master Theorem' },
      ]},
      { id: 'algo-2', name: 'Sorting & Searching Algorithms', subtopics: [
        { id: 'algo-2-1', name: 'Linear and Binary Search' },
        { id: 'algo-2-2', name: 'Bubble, Insertion, Selection Sort' },
        { id: 'algo-2-3', name: 'Merge Sort and Quick Sort' },
        { id: 'algo-2-4', name: 'Heap Sort' },
      ]},
      { id: 'algo-3', name: 'Greedy Algorithms (MST, Huffman)', subtopics: [
        { id: 'algo-3-1', name: 'Minimum Spanning Tree (Kruskal & Prim)' },
        { id: 'algo-3-2', name: 'Huffman Coding' },
        { id: 'algo-3-3', name: 'Fractional Knapsack' },
      ]},
      { id: 'algo-4', name: 'Dynamic Programming (Knapsack, LCS)', subtopics: [
        { id: 'algo-4-1', name: '0/1 Knapsack' },
        { id: 'algo-4-2', name: 'Longest Common Subsequence (LCS)' },
        { id: 'algo-4-3', name: 'Matrix Chain Multiplication' },
      ]},
      { id: 'algo-5', name: 'Divide & Conquer', subtopics: [
        { id: 'algo-5-1', name: 'Divide and Conquer Strategy' },
        { id: 'algo-5-2', name: 'Finding Maximum and Minimum' },
      ]},
      { id: 'algo-6', name: 'Graph Algorithms (BFS, DFS, Shortest Path)', subtopics: [
        { id: 'algo-6-1', name: 'Breadth-First Search (BFS)' },
        { id: 'algo-6-2', name: 'Depth-First Search (DFS) & Topological Sort' },
        { id: 'algo-6-3', name: 'Dijkstra’s Algorithm' },
        { id: 'algo-6-4', name: 'Bellman-Ford & Floyd-Warshall Algorithms' },
      ]},
    ],
  },
  {
    id: 'toc',
    name: 'Theory of Computation',
    icon: '🔄',
    topics: [
      { id: 'toc-1', name: 'Regular Languages & Finite Automata', subtopics: [
        { id: 'toc-1-1', name: 'Deterministic Finite Automata (DFA)' },
        { id: 'toc-1-2', name: 'Non-deterministic Finite Automata (NFA)' },
        { id: 'toc-1-3', name: 'Regular Expressions' },
        { id: 'toc-1-4', name: 'Minimization of DFA' },
      ]},
      { id: 'toc-2', name: 'Context-Free Languages & Pushdown Automata', subtopics: [
        { id: 'toc-2-1', name: 'Context-Free Grammars (CFG)' },
        { id: 'toc-2-2', name: 'Pushdown Automata (PDA)' },
        { id: 'toc-2-3', name: 'Chomsky Normal Form (CNF)' },
      ]},
      { id: 'toc-3', name: 'Recursive Enumerable Sets & Turing Machines', subtopics: [
        { id: 'toc-3-1', name: 'Turing Machines' },
        { id: 'toc-3-2', name: 'Recursively Enumerable Languages' },
        { id: 'toc-3-3', name: 'Recursive Languages' },
      ]},
      { id: 'toc-4', name: 'Undecidability', subtopics: [
        { id: 'toc-4-1', name: 'Halting Problem' },
        { id: 'toc-4-2', name: "Post's Correspondence Problem (PCP)" },
        { id: 'toc-4-3', name: "Rice's Theorem" },
      ]},
      { id: 'toc-5', name: 'Pumping Lemma & Closure Properties', subtopics: [
        { id: 'toc-5-1', name: 'Pumping Lemma for Regular Languages' },
        { id: 'toc-5-2', name: 'Pumping Lemma for Context-Free Languages' },
        { id: 'toc-5-3', name: 'Closure Properties of Language Classes' },
      ]},
    ],
  },
  {
    id: 'cd',
    name: 'Compiler Design',
    icon: '🔧',
    topics: [
      { id: 'cd-1', name: 'Lexical Analysis', subtopics: [
        { id: 'cd-1-1', name: 'Role of Lexical Analyzer' },
        { id: 'cd-1-2', name: 'Tokens, Patterns, and Lexemes' },
        { id: 'cd-1-3', name: 'Lexical Errors' },
      ]},
      { id: 'cd-2', name: 'Parsing: Top-Down & Bottom-Up', subtopics: [
        { id: 'cd-2-1', name: 'Top-Down Parsing (LL(1))' },
        { id: 'cd-2-2', name: 'Bottom-Up Parsing (LR, SLR, LALR)' },
        { id: 'cd-2-3', name: 'Ambiguity in Grammars' },
      ]},
      { id: 'cd-3', name: 'Syntax-Directed Translation', subtopics: [
        { id: 'cd-3-1', name: 'Synthesized and Inherited Attributes' },
        { id: 'cd-3-2', name: 'S-Attributed and L-Attributed Definitions' },
      ]},
      { id: 'cd-4', name: 'Runtime Environments', subtopics: [
        { id: 'cd-4-1', name: 'Activation Records' },
        { id: 'cd-4-2', name: 'Parameter Passing Mechanisms' },
      ]},
      { id: 'cd-5', name: 'Intermediate Code Generation', subtopics: [
        { id: 'cd-5-1', name: 'Three-Address Code' },
        { id: 'cd-5-2', name: 'Syntax Trees and DAGs' },
      ]},
      { id: 'cd-6', name: 'Code Optimization: Local & Data Flow', subtopics: [
        { id: 'cd-6-1', name: 'Basic Blocks and Flow Graphs' },
        { id: 'cd-6-2', name: 'Local Optimization' },
        { id: 'cd-6-3', name: 'Data Flow Analysis Concepts' },
      ]},
    ],
  },
  {
    id: 'os',
    name: 'Operating Systems',
    icon: '🖥️',
    topics: [
      { id: 'os-1', name: 'Process Management: Processes & Threads', subtopics: [
        { id: 'os-1-1', name: 'Process Control Block (PCB)' },
        { id: 'os-1-2', name: 'Process States and Transitions' },
        { id: 'os-1-3', name: 'User-Level and Kernel-Level Threads' },
      ]},
      { id: 'os-2', name: 'CPU Scheduling Algorithms', subtopics: [
        { id: 'os-2-1', name: 'FCFS and SJF' },
        { id: 'os-2-2', name: 'Round Robin and Priority Scheduling' },
        { id: 'os-2-3', name: 'Multi-level Queue Scheduling' },
      ]},
      { id: 'os-3', name: 'Process Synchronization & Deadlocks', subtopics: [
        { id: 'os-3-1', name: 'Critical Section Problem' },
        { id: 'os-3-2', name: 'Semaphores and Mutexes' },
        { id: 'os-3-3', name: 'Deadlock Characterization' },
        { id: 'os-3-4', name: 'Banker’s Algorithm' },
      ]},
      { id: 'os-4', name: 'Memory Management', subtopics: [
        { id: 'os-4-1', name: 'Contiguous Memory Allocation' },
        { id: 'os-4-2', name: 'Fragmentation (Internal & External)' },
      ]},
      { id: 'os-5', name: 'Virtual Memory (Paging, Segmentation)', subtopics: [
        { id: 'os-5-1', name: 'Paging and Page Tables' },
        { id: 'os-5-2', name: 'Segmentation' },
        { id: 'os-5-3', name: 'Page Replacement Algorithms (LRU, FIFO)' },
        { id: 'os-5-4', name: 'Demand Paging and Thrashing' },
      ]},
      { id: 'os-6', name: 'File Systems', subtopics: [
        { id: 'os-6-1', name: 'File Allocation Methods' },
        { id: 'os-6-2', name: 'Directory Structure' },
      ]},
      { id: 'os-7', name: 'I/O Systems & Disk Scheduling', subtopics: [
        { id: 'os-7-1', name: 'Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)' },
        { id: 'os-7-2', name: 'I/O Hardware Concepts' },
      ]},
    ],
  },
  {
    id: 'dbms',
    name: 'Databases',
    icon: '🗄️',
    topics: [
      { id: 'dbms-1', name: 'ER Model & Relational Model', subtopics: [
        { id: 'dbms-1-1', name: 'Entity-Relationship Diagram' },
        { id: 'dbms-1-2', name: 'Relational Model Concepts' },
        { id: 'dbms-1-3', name: 'Keys (Primary, Foreign, Candidate)' },
      ]},
      { id: 'dbms-2', name: 'Relational Algebra & Tuple Calculus', subtopics: [
        { id: 'dbms-2-1', name: 'Basic Relational Algebra Operations' },
        { id: 'dbms-2-2', name: 'Extended Relational Algebra' },
        { id: 'dbms-2-3', name: 'Tuple Relational Calculus' },
      ]},
      { id: 'dbms-3', name: 'SQL (Queries, Joins, Constraints)', subtopics: [
        { id: 'dbms-3-1', name: 'DDL and DML Commands' },
        { id: 'dbms-3-2', name: 'Aggregate Functions and Grouping' },
        { id: 'dbms-3-3', name: 'Joins (Inner, Outer, Non-Equi)' },
        { id: 'dbms-3-4', name: 'Integrity Constraints' },
      ]},
      { id: 'dbms-4', name: 'Normalization (1NF to BCNF)', subtopics: [
        { id: 'dbms-4-1', name: 'Functional Dependencies' },
        { id: 'dbms-4-2', name: '1NF, 2NF, 3NF' },
        { id: 'dbms-4-3', name: 'Boyce-Codd Normal Form (BCNF)' },
      ]},
      { id: 'dbms-5', name: 'Transactions & Concurrency Control', subtopics: [
        { id: 'dbms-5-1', name: 'ACID Properties' },
        { id: 'dbms-5-2', name: 'Serializability (Conflict and View)' },
        { id: 'dbms-5-3', name: 'Lock-Based Protocols (2PL)' },
      ]},
      { id: 'dbms-6', name: 'File Organization & Indexing (B/B+ Trees)', subtopics: [
        { id: 'dbms-6-1', name: 'Primary and Secondary Indexing' },
        { id: 'dbms-6-2', name: 'B-Trees' },
        { id: 'dbms-6-3', name: 'B+ Trees' },
      ]},
    ],
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    icon: '🌐',
    topics: [
      { id: 'cn-1', name: 'OSI & TCP/IP Layering Models', subtopics: [
        { id: 'cn-1-1', name: 'OSI Reference Model' },
        { id: 'cn-1-2', name: 'TCP/IP Model' },
      ]},
      { id: 'cn-2', name: 'Data Link Layer: Framing, Error Control', subtopics: [
        { id: 'cn-2-1', name: 'Framing Techniques' },
        { id: 'cn-2-2', name: 'Error Detection (CRC, Checksum)' },
        { id: 'cn-2-3', name: 'Flow Control Methods' },
      ]},
      { id: 'cn-3', name: 'Medium Access Control (CSMA/CD, Ethernet)', subtopics: [
        { id: 'cn-3-1', name: 'ALOHA and Slotted ALOHA' },
        { id: 'cn-3-2', name: 'CSMA and CSMA/CD' },
        { id: 'cn-3-3', name: 'Ethernet Basics' },
      ]},
      { id: 'cn-4', name: 'Network Layer: Routing (Distance Vector, Link State)', subtopics: [
        { id: 'cn-4-1', name: 'Routing Protocols Overview' },
        { id: 'cn-4-2', name: 'Distance Vector Routing' },
        { id: 'cn-4-3', name: 'Link State Routing' },
      ]},
      { id: 'cn-5', name: 'IP Addressing: IPv4, CIDR, Subnetting', subtopics: [
        { id: 'cn-5-1', name: 'IPv4 Classes and Addressing' },
        { id: 'cn-5-2', name: 'Subnetting and Supernetting' },
        { id: 'cn-5-3', name: 'Classless Inter-Domain Routing (CIDR)' },
      ]},
      { id: 'cn-6', name: 'Transport Layer: TCP, UDP, Congestion Control', subtopics: [
        { id: 'cn-6-1', name: 'TCP vs UDP' },
        { id: 'cn-6-2', name: 'TCP Connection Management' },
        { id: 'cn-6-3', name: 'Congestion Control Strategies' },
      ]},
      { id: 'cn-7', name: 'Application Layer: DNS, HTTP, SMTP, FTP', subtopics: [
        { id: 'cn-7-1', name: 'Domain Name System (DNS)' },
        { id: 'cn-7-2', name: 'HyperText Transfer Protocol (HTTP)' },
        { id: 'cn-7-3', name: 'Email Protocols (SMTP, POP3, IMAP)' },
      ]},
      { id: 'cn-8', name: 'Network Security Basics', subtopics: [
        { id: 'cn-8-1', name: 'Symmetric and Asymmetric Key Cryptography' },
        { id: 'cn-8-2', name: 'RSA Algorithm' },
        { id: 'cn-8-3', name: 'Digital Signatures' },
      ]},
    ],
  },
  {
    id: 'ga',
    name: 'General Aptitude',
    icon: '🧠',
    topics: [
      { id: 'ga-1', name: 'Verbal Aptitude: Grammar & Vocabulary', subtopics: [
        { id: 'ga-1-1', name: 'English Grammar' },
        { id: 'ga-1-2', name: 'Vocabulary and Word Groups' },
      ]},
      { id: 'ga-2', name: 'Verbal Aptitude: Reading Comprehension', subtopics: [
        { id: 'ga-2-1', name: 'Reading Passages' },
        { id: 'ga-2-2', name: 'Inference and Deduction' },
      ]},
      { id: 'ga-3', name: 'Quantitative: Numerical Computation', subtopics: [
        { id: 'ga-3-1', name: 'Ratio and Proportion' },
        { id: 'ga-3-2', name: 'Percentages and Averages' },
        { id: 'ga-3-3', name: 'Time, Work and Distance' },
      ]},
      { id: 'ga-4', name: 'Quantitative: Mensuration & Geometry', subtopics: [
        { id: 'ga-4-1', name: '2D and 3D Geometry' },
        { id: 'ga-4-2', name: 'Areas and Volumes' },
      ]},
      { id: 'ga-5', name: 'Quantitative: Data Interpretation', subtopics: [
        { id: 'ga-5-1', name: 'Bar Graphs and Pie Charts' },
        { id: 'ga-5-2', name: 'Data Tables' },
      ]},
      { id: 'ga-6', name: 'Analytical Aptitude: Logic & Patterns', subtopics: [
        { id: 'ga-6-1', name: 'Logical Reasoning' },
        { id: 'ga-6-2', name: 'Number and Letter Series' },
      ]},
      { id: 'ga-7', name: 'Spatial Aptitude', subtopics: [
        { id: 'ga-7-1', name: 'Paper Folding and Cutting' },
        { id: 'ga-7-2', name: 'Patterns in 2D and 3D' },
      ]},
    ],
  },
];
