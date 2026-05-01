import List  "mo:core/List";
import Map   "mo:core/Map";
import Time  "mo:core/Time";
import Types "../types/exams-tests-questions-results";

module {

  // ---------------------------------------------------------------------------
  // Tuple compare helper for (UserId, TestId) keys
  // ---------------------------------------------------------------------------

  func compareKey(
    a : (Types.UserId, Types.TestId),
    b : (Types.UserId, Types.TestId)
  ) : { #less; #equal; #greater } {
    let cmpPrincipal = a.0.compare(b.0);
    if (not cmpPrincipal.isEqual()) { cmpPrincipal }
    else {
      if      (a.1 < b.1) #less
      else if (a.1 > b.1) #greater
      else                 #equal
    }
  };

  // ---------------------------------------------------------------------------
  // Exam helpers
  // ---------------------------------------------------------------------------

  public func getExams(
    exams : List.List<Types.Exam>
  ) : [Types.Exam] {
    exams.toArray()
  };

  public func getExam(
    exams  : List.List<Types.Exam>,
    examId : Types.ExamId
  ) : ?Types.Exam {
    exams.find(func(e) { e.id == examId })
  };

  // ---------------------------------------------------------------------------
  // Test helpers
  // ---------------------------------------------------------------------------

  public func getTestsByExam(
    tests  : List.List<Types.TestMeta>,
    examId : Types.ExamId
  ) : [Types.TestMeta] {
    tests.filter(func(t) { t.examId == examId }).toArray()
  };

  public func getTest(
    tests  : List.List<Types.TestMeta>,
    testId : Types.TestId
  ) : ?Types.TestMeta {
    tests.find(func(t) { t.id == testId })
  };

  // ---------------------------------------------------------------------------
  // Question helpers
  // ---------------------------------------------------------------------------

  public func getQuestions(
    questions : List.List<Types.Question>,
    testId    : Types.TestId
  ) : [Types.Question] {
    questions.filter(func(q) { q.testId == testId }).toArray()
  };

  // ---------------------------------------------------------------------------
  // Progress helpers
  // ---------------------------------------------------------------------------

  public func saveProgress(
    progressMap : Map.Map<(Types.UserId, Types.TestId), Types.Progress>,
    userId      : Types.UserId,
    testId      : Types.TestId,
    answers     : [?Nat]
  ) {
    let progress : Types.Progress = {
      userId;
      testId;
      answers;
      savedAt = Time.now();
    };
    progressMap.add(compareKey, (userId, testId), progress);
  };

  public func getProgress(
    progressMap : Map.Map<(Types.UserId, Types.TestId), Types.Progress>,
    userId      : Types.UserId,
    testId      : Types.TestId
  ) : ?Types.Progress {
    progressMap.get(compareKey, (userId, testId))
  };

  // ---------------------------------------------------------------------------
  // Submission helpers
  // ---------------------------------------------------------------------------

  public func submitTest(
    questions     : List.List<Types.Question>,
    attempts      : List.List<Types.TestAttempt>,
    idCounter     : { var count : Nat },
    userId        : Types.UserId,
    testId        : Types.TestId,
    answers       : [?Nat],
    timeTaken     : Nat
  ) : Types.TestResult {
    let testQuestions = questions.filter(func(q) { q.testId == testId }).toArray();
    let totalQ = testQuestions.size();

    var score : Nat = 0;
    var i : Nat = 0;
    while (i < totalQ and i < answers.size()) {
      switch (answers[i]) {
        case (?ans) {
          if (ans == testQuestions[i].correctIndex) {
            score += 1;
          };
        };
        case null {};
      };
      i += 1;
    };

    let percentage : Float =
      if (totalQ == 0) 0.0
      else score.toFloat() / totalQ.toFloat() * 100.0;

    let attemptId = idCounter.count;
    idCounter.count += 1;

    let attempt : Types.TestAttempt = {
      id          = attemptId;
      userId;
      testId;
      answers;
      score;
      totalQ;
      timeTaken;
      submittedAt = Time.now();
    };
    attempts.add(attempt);

    {
      attemptId;
      score;
      totalQ;
      percentage;
      timeTaken;
    }
  };

  // ---------------------------------------------------------------------------
  // History helpers
  // ---------------------------------------------------------------------------

  public func getUserHistory(
    attempts : List.List<Types.TestAttempt>,
    userId   : Types.UserId
  ) : [Types.TestAttempt] {
    attempts.filter(func(a) { a.userId == userId }).toArray()
  };

  // ---------------------------------------------------------------------------
  // Seed data — called once at actor initialisation
  // ---------------------------------------------------------------------------

  public func seedExams() : [Types.Exam] {
    [
      // SSC exams (ids 0–7)
      { id =  0; name = "SSC MTS";                  category = #SSC;            description = "SSC Multi Tasking Staff — recruitment for non-technical Group-C posts across government departments" },
      { id =  1; name = "SSC CHSL";                 category = #SSC;            description = "SSC Combined Higher Secondary Level — recruitment for LDC, JSA, PA, SA and DEO posts" },
      { id =  2; name = "SSC CGL";                  category = #SSC;            description = "SSC Combined Graduate Level — recruitment for Group-B and Group-C posts in central government" },
      { id =  3; name = "SSC GD";                   category = #SSC;            description = "SSC General Duty Constable — recruitment for constables in BSF, CISF, CRPF, SSB, ITBP and other forces" },
      { id =  4; name = "SSC Selection Post";       category = #SSC;            description = "SSC Selection Post — recruitment across Matriculation, Higher Secondary, and Graduate level posts" },
      { id =  5; name = "SSC Stenographer";         category = #SSC;            description = "SSC Stenographer — recruitment for Stenographer Grade C and D posts in government departments" },
      { id =  6; name = "SSC JE";                   category = #SSC;            description = "SSC Junior Engineer — recruitment for civil, electrical, and mechanical engineering posts in government" },
      { id =  7; name = "SSC CPO";                  category = #SSC;            description = "SSC Central Police Organisations — recruitment for Sub-Inspector posts in Delhi Police, BSF, CISF, CRPF and SSB" },
      // Railway exams (ids 8–9)
      { id =  8; name = "RRB Group D";              category = #Railway;        description = "Railway Recruitment Board Group D Exam" },
      { id =  9; name = "RRB NTPC";                 category = #Railway;        description = "Railway Recruitment Board Non-Technical Popular Categories" },
      // Banking/SBI Clerk (id 10)
      { id = 10; name = "SBI Clerk";                category = #SBI_Clerk;      description = "State Bank of India Junior Associate Exam" },
      // UP Police exams (ids 11–12)
      { id = 11; name = "UP Police Constable";      category = #UPP;            description = "Uttar Pradesh Police Constable Recruitment" },
      { id = 12; name = "UPSI";                     category = #UPSI;           description = "Uttar Pradesh Sub Inspector Recruitment" },
      // Civil Services exams (ids 13–19)
      { id = 13; name = "UPSC Civil Services";      category = #Civil_Services; description = "Union Public Service Commission Civil Services Exam — IAS, IPS, IFS and other Group A & B services" },
      { id = 14; name = "UPSC CAPF";                category = #Civil_Services; description = "UPSC Central Armed Police Forces — recruitment for Assistant Commandant posts" },
      { id = 15; name = "BPSC";                     category = #Civil_Services; description = "Bihar Public Service Commission — state-level civil services exam for Group A & B posts" },
      { id = 16; name = "UPPCS";                    category = #Civil_Services; description = "Uttar Pradesh Public Service Commission — state-level civil services exam" },
      { id = 17; name = "MPPSC";                    category = #Civil_Services; description = "Madhya Pradesh Public Service Commission — state-level civil services exam" },
      { id = 18; name = "JPSC";                     category = #Civil_Services; description = "Jharkhand Public Service Commission — state-level civil services exam" },
      { id = 19; name = "UKPSC";                    category = #Civil_Services; description = "Uttarakhand Public Service Commission — state-level civil services exam" },
      // Banking exams (ids 20–25)
      { id = 20; name = "SBI PO";                   category = #Banking;        description = "State Bank of India Probationary Officer — recruitment for PO posts" },
      { id = 21; name = "IBPS PO";                  category = #Banking;        description = "Institute of Banking Personnel Selection Probationary Officer exam" },
      { id = 22; name = "IBPS Clerk";               category = #Banking;        description = "IBPS Clerk — recruitment for clerical cadre posts in public sector banks" },
      { id = 23; name = "RRB Office Assistant";     category = #Banking;        description = "RRB Office Assistant (Multipurpose) — clerical cadre in Regional Rural Banks" },
      { id = 24; name = "RRB Assistant";            category = #Banking;        description = "RRB Assistant (Scale I Officer) — officer cadre in Regional Rural Banks" },
      { id = 25; name = "IBPS RRB Office Asst";    category = #Banking;        description = "IBPS RRB Office Assistant Multipurpose Recruitment" },
      // Defence exams (ids 26–28)
      { id = 26; name = "NDA";                      category = #Defence;        description = "National Defence Academy — exam for entry into Army, Navy and Air Force wings" },
      { id = 27; name = "CDS";                      category = #Defence;        description = "Combined Defence Services — entry into IMA, INA, AFA and OTA" },
      { id = 28; name = "Army GD";                  category = #Defence;        description = "Indian Army General Duty Soldier — recruitment for Agniveer/Soldier GD posts" },
    ]
  };

  public func seedTests() : [Types.TestMeta] {
    [
      // SSC MTS (examId=0)
      { id =  0; examId =  0; name = "SSC MTS Mock Test 1";                 durationMins = 90;  questionCount = 10; difficulty = #Easy   },
      { id =  1; examId =  0; name = "SSC MTS Mock Test 2";                 durationMins = 90;  questionCount = 10; difficulty = #Medium },
      // SSC CHSL (examId=1)
      { id =  2; examId =  1; name = "SSC CHSL Mock Test 1";                durationMins = 60;  questionCount = 10; difficulty = #Easy   },
      { id =  3; examId =  1; name = "SSC CHSL Mock Test 2";                durationMins = 60;  questionCount = 10; difficulty = #Medium },
      // SSC CGL (examId=2)
      { id =  4; examId =  2; name = "SSC CGL Mock Test 1";                 durationMins = 60;  questionCount = 10; difficulty = #Medium },
      { id =  5; examId =  2; name = "SSC CGL Mock Test 2";                 durationMins = 60;  questionCount = 10; difficulty = #Hard   },
      // SSC GD (examId=3)
      { id =  6; examId =  3; name = "SSC GD Mock Test 1";                  durationMins = 90;  questionCount = 10; difficulty = #Easy   },
      { id =  7; examId =  3; name = "SSC GD Mock Test 2";                  durationMins = 90;  questionCount = 10; difficulty = #Medium },
      // SSC Selection Post (examId=4)
      { id =  8; examId =  4; name = "SSC Selection Post Mock Test 1";      durationMins = 60;  questionCount = 10; difficulty = #Easy   },
      { id =  9; examId =  4; name = "SSC Selection Post Mock Test 2";      durationMins = 60;  questionCount = 10; difficulty = #Medium },
      // SSC Stenographer (examId=5)
      { id = 10; examId =  5; name = "SSC Stenographer Mock Test 1";        durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 11; examId =  5; name = "SSC Stenographer Mock Test 2";        durationMins = 120; questionCount = 10; difficulty = #Hard   },
      // SSC JE (examId=6)
      { id = 12; examId =  6; name = "SSC JE Mock Test 1";                  durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 13; examId =  6; name = "SSC JE Mock Test 2";                  durationMins = 120; questionCount = 10; difficulty = #Hard   },
      // SSC CPO (examId=7)
      { id = 14; examId =  7; name = "SSC CPO Mock Test 1";                 durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 15; examId =  7; name = "SSC CPO Mock Test 2";                 durationMins = 120; questionCount = 10; difficulty = #Hard   },
      // RRB Group D (examId=8)
      { id = 16; examId =  8; name = "RRB Group D Mock Test 1";             durationMins = 90;  questionCount = 15; difficulty = #Medium },
      { id = 17; examId =  8; name = "RRB Group D Mock Test 2";             durationMins = 90;  questionCount = 10; difficulty = #Hard   },
      // RRB NTPC (examId=9)
      { id = 18; examId =  9; name = "RRB NTPC Mock Test 1";                durationMins = 90;  questionCount = 10; difficulty = #Medium },
      { id = 19; examId =  9; name = "RRB NTPC Mock Test 2";                durationMins = 90;  questionCount = 10; difficulty = #Easy   },
      // SBI Clerk (examId=10)
      { id = 20; examId = 10; name = "SBI Clerk Prelims Mock 1";            durationMins = 60;  questionCount = 10; difficulty = #Easy   },
      { id = 21; examId = 10; name = "SBI Clerk Prelims Mock 2";            durationMins = 60;  questionCount = 10; difficulty = #Medium },
      // UP Police (examId=11)
      { id = 22; examId = 11; name = "UP Police Mock Test 1";               durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 23; examId = 11; name = "UP Police Mock Test 2";               durationMins = 120; questionCount = 10; difficulty = #Hard   },
      // UPSI (examId=12)
      { id = 24; examId = 12; name = "UPSI Mock Test 1";                    durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 25; examId = 12; name = "UPSI Mock Test 2";                    durationMins = 120; questionCount = 10; difficulty = #Hard   },
      // Civil Services — one test per exam (examIds 13–19)
      { id = 26; examId = 13; name = "UPSC Civil Services Prelim Mock 1";   durationMins = 120; questionCount = 10; difficulty = #Hard   },
      { id = 27; examId = 14; name = "UPSC CAPF Mock Test 1";               durationMins = 120; questionCount = 10; difficulty = #Hard   },
      { id = 28; examId = 15; name = "BPSC Mock Test 1";                    durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 29; examId = 16; name = "UPPCS Mock Test 1";                   durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 30; examId = 17; name = "MPPSC Mock Test 1";                   durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 31; examId = 18; name = "JPSC Mock Test 1";                    durationMins = 120; questionCount = 10; difficulty = #Medium },
      { id = 32; examId = 19; name = "UKPSC Mock Test 1";                   durationMins = 120; questionCount = 10; difficulty = #Medium },
      // Banking — one test per exam (examIds 20–25)
      { id = 33; examId = 20; name = "SBI PO Prelims Mock 1";               durationMins = 60;  questionCount = 10; difficulty = #Medium },
      { id = 34; examId = 21; name = "IBPS PO Prelims Mock 1";              durationMins = 60;  questionCount = 10; difficulty = #Medium },
      { id = 35; examId = 22; name = "IBPS Clerk Prelims Mock 1";           durationMins = 60;  questionCount = 10; difficulty = #Easy   },
      { id = 36; examId = 23; name = "RRB Office Assistant Mock 1";         durationMins = 45;  questionCount = 10; difficulty = #Easy   },
      { id = 37; examId = 24; name = "RRB Assistant Mock 1";                durationMins = 45;  questionCount = 10; difficulty = #Medium },
      { id = 38; examId = 25; name = "IBPS RRB Office Asst Mock 1";        durationMins = 45;  questionCount = 10; difficulty = #Easy   },
      // Defence — one test per exam (examIds 26–28)
      { id = 39; examId = 26; name = "NDA Mock Test 1";                     durationMins = 150; questionCount = 10; difficulty = #Hard   },
      { id = 40; examId = 27; name = "CDS Mock Test 1";                     durationMins = 120; questionCount = 10; difficulty = #Hard   },
      { id = 41; examId = 28; name = "Army GD Mock Test 1";                 durationMins = 60;  questionCount = 10; difficulty = #Medium },
    ]
  };

  public func seedQuestions() : [Types.Question] {
    // testId=4: SSC CGL Mock Test 1 — General Awareness
    let t0 : [Types.Question] = [
      { id =  0; testId = 4; text = "Who is the author of the Indian Constitution?"; options = ["B.R. Ambedkar", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"]; correctIndex = 0; explanation = ?"Dr. B.R. Ambedkar is widely regarded as the principal architect of the Indian Constitution." },
      { id =  1; testId = 4; text = "Which planet is known as the Red Planet?"; options = ["Venus", "Mars", "Jupiter", "Saturn"]; correctIndex = 1; explanation = ?"Mars appears red because of iron oxide (rust) on its surface." },
      { id =  2; testId = 4; text = "What is the capital of India?"; options = ["Mumbai", "Kolkata", "New Delhi", "Chennai"]; correctIndex = 2; explanation = ?"New Delhi is the capital city of India." },
      { id =  3; testId = 4; text = "Which is the longest river in India?"; options = ["Yamuna", "Brahmaputra", "Godavari", "Ganga"]; correctIndex = 3; explanation = ?"The Ganga (Ganges) is the longest river in India." },
      { id =  4; testId = 4; text = "What is the chemical symbol of Gold?"; options = ["Go", "Gd", "Au", "Ag"]; correctIndex = 2; explanation = ?"Au comes from the Latin word Aurum meaning gold." },
      { id =  5; testId = 4; text = "The Quit India Movement was launched in which year?"; options = ["1920", "1930", "1942", "1947"]; correctIndex = 2; explanation = ?"The Quit India Movement was launched by Mahatma Gandhi on 8 August 1942." },
      { id =  6; testId = 4; text = "Which is the smallest continent?"; options = ["Europe", "Australia", "Antarctica", "South America"]; correctIndex = 1; explanation = ?"Australia is the smallest continent by land area." },
      { id =  7; testId = 4; text = "In which year did India gain independence?"; options = ["1945", "1946", "1947", "1950"]; correctIndex = 2; explanation = ?"India gained independence on 15 August 1947." },
      { id =  8; testId = 4; text = "Which gas is most abundant in the atmosphere?"; options = ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"]; correctIndex = 2; explanation = ?"Nitrogen makes up about 78% of Earth's atmosphere." },
      { id =  9; testId = 4; text = "The speed of light is approximately?"; options = ["3x10^6 m/s", "3x10^8 m/s", "3x10^10 m/s", "3x10^4 m/s"]; correctIndex = 1; explanation = ?"Speed of light is approximately 3x10^8 metres per second." },
    ];
    // testId=5: SSC CGL Mock Test 2 — Quantitative Aptitude
    let t1 : [Types.Question] = [
      { id = 10; testId = 5; text = "If 3x + 5 = 20, what is x?"; options = ["3", "4", "5", "6"]; correctIndex = 2; explanation = ?"3x = 15, so x = 5." },
      { id = 11; testId = 5; text = "What is the LCM of 12 and 18?"; options = ["24", "36", "48", "72"]; correctIndex = 1; explanation = ?"LCM of 12 and 18 is 36." },
      { id = 12; testId = 5; text = "A train travels 300 km in 5 hours. What is its speed?"; options = ["50 km/h", "60 km/h", "70 km/h", "75 km/h"]; correctIndex = 1; explanation = ?"Speed = Distance / Time = 300 / 5 = 60 km/h." },
      { id = 13; testId = 5; text = "What is 15% of 200?"; options = ["20", "25", "30", "35"]; correctIndex = 2; explanation = ?"15% of 200 = (15/100) * 200 = 30." },
      { id = 14; testId = 5; text = "The HCF of 24 and 36 is?"; options = ["6", "8", "12", "18"]; correctIndex = 2; explanation = ?"HCF of 24 and 36 = 12." },
      { id = 15; testId = 5; text = "A number divided by 6 leaves remainder 3. Remainder when divided by 3?"; options = ["0", "1", "2", "3"]; correctIndex = 0; explanation = ?"6k+3 = 3(2k+1), remainder when divided by 3 is 0." },
      { id = 16; testId = 5; text = "Area of a circle with radius 7 cm (use pi=22/7)?"; options = ["44 cm2", "154 cm2", "132 cm2", "176 cm2"]; correctIndex = 1; explanation = ?"Area = pi * r^2 = (22/7) * 49 = 154 cm2." },
      { id = 17; testId = 5; text = "Shopkeeper buys for Rs.200, sells for Rs.250. Profit %?"; options = ["20%", "25%", "30%", "50%"]; correctIndex = 1; explanation = ?"Profit% = (50/200)*100 = 25%." },
      { id = 18; testId = 5; text = "Simplify: 4 + 5 x 2 - 3"; options = ["9", "10", "11", "15"]; correctIndex = 2; explanation = ?"BODMAS: 4 + 10 - 3 = 11." },
      { id = 19; testId = 5; text = "Numbers in ratio 3:5; sum is 40. Find the larger number."; options = ["15", "20", "25", "30"]; correctIndex = 2; explanation = ?"Larger = (5/8)*40 = 25." },
    ];
    // testId=16: RRB Group D Mock Test 1 — General Science, Maths, Reasoning, GK (15 questions)
    let t4 : [Types.Question] = [
      { id = 20; testId = 16; text = "Which device converts AC to DC?"; options = ["Transformer", "Rectifier", "Amplifier", "Oscillator"]; correctIndex = 1; explanation = ?"A rectifier converts alternating current (AC) to direct current (DC)." },
      { id = 21; testId = 16; text = "The SI unit of electric current is?"; options = ["Volt", "Watt", "Ampere", "Ohm"]; correctIndex = 2; explanation = ?"Ampere (A) is the SI unit of electric current." },
      { id = 22; testId = 16; text = "Which metal is liquid at room temperature?"; options = ["Gallium", "Mercury", "Cesium", "Francium"]; correctIndex = 1; explanation = ?"Mercury is the only metal that is liquid at standard room temperature." },
      { id = 23; testId = 16; text = "What is the atomic number of Carbon?"; options = ["4", "6", "8", "12"]; correctIndex = 1; explanation = ?"Carbon has atomic number 6." },
      { id = 24; testId = 16; text = "What disease is caused by deficiency of Vitamin C?"; options = ["Rickets", "Scurvy", "Beriberi", "Night Blindness"]; correctIndex = 1; explanation = ?"Vitamin C deficiency causes Scurvy." },
      { id = 25; testId = 16; text = "The pH of pure water is?"; options = ["5", "6", "7", "8"]; correctIndex = 2; explanation = ?"Pure water has a neutral pH of 7." },
      { id = 26; testId = 16; text = "Which organelle is the powerhouse of the cell?"; options = ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"]; correctIndex = 2; explanation = ?"Mitochondria produce ATP and are called the powerhouse of the cell." },
      { id = 27; testId = 16; text = "Sound cannot travel through?"; options = ["Water", "Steel", "Vacuum", "Air"]; correctIndex = 2; explanation = ?"Sound requires a medium to travel; it cannot travel through a vacuum." },
      { id = 28; testId = 16; text = "Which law states: Force = Mass x Acceleration?"; options = ["Newton First Law", "Newton Second Law", "Newton Third Law", "Hooke Law"]; correctIndex = 1; explanation = ?"Newton's Second Law: F = ma." },
      { id = 29; testId = 16; text = "The chemical formula of water is?"; options = ["HO", "H2O", "H2O2", "HO2"]; correctIndex = 1; explanation = ?"Water is H2O — two hydrogen atoms and one oxygen atom." },
      { id = 30; testId = 16; text = "If a train travels 360 km in 4 hours, what is its speed?"; options = ["80 km/h", "90 km/h", "100 km/h", "120 km/h"]; correctIndex = 1; explanation = ?"Speed = 360 / 4 = 90 km/h." },
      { id = 31; testId = 16; text = "Find the next number in the series: 2, 6, 12, 20, 30, ?"; options = ["36", "40", "42", "44"]; correctIndex = 2; explanation = ?"Differences are 4, 6, 8, 10, 12; so next = 30 + 12 = 42." },
      { id = 32; testId = 16; text = "Who is the father of the Indian Constitution?"; options = ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"]; correctIndex = 3; explanation = ?"Dr. B.R. Ambedkar chaired the Drafting Committee and is called the father of the Indian Constitution." },
      { id = 33; testId = 16; text = "Which is the largest planet in the solar system?"; options = ["Saturn", "Uranus", "Jupiter", "Neptune"]; correctIndex = 2; explanation = ?"Jupiter is the largest planet in our solar system." },
      { id = 34; testId = 16; text = "What is the boiling point of water at sea level?"; options = ["90 degrees C", "95 degrees C", "100 degrees C", "105 degrees C"]; correctIndex = 2; explanation = ?"Water boils at 100 degrees Celsius (212 degrees F) at standard atmospheric pressure." },
      { id = 35; testId = 16; text = "Which is the fastest land animal?"; options = ["Lion", "Horse", "Cheetah", "Leopard"]; correctIndex = 2; explanation = ?"The cheetah is the fastest land animal, reaching speeds up to 120 km/h." },
    ];
    // testId=20: SBI Clerk Prelims Mock 1 — English
    let t8 : [Types.Question] = [
      { id = 36; testId = 20; text = "Choose the synonym of Eloquent?"; options = ["Silent", "Articulate", "Dull", "Timid"]; correctIndex = 1; explanation = ?"Eloquent means well-spoken; articulate is its synonym." },
      { id = 37; testId = 20; text = "Choose the antonym of Abundant?"; options = ["Plentiful", "Sufficient", "Scarce", "Numerous"]; correctIndex = 2; explanation = ?"Abundant means plentiful; its antonym is scarce." },
      { id = 38; testId = 20; text = "Fill in the blank: She ___ been working for six hours."; options = ["has", "have", "had", "is"]; correctIndex = 0; explanation = ?"She has been working — present perfect continuous, third person singular." },
      { id = 39; testId = 20; text = "Identify the correct sentence:"; options = ["He don't know.", "He doesn't knows.", "He doesn't know.", "He not knowing."]; correctIndex = 2; explanation = ?"Correct usage: He doesn't know." },
      { id = 40; testId = 20; text = "The idiom Break the ice means?"; options = ["To break something", "To start a conversation", "To cause problems", "To fail an exam"]; correctIndex = 1; explanation = ?"Break the ice means to do or say something to relieve tension and start a conversation." },
      { id = 41; testId = 20; text = "Choose the correctly spelled word:"; options = ["Accomodation", "Acommodation", "Accommodation", "Accomodaation"]; correctIndex = 2; explanation = ?"The correct spelling is Accommodation with two c's and two m's." },
      { id = 42; testId = 20; text = "Which part of speech is the word quickly?"; options = ["Adjective", "Noun", "Adverb", "Verb"]; correctIndex = 2; explanation = ?"Quickly is an adverb as it modifies a verb." },
      { id = 43; testId = 20; text = "Passive voice of She writes a letter is?"; options = ["A letter is written by her.", "A letter was written by her.", "A letter has been written by her.", "A letter will be written by her."]; correctIndex = 0; explanation = ?"Present simple active to passive: A letter is written by her." },
      { id = 44; testId = 20; text = "Choose the correct preposition: He is good ___ mathematics."; options = ["in", "at", "on", "for"]; correctIndex = 1; explanation = ?"Good at is the correct prepositional phrase." },
      { id = 45; testId = 20; text = "A group of lions is called a?"; options = ["Pack", "Herd", "Pride", "Flock"]; correctIndex = 2; explanation = ?"A group of lions is called a pride." },
    ];
    // testId=26: UPSC Civil Services Prelim Mock 1 — Polity, History, Geography, Economics (10 questions)
    let t_civil : [Types.Question] = [
      { id = 46; testId = 26; text = "The Constitution of India came into force on?"; options = ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1950"]; correctIndex = 1; explanation = ?"The Constitution of India came into force on 26 January 1950, observed as Republic Day." },
      { id = 47; testId = 26; text = "Which article of the Indian Constitution abolishes untouchability?"; options = ["Article 14", "Article 15", "Article 17", "Article 21"]; correctIndex = 2; explanation = ?"Article 17 of the Indian Constitution abolishes untouchability." },
      { id = 48; testId = 26; text = "The Battle of Plassey was fought in the year?"; options = ["1757", "1764", "1857", "1799"]; correctIndex = 0; explanation = ?"The Battle of Plassey was fought in 1757 between the British East India Company and Siraj ud-Daulah." },
      { id = 49; testId = 26; text = "The Tropic of Cancer passes through how many Indian states?"; options = ["6", "7", "8", "9"]; correctIndex = 2; explanation = ?"The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram." },
      { id = 50; testId = 26; text = "Which Five Year Plan adopted the objective of Garibi Hatao?"; options = ["Third Plan", "Fourth Plan", "Fifth Plan", "Sixth Plan"]; correctIndex = 2; explanation = ?"The Fifth Five Year Plan (1974-79) adopted the slogan Garibi Hatao (Remove Poverty)." },
      { id = 51; testId = 26; text = "Who was the first President of India?"; options = ["Rajendra Prasad", "S. Radhakrishnan", "Zakir Husain", "V.V. Giri"]; correctIndex = 0; explanation = ?"Dr. Rajendra Prasad was the first President of India (1950-1962)." },
      { id = 52; testId = 26; text = "The Sundarbans delta is formed by which rivers?"; options = ["Ganga and Yamuna", "Ganga and Brahmaputra", "Mahanadi and Godavari", "Krishna and Kaveri"]; correctIndex = 1; explanation = ?"The Sundarbans is formed by the Ganga-Brahmaputra delta in West Bengal and Bangladesh." },
      { id = 53; testId = 26; text = "Which of the following is NOT a Fundamental Right in India?"; options = ["Right to Equality", "Right to Education", "Right to Property", "Right to Freedom"]; correctIndex = 2; explanation = ?"The Right to Property was removed from the list of Fundamental Rights by the 44th Constitutional Amendment in 1978." },
      { id = 54; testId = 26; text = "The concept of Directive Principles of State Policy was borrowed from the Constitution of?"; options = ["USA", "UK", "Ireland", "Australia"]; correctIndex = 2; explanation = ?"The Directive Principles of State Policy were borrowed from the Irish Constitution of 1937." },
      { id = 55; testId = 26; text = "In which year was the Reserve Bank of India established?"; options = ["1921", "1930", "1935", "1947"]; correctIndex = 2; explanation = ?"The Reserve Bank of India was established on 1 April 1935 under the RBI Act, 1934." },
    ];
    // testId=33: SBI PO Prelims Mock 1 — Quantitative Aptitude, Reasoning, Banking Awareness (10 questions)
    let t_banking : [Types.Question] = [
      { id = 56; testId = 33; text = "Simple Interest on Rs.5000 at 8% per annum for 3 years is?"; options = ["Rs.1000", "Rs.1200", "Rs.1500", "Rs.2000"]; correctIndex = 1; explanation = ?"SI = P*R*T/100 = 5000*8*3/100 = Rs.1200." },
      { id = 57; testId = 33; text = "What is NEFT?"; options = ["National Electronic Funds Transfer", "National Exchange Financial Transaction", "Net Electronic Fund Transfer", "New Electronic Finance Transfer"]; correctIndex = 0; explanation = ?"NEFT stands for National Electronic Funds Transfer — a payment system for online fund transfer." },
      { id = 58; testId = 33; text = "A shopkeeper marks an article 40% above cost price and gives 20% discount. Profit %?"; options = ["8%", "10%", "12%", "15%"]; correctIndex = 2; explanation = ?"CP=100, MP=140, SP=140*0.8=112, Profit=12%." },
      { id = 59; testId = 33; text = "The minimum balance required for a Basic Savings Bank Deposit (BSBD) account is?"; options = ["Rs.500", "Rs.1000", "Zero", "Rs.100"]; correctIndex = 2; explanation = ?"BSBD accounts have zero minimum balance requirement to promote financial inclusion." },
      { id = 60; testId = 33; text = "If A is B's mother, B is C's sister, then A is C's?"; options = ["Aunt", "Sister", "Mother", "Grandmother"]; correctIndex = 2; explanation = ?"A is B's mother, B is C's sister, so A is also C's mother." },
      { id = 61; testId = 33; text = "CRR stands for?"; options = ["Credit Reserve Ratio", "Cash Reserve Ratio", "Central Reserve Rate", "Currency Reserve Ratio"]; correctIndex = 1; explanation = ?"CRR — Cash Reserve Ratio — is the percentage of deposits banks must keep with the RBI." },
      { id = 62; testId = 33; text = "Which of the following is a Public Sector Bank?"; options = ["HDFC Bank", "ICICI Bank", "Punjab National Bank", "Axis Bank"]; correctIndex = 2; explanation = ?"Punjab National Bank (PNB) is a government-owned public sector bank." },
      { id = 63; testId = 33; text = "In a row, Ravi is 7th from the left and 13th from the right. How many are in the row?"; options = ["18", "19", "20", "21"]; correctIndex = 1; explanation = ?"Total = 7 + 13 - 1 = 19." },
      { id = 64; testId = 33; text = "The headquarters of the World Bank is located in?"; options = ["New York", "Geneva", "Washington D.C.", "London"]; correctIndex = 2; explanation = ?"The World Bank is headquartered in Washington D.C., USA." },
      { id = 65; testId = 33; text = "Which ratio shows how much of every rupee earned is profit?"; options = ["Current Ratio", "Debt Ratio", "Profit Margin", "Return on Equity"]; correctIndex = 2; explanation = ?"Profit Margin = Net Profit / Revenue * 100 — shows profit earned per rupee of revenue." },
    ];
    // testId=39: NDA Mock Test 1 — Mathematics, General Ability, Physics, GK (10 questions)
    let t_defence : [Types.Question] = [
      { id = 66; testId = 39; text = "What is the value of sin 90 degrees?"; options = ["0", "1", "0.5", "Undefined"]; correctIndex = 1; explanation = ?"sin 90 degrees = 1." },
      { id = 67; testId = 39; text = "Which is the rank above Colonel in the Indian Army?"; options = ["Brigadier", "Major General", "Lieutenant General", "General"]; correctIndex = 0; explanation = ?"In the Indian Army, Brigadier is the rank immediately above Colonel." },
      { id = 68; testId = 39; text = "If 2x - 3 = 7, find x."; options = ["2", "4", "5", "6"]; correctIndex = 2; explanation = ?"2x = 10, x = 5." },
      { id = 69; testId = 39; text = "The unit of force in the SI system is?"; options = ["Joule", "Newton", "Pascal", "Watt"]; correctIndex = 1; explanation = ?"The SI unit of force is the Newton (N), defined as kg*m/s^2." },
      { id = 70; testId = 39; text = "NDA exam is conducted by which body?"; options = ["SSC", "UPSC", "Ministry of Defence", "Army Headquarters"]; correctIndex = 1; explanation = ?"The National Defence Academy exam is conducted by the Union Public Service Commission (UPSC)." },
      { id = 71; testId = 39; text = "The Indian Navy's motto is?"; options = ["Seva Parmo Dharma", "Sam No Varunah", "Nabhah Sprisham Diptam", "Sarvatra Izzat-o-Iqbal"]; correctIndex = 1; explanation = ?"Sam No Varunah (May the Lord of the Water be Auspicious unto us) is the motto of the Indian Navy." },
      { id = 72; testId = 39; text = "What is the derivative of x^2?"; options = ["x", "2x", "x^3/3", "2"]; correctIndex = 1; explanation = ?"d/dx(x^2) = 2x by the power rule." },
      { id = 73; testId = 39; text = "Which of the following is a vector quantity?"; options = ["Speed", "Mass", "Temperature", "Velocity"]; correctIndex = 3; explanation = ?"Velocity is a vector quantity as it has both magnitude and direction." },
      { id = 74; testId = 39; text = "Operation Vijay (1999) was fought in which region?"; options = ["Siachen", "Kargil", "Aksai Chin", "Nathu La"]; correctIndex = 1; explanation = ?"Operation Vijay was the Indian Army's operation to recapture Kargil heights in 1999." },
      { id = 75; testId = 39; text = "The Indian Air Force was officially established on?"; options = ["8 October 1932", "15 August 1947", "1 April 1954", "26 January 1950"]; correctIndex = 0; explanation = ?"The Indian Air Force was established on 8 October 1932 as the Royal Indian Air Force." },
    ];
    t0.concat(t1).concat(t4).concat(t8).concat(t_civil).concat(t_banking).concat(t_defence)
  };
};
