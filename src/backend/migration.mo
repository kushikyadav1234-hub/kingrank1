// Migration module: drops all stable variables from the old test/quiz system.
// Old type shapes are inlined here (copied from .old/src/backend/).
// The migration consumes them and produces no new fields — they are simply
// discarded.  Any data they held is intentionally lost.
import Map "mo:core/Map";

module {

  // ---------------------------------------------------------------------------
  // Old type definitions (inlined from .old/src/backend/types/)
  // ---------------------------------------------------------------------------

  // common.mo — note IDs are Nat in the old version
  type OldUserId    = Principal;
  type OldTimestamp = Int;
  type OldExamId    = Nat;
  type OldTestId    = Nat;
  type OldQuestionId = Nat;
  type OldAttemptId = Nat;

  // Exam category variant
  type OldExamCategory = {
    #SSC; #Railway; #SBI_Clerk; #UPP; #UPSI;
    #Civil_Services; #Banking; #Defence; #Other : Text;
  };

  type OldExam = {
    id          : OldExamId;
    name        : Text;
    category    : OldExamCategory;
    description : Text;
  };

  type OldDifficulty = { #Easy; #Medium; #Hard };

  type OldTestMeta = {
    id            : OldTestId;
    examId        : OldExamId;
    name          : Text;
    durationMins  : Nat;
    questionCount : Nat;
    difficulty    : OldDifficulty;
  };

  type OldQuestion = {
    id           : OldQuestionId;
    testId       : OldTestId;
    text         : Text;
    options      : [Text];
    correctIndex : Nat;
    explanation  : ?Text;
  };

  type OldProgress = {
    userId  : OldUserId;
    testId  : OldTestId;
    answers : [?Nat];
    savedAt : OldTimestamp;
  };

  type OldTestAttempt = {
    id          : OldAttemptId;
    userId      : OldUserId;
    testId      : OldTestId;
    answers     : [?Nat];
    score       : Nat;
    totalQ      : Nat;
    timeTaken   : Nat;
    submittedAt : OldTimestamp;
  };

  // mo:core/List internal block structure  (blockIndex / blocks / elementIndex)
  type OldListInternal<T> = {
    var blockIndex   : Nat;
    var blocks       : [var [var ?T]];
    var elementIndex : Nat;
  };

  // ---------------------------------------------------------------------------
  // Migration input / output types
  // ---------------------------------------------------------------------------

  public type OldActor = {
    attemptCounter : { var count : Nat };
    attempts       : OldListInternal<OldTestAttempt>;
    exams          : OldListInternal<OldExam>;
    progressMap    : Map.Map<(OldUserId, OldTestId), OldProgress>;
    questions      : OldListInternal<OldQuestion>;
    tests          : OldListInternal<OldTestMeta>;
  };

  // New actor has no legacy fields — all are dropped.
  public type NewActor = {};

  // ---------------------------------------------------------------------------
  // Migration function — consume and discard all old fields
  // ---------------------------------------------------------------------------

  public func run(_old : OldActor) : NewActor { {} };
};
