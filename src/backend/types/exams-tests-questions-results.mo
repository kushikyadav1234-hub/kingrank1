import Common "common";

module {
  public type ExamId = Common.ExamId;
  public type TestId = Common.TestId;
  public type QuestionId = Common.QuestionId;
  public type AttemptId = Common.AttemptId;
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // ---------------------------------------------------------------------------
  // Exam catalog
  // ---------------------------------------------------------------------------
  public type ExamCategory = {
    #SSC;
    #Railway;         // covers RRB Group D, NTPC sub-categories
    #SBI_Clerk;
    #UPP;
    #UPSI;
    #Civil_Services;  // UPSC, BPSC, UPPCS, MPPSC, JPSC, UKPSC
    #Banking;         // SBI PO, IBPS PO, SBI Clerk, IBPS Clerk, RRB Office/Assistant
    #Defence;         // NDA, CDS, Army GD
    #Other : Text;    // extensibility for future exams
  };

  public type Exam = {
    id         : ExamId;
    name       : Text;
    category   : ExamCategory;
    description: Text;
  };

  // ---------------------------------------------------------------------------
  // Test metadata
  // ---------------------------------------------------------------------------
  public type Difficulty = { #Easy; #Medium; #Hard };

  public type TestMeta = {
    id            : TestId;
    examId        : ExamId;
    name          : Text;
    durationMins  : Nat;   // countdown timer duration
    questionCount : Nat;
    difficulty    : Difficulty;
  };

  // ---------------------------------------------------------------------------
  // Questions
  // ---------------------------------------------------------------------------

  // Option index: 0 = A, 1 = B, 2 = C, 3 = D
  public type Question = {
    id          : QuestionId;
    testId      : TestId;
    text        : Text;
    options     : [Text];       // exactly 4 elements
    correctIndex: Nat;          // 0–3
    explanation : ?Text;
  };

  // ---------------------------------------------------------------------------
  // Test attempts & results
  // ---------------------------------------------------------------------------

  // Saved in-progress answers (before submission)
  public type Progress = {
    userId   : UserId;
    testId   : TestId;
    answers  : [?Nat];   // one slot per question; null = unanswered
    savedAt  : Timestamp;
  };

  // Submitted attempt result
  public type TestAttempt = {
    id          : AttemptId;
    userId      : UserId;
    testId      : TestId;
    answers     : [?Nat];  // final submitted answers; null = skipped
    score       : Nat;     // number of correct answers
    totalQ      : Nat;     // total questions in test
    timeTaken   : Nat;     // seconds taken
    submittedAt : Timestamp;
  };

  // Lightweight result summary returned to the caller on submit
  public type TestResult = {
    attemptId  : AttemptId;
    score      : Nat;
    totalQ     : Nat;
    percentage : Float;
    timeTaken  : Nat;
  };
};
