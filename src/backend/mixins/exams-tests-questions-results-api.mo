import List    "mo:core/List";
import Map     "mo:core/Map";
import Lib     "../lib/exams-tests-questions-results";
import Types   "../types/exams-tests-questions-results";

// Mixin receives all state slices it needs via parameters.
mixin (
  exams         : List.List<Types.Exam>,
  tests         : List.List<Types.TestMeta>,
  questions     : List.List<Types.Question>,
  attempts      : List.List<Types.TestAttempt>,
  progressMap   : Map.Map<(Types.UserId, Types.TestId), Types.Progress>,
  attemptCounter : { var count : Nat }
) {

  // ---------------------------------------------------------------------------
  // Query: exam catalog
  // ---------------------------------------------------------------------------

  public query func getExams() : async [Types.Exam] {
    Lib.getExams(exams)
  };

  public query func getTestsByExam(examId : Types.ExamId) : async [Types.TestMeta] {
    Lib.getTestsByExam(tests, examId)
  };

  public query func getTest(testId : Types.TestId) : async ?Types.TestMeta {
    Lib.getTest(tests, testId)
  };

  public query func getQuestions(testId : Types.TestId) : async [Types.Question] {
    Lib.getQuestions(questions, testId)
  };

  // ---------------------------------------------------------------------------
  // Query: history & progress
  // ---------------------------------------------------------------------------

  public query ({ caller }) func getUserHistory() : async [Types.TestAttempt] {
    Lib.getUserHistory(attempts, caller)
  };

  public query ({ caller }) func getProgress(testId : Types.TestId) : async ?Types.Progress {
    Lib.getProgress(progressMap, caller, testId)
  };

  // ---------------------------------------------------------------------------
  // Update: submit & save
  // ---------------------------------------------------------------------------

  public shared ({ caller }) func submitTest(
    testId    : Types.TestId,
    answers   : [?Nat],
    timeTaken : Nat
  ) : async Types.TestResult {
    Lib.submitTest(questions, attempts, attemptCounter, caller, testId, answers, timeTaken)
  };

  public shared ({ caller }) func saveProgress(
    testId  : Types.TestId,
    answers : [?Nat]
  ) : async () {
    Lib.saveProgress(progressMap, caller, testId, answers)
  };
};
