//////////////Auth//////////

export const LOGIN_FAILED_ACTION = "LOGIN_FAILED_ACTION";
export const LOGIN_CONFIRMED_ACTION = "LOGIN_CONFIRMED_ACTION";
export const LOGIN_CONFIRMED = "LOGIN_CONFIRMED";
export const LOADING_TOGGLE = "LOADING_TOGGLE";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const CLEAR_PERFORMANCE_DATA = 'CLEAR_PERFORMANCE_DATA';
export const SIGNUP_CONFIRMED = "SIGNUP_CONFIRMED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

//BoardList/////////////////
export const GET_BOARD_LIST = "GET_BOARD_LIST";
export const BOARD_LOADING = "BOARD_LOADING";

//CLASS_STANDARD ///////////////////
export const GET_CLASS_STANDARD_LIST = "GET_CLASS_STANDARD_LIST";
export const CLASS_STANDARD_LOADING = "CLASS_STANDARD_LOADING";

//BRANCH_SCHOLASTIC  ///////////////////
export const GET_BRANCH_SCHOLASTIC_LIST = "GET_BRANCH_SCHOLASTIC_LIST";
export const BRANCH_SCHOLASTIC_LOADING = "BRANCH_SCHOLASTIC_LOADING";
export const GET_SCHOLASTIC_QUESTION_LIST = "GET_SCHOLASTIC_QUESTION_LIST";

//CHAPTER  ///////////////////
export const GET_CHAPTER_LIST = "GET_CHAPTER_LIST";
export const GET_BRANCH_ID_BY_CHAPTER_LIST = "GET_BRANCH_ID_BY_CHAPTER_LIST";
export const CHAPTER_LOADING = "CHAPTER_LOADING";

//Demo  ///////////////////
export const QUESTION_NUMBER_SELECT = "QUESTION_NUMBER_SELECT";
export const QUESTION_PREVIOUS = "QUESTION_PREVIOUS";
export const QUESTION_NEXT = "QUESTION_NEXT";
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const DEMO_LOGIN = "DEMO_LOGIN";
export const DEMO_STUDENT_REGISTER = "DEMO_STUDENT_REGISTER";
export const DEMO_STUDENT_REGISTRATION_LOADER = "DEMO_STUDENT_REGISTRATION_LOADER";
export const VERIFICATION_OTP = "VERIFICATION_OTP";
export const RECORD_EXISTS_SUCCESS = "RECORD_EXISTS_SUCCESS";
export const RECORD_EXISTS_FAILURE = "RECORD_EXISTS_FAILURE";
export const DEMO_EXAM_SUBMIT = "DEMO_EXAM_SUBMIT";
export const PDF_GENERATE_SUCCESS = "PDF_GENERATE_SUCCESS";
export const DEMO_USER_OR_NOT = "DEMO_USER_OR_NOT";
export const REG_USER_SUB_OR_NOT = "REG_USER_SUB_OR_NOT";
export const GET_ASSESSMENT_DETAILS_LIST_REQUEST = "GET_ASSESSMENT_DETAILS_LIST_REQUEST";
export const GET_ASSESSMENT_DETAILS_LIST_SUCCESS = "GET_ASSESSMENT_DETAILS_LIST_SUCCESS";
export const GET_ASSESSMENT_DETAILS_LIST_FAILURE = "GET_ASSESSMENT_DETAILS_LIST_FAILURE";
export const GET_COMPETITIVE_QUESTION_LIST = "GET_COMPETITIVE_QUESTION_LIST";


//ExamCategory  //////////////
export const GET_EXAM_CATEGORIES_LIST = "GET_EXAM_CATEGORIES_LIST";
export const GET_PURCHAGED_GROUP_LIST = "GET_PURCHAGED_GROUP_LIST";
export const EXAM_CATEGORIES_LIST_SUCCESS = "EXAM_CATEGORIES_LIST_SUCCESS";
export const EXAM_CATEGORIES_LIST_FAILURE = "EXAM_CATEGORIES_LIST_FAILURE";
export const CHOOSE_EXAM_CATEGORY = "CHOOSE_EXAM_CATEGORY";
export const CHOOSE_EXAM_CATEGORY_REQUEST = "CHOOSE_EXAM_CATEGORY_REQUEST";

//ExamType  //////////////
export const GET_EXAM_TYPE_LIST = "GET_EXAM_TYPE_LIST";
export const GET_PURCHASE_EXAM_TYPE_LIST = "GET_PURCHASE_EXAM_TYPE_LIST";

//Subject  //////////////
export const GET_SC_SUBJECT_LIST = "GET_SC_SUBJECT_LIST";
export const PURCHASED_SUBJECTS_LIST_REQUEST = "PURCHASED_SUBJECTS_LIST_REQUEST";
export const PURCHASED_SUBJECTS_LIST_SUCCESS = "PURCHASED_SUBJECTS_LIST_SUCCESS";
export const PURCHASED_SUBJECTS_LIST_FAILURE = "PURCHASED_SUBJECTS_LIST_FAILURE";
export const BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST = "BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST";
export const BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS = "BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS";
export const BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE = "BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE";
export const GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST = "GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST";
export const GET_ALL_SUBJECT_LIST = "GET_ALL_SUBJECT_LIST";

export const GET_CM_SUBJECT_LIST = "GET_CM_SUBJECT_LIST";
export const GET_ONLY_LIBRARY_CM_LIST = "GET_ONLY_LIBRARY_CM_LIST";
export const GET_ONLY_LIBRARY_SC_LIST = "GET_ONLY_LIBRARY_SC_LIST";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CART_LIST = "GET_CART_LIST";
export const GET_TRANSATION_DETAILS = "GET_TRANSATION_DETAILS";
export const POST_PROCEED_BUY = "POST_PROCEED_BUY";
export const REMOVE_ALL_SUBSCRIBE = "REMOVE_ALL_SUBSCRIBE";
export const REMOVE_SUBSCRIBE = "REMOVE_SUBSCRIBE";
export const REMOVE_SUBJECT_LIST = "REMOVE_SUBJECT_LIST";
export const SIDE_NAV_BAR = "SIDE_NAV_BAR";
export const SUBSCRIBE_LOADING = "SUBSCRIBE_LOADING";

export const SCHOLASTIC_QUESTIONS_LIST_REQUEST = "SCHOLASTIC_QUESTIONS_LIST_REQUEST";
export const SCHOLASTIC_QUESTIONS_LIST_SUCCESS = "SCHOLASTIC_QUESTIONS_LIST_SUCCESS";
export const SCHOLASTIC_QUESTIONS_LIST_FAILURE = "SCHOLASTIC_QUESTIONS_LIST_FAILURE";
export const SCHOLOASTIC_EXAM_SUBMIT_SUCCESS = "SCHOLOASTIC_EXAM_SUBMIT_SUCCESS";

export const DEMO_ASSESSMENT_LIST_SUCCESS = "DEMO_ASSESSMENT_LIST_SUCCESS";
export const DEMO_ASSESSMENT_LIST_FAILURE = "DEMO_ASSESSMENT_LIST_FAILURE";

export const EXAM_COMPLETED_LIST_SUCCESS = "EXAM_COMPLETED_LIST_SUCCESS";
export const EXAM_COMPLETED_LIST_FAILURE = "EXAM_COMPLETED_LIST_FAILURE";

export const ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS = "ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS";
export const ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE = "ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE";
export const ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST = "ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST";
export const ONLINE_EXAM_ID = "ONLINE_EXAM_ID";
export const REMOVE_ONLINE_PREVIOUS_EXAM_ID = "REMOVE_ONLINE_PREVIOUS_EXAM_ID";

export const ONLINE_QUESTIONS_LIST_REQUEST = "ONLINE_QUESTIONS_LIST_REQUEST";
export const MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS = "MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS";
export const MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE = "MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE";

export const MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS = "MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS";
export const MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE = "MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE";

export const ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS = "ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS";
export const ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE = "ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE";

export const COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS = "COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS";
export const COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE = "COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE";

export const ELIBRARY_CONTENT_SUCCESS = "ELIBRARY_CONTENT_SUCCESS";
export const ELIBRARY_CONTENT_FAILURE = "ELIBRARY_CONTENT_FAILURE";
export const ELIBRARY_CONTENT_REQUEST = "ELIBRARY_CONTENT_REQUEST";
export const ELIBRARY_LOADING = "ELIBRARY_LOADING";

export const ELIBRARY_DEMO_CONTENT_SUCCESS = "ELIBRARY_DEMO_CONTENT_SUCCESS";
export const ELIBRARY_DEMO_CONTENT_FAILURE = "ELIBRARY_DEMO_CONTENT_FAILURE";

export const SHOW_RIGHT_SIDE_NAV = "SHOW_RIGHT_SIDE_NAV";

export const DASHBOARD_HISTORY_LIST_SUCCESS = "DASHBOARD_HISTORY_LIST_SUCCESS";
export const DASHBOARD_HISTORY_LIST_FAILURE = "DASHBOARD_HISTORY_LIST_FAILURE";
export const DASHBOARD_HISTORY_LIST_REQUEST = "DASHBOARD_HISTORY_LIST_REQUEST";
export const DASHBOARD_EVENT_HISTORY_LIKE = "DASHBOARD_EVENT_HISTORY_LIKE";
export const USERID_DEMO_TO_REGISTER = "USERID_DEMO_TO_REGISTER";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const FORGET_PASSWORD_EMAIL_SUCCESS = "FORGET_PASSWORD_EMAIL_SUCCESS";
export const FORGET_PASSWORD_EMAIL_FAILURE = "FORGET_PASSWORD_EMAIL_FAILURE";
export const GENERATE_PASSWORD = "GENERATE_PASSWORD";

export const PERFORMANCE_SCORE_LIST_SUCCESS = "PERFORMANCE_SCORE_LIST_SUCCESS";
export const PERFORMANCE_SCORE_LIST_FAILURE = "PERFORMANCE_SCORE_LIST_FAILURE";
export const PERFORMANCE_SCORE_REQUEST = "PERFORMANCE_SCORE_REQUEST";
export const PERFORMANCE_OVERALL_AVERAGE = "PERFORMANCE_OVERALL_AVERAGE";
export const SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS = "SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS";
export const SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE = "SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE";
export const SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS = "SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS";
export const SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE = "SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE";

export const SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS = "SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS";
export const SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE = "SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE";
export const SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS = "SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS";
export const SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE = "SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE";
export const COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS = "COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS";
export const COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE = "COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE";
export const COMPETITIVE_SET_WISE_SCORE_SUCCESS = "COMPETITIVE_SET_WISE_SCORE_SUCCESS";
export const COMPETITIVE_SET_WISE_SCORE_FAILURE = "COMPETITIVE_SET_WISE_SCORE_FAILURE";
export const SCHOLIASTIC_PERFORMANCE_MODLE_SUCCESS = "SCHOLIASTIC_PERFORMANCE_MODLE_SUCCESS";
export const SCHOLIASTIC_PERFORMANCE_MODLE_FAILURE = "SCHOLIASTIC_PERFORMANCE_MODLE_FAILURE";
export const SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_SUCCESS = "SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_SUCCESS";
export const SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_FAILURE = "SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_FAILURE";

export const SCHOLIASTIC_PERFORMANCE_MOCK_SUCCESS = "SCHOLIASTIC_PERFORMANCE_MOCK_SUCCESS";
export const SCHOLIASTIC_PERFORMANCE_MOCK_FAILURE = "SCHOLIASTIC_PERFORMANCE_MOCK_FAILURE";
export const SCHOLIASTIC_PERFORMANCE_MOCK_OVERALLAVG_SUCCESS = "SCHOLIASTIC_PERFORMANCE_MOCK_OVERALLAVG_SUCCESS";
export const COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_SUCCESS = "COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_SUCCESS";
export const COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_FAILURE = "COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_FAILURE";
export const REG_USER_ELIBRARU_OR_NOT = "REG_USER_ELIBRARU_OR_NOT";
export const COMPETITIVE_SETWISE_SCORE_NTSE_SUCCESS = "COMPETITIVE_SETWISE_SCORE_NTSE_SUCCESS";
export const COMPETITIVE_SETWISE_SCORE_NTSE_FAILURE = "COMPETITIVE_SETWISE_SCORE_NTSE_FAILURE";

/// profile
export const PROFILE_LOADING = "PROFILE_LOADING";
export const UPDATE_PROFILES_DETAILS = "UPDATE_PROFILES_DETAILS";
export const SET_PROFILE_DATA = "SET_PROFILE_DATA";


export const SCROLLING_TEXT_SUCCESS = "SCROLLING_TEXT_SUCCESS";
export const SCROLLING_TEXT_FAILURE = "SCROLLING_TEXT_FAILURE";
export const SCHOLASTIC_COMBINE_PRICE = "SCHOLASTIC_COMBINE_PRICE";
export const SCHOLASTIC_COMBINE_PRICE_ID = "SCHOLASTIC_COMBINE_PRICE_ID";
export const GET_SEARCH_TEXT_DATA = "GET_SEARCH_TEXT_DATA";
export const GET_SEARCH_TEXT_FAILURE_DATA = "GET_SEARCH_TEXT_FAILURE_DATA";
export const ELIBRARY_SHOW_CALL_ICON = "ELIBRARY_SHOW_CALL_ICON";
export const GET_NTSE_EXAM_TYPE = "GET_NTSE_EXAM_TYPE";

export const SCHOOL_LIST_FAILURE = "GET_NTSE_EXAM_TYPE";
export const SCHOOL_LIST_SUCCESS = "SCHOOL_LIST_SUCCESS";
export const GO_TO_TAB = "GO_TO_TAB";
export const USER_UPDATE_PROFILE_CONFIRMED = "USER_UPDATE_PROFILE_CONFIRMED";
export const CHANGE_TAB = "CHANGE_TAB";

/* As per new UI */
export const SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS = "SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS";
export const GET_COMPETITIVE_SUBJECT_LIST = "GET_COMPETITIVE_SUBJECT_LIST";
export const COMPETITIVE_SETWISE_SCORE_SUCCESS = "COMPETITIVE_SETWISE_SCORE_SUCCESS";
export const CLICK_QUESTION_NO = "CLICK_QUESTION_NO";


export const SCHOLASTIC_GETSUBJECTWISE_CHAPTERS = "SCHOLASTIC_GETSUBJECTWISE_CHAPTERS";
export const SELECT_SCHOOL_LIST = "SELECT_SCHOOL_LIST";
export const SCHOLASTIC_CHAPTER_ANALYSIS_DATA = "SCHOLASTIC_CHAPTER_ANALYSIS_DATA";
export const PREVIOUS_EXAM_TYPE = "PREVIOUS_EXAM_TYPE";
export const COMPARE_SCHOLASTIC_COMPETITIVE_DATA = "COMPARE_SCHOLASTIC_COMPETITIVE_DATA";
export const GETCOMPETITIVE_SUBJECT_AVGSCORE = "GETCOMPETITIVE_SUBJECT_AVGSCORE";
export const GETCOMPETITIVE_SETWISE_MAT_SCORE = "GETCOMPETITIVE_SETWISE_MAT_SCORE";
export const GETCOMPETITIVE_SETWISE_SAT_SCORE = "GETCOMPETITIVE_SETWISE_SAT_SCORE";
export const COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT = "COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT";
export const COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT = "COMPETITIVE_SETWISE_SAT_MAT_SCORE_SUBJECT";
export const CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA = 'CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA';
export const GETCOMPETITIVE_SUBJECTWISECOMPARISON = "GETCOMPETITIVE_SUBJECTWISECOMPARISON";
export const GETCOMPETITIVE_NONVERBALCOMPARISON = "GETCOMPETITIVE_NONVERBALCOMPARISON";
export const COMPETITIVE_NON_VERVAL_LOADING = "COMPETITIVE_NON_VERVAL_LOADING";
export const ELIBRARY_CATEGORY = "ELIBRARY_CATEGORY";
export const ELIBRARY_SCHOLASTIC_CATEGORY = "ELIBRARY_SCHOLASTIC_CATEGORY";
export const ELIBRARY_GETSUBJECT_LIST = "ELIBRARY_GETSUBJECT_LIST";
export const TERMS_CONDITION = "TERMS_CONDITION";
export const UNLOCK_SCREEN = "UNLOCK_SCREEN";
export const PRIVACY_POLICY = "PRIVACY_POLICY";
export const GET_EXAM_ASSESSMENT_LIST = "GET_EXAM_ASSESSMENT_LIST";
export const COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT = "COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT";
export const ELIBRARY_SESSION_TIME = "ELIBRARY_SESSION_TIME";
export const ELIBRARY_MOST_VISITED_SUBJECTS = "ELIBRARY_MOST_VISITED_SUBJECTS";
export const ELIBRARY_MOST_SEARCH_QUESTIONS = "ELIBRARY_MOST_SEARCH_QUESTIONS";
export const ALERT_SOUND = "ALERT_SOUND";
export const TIME_UP = "TIME_UP";
export const VERIFICATION_MODAL = "VERIFICATION_MODAL";

export const GET_SUBSCRIBED_LIST = "GET_SUBSCRIBED_LIST";

export const GETSUBSCRIBED_LIST = "GETSUBSCRIBED_LIST";
export const GET_FEEDBACK = "GET_FEEDBACK";
export const STORE_FEEDBACK = "STORE_FEEDBACK";
export const PROFILE_DATA_UPDATED = "PROFILE_DATA_UPDATED";
export const FEEDBACK_GIVEN = "FEEDBACK_GIVEN";
export const TIME_USED = "TIME_USED";
export const TOTAL_ATTEMPTS = "TOTAL_ATTEMPTS";
export const GETSCHOLASTICEXAMSDETAILS_CASESTUDY = "GETSCHOLASTICEXAMSDETAILS_CASESTUDY";
export const WHERE_DO_YOU_STAND_COMPETITIVE = "WHERE_DO_YOU_STAND_COMPETITIVE";
export const PROFILE_IMAGE = "PROFILE_IMAGE";
export const PROFILE_FILE = "PROFILE_FILE";
export const RESIZE_MODAL_CLOSE = "RESIZE_MODAL_CLOSE";
export const GET_LAST_PAYMENT_DETAILS = "GET_LAST_PAYMENT_DETAILS";
export const REMOVE_LIBRARY_LIST = "REMOVE_LIBRARY_LIST";
export const PREVOUSE_VALUE_NTSE = "PREVOUSE_VALUE_NTSE";
export const PREVOUSE_VALUE_NSTSE = "PREVOUSE_VALUE_NSTSE";
export const ELIBRARY_GET_LAST_SUBJECT_LIST = "ELIBRARY_GET_LAST_SUBJECT_LIST";
export const OTP_BEFORE_LOGIN = "OTP_BEFORE_LOGIN";
export const GET_ALLEXAM_CATEGORIES = "GET_ALLEXAM_CATEGORIES";
export const GET_INTEGRATED_SUBSCRIPTION = "GET_INTEGRATED_SUBSCRIPTION";
export const DASHBOARD_PERFORMANCESCORE = "DASHBOARD_PERFORMANCESCORE";
export const DASHBOARD_LOGINDATA = "DASHBOARD_LOGINDATA";
export const ASSESSMENT_ACTIVE_PAGE = "ASSESSMENT_ACTIVE_PAGE";
export const PASSWORD_RESET_TIME_CHECK = "PASSWORD_RESET_TIME_CHECK";
export const GET_EXAM_DETAILS_BY_EXAM_NO = "GET_EXAM_DETAILS_BY_EXAM_NO";
export const GET_PURCHASED_GROUP_LIST = "GET_PURCHASED_GROUP_LIST";
export const GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC = "GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC";
export const E_LIBRARY_SELECT_SUBJECTS_LIST = "E_LIBRARY_SELECT_SUBJECTS_LIST";
export const CHECK_BOX_STATUS = "CHECK_BOX_STATUS";
export const SCHOLASTIC_SUBSCRIPTION_SOURCE = "SCHOLASTIC_SUBSCRIPTION_SOURCE";
export const COMPETITVE_SUBSCRIPTION_SOURCE = "COMPETITVE_SUBSCRIPTION_SOURCE";
export const STORE_ASSESSMENT_FILTER_DATA_STORE = "STORE_ASSESSMENT_FILTER_DATA_STORE";
export const BACK_FROM_ASSESSMENT_DETAILS = "BACK_FROM_ASSESSMENT_DETAILS";
export const RESET_LINK_EXIST_OR_NOT = "RESET_LINK_EXIST_OR_NOT";
export const SCHOLATIC_SET_TABLE_DATA = "SCHOLATIC_SET_TABLE_DATA";
export const SCHOOL_NAME_SHOWING_LOADER = "SCHOOL_NAME_SHOWING_LOADER";
export const ELIBRARY_LIST_ACTIVE_PAGE = "ELIBRARY_LIST_ACTIVE_PAGE";
export const GET_EXAM_CATEGORIES_LIBRARY = "GET_EXAM_CATEGORIES_LIBRARY";
export const GET_EXAM_TYPE_LIBRARY = "GET_EXAM_TYPE_LIBRARY";
export const QUESTION_UPLOAD_COMPLETED = "QUESTION_UPLOAD_COMPLETED";

export const IS_SCHOOL_LIST_SUCCESS = "IS_SCHOOL_LIST_SUCCESS";
export const OTP_FOR_MOBILE_AND_EMAILID = "OTP_FOR_MOBILE_AND_EMAILID";

export const VERIFICATION_OTP_INPUT_OFF = "VERIFICATION_OTP_INPUT_OFF";
export const MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE = "MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE";
export const COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE = "COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE";
export const SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA = "SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA";
export const ELIBRARY_AWS_CREDENTIAL_DETAILS = "ELIBRARY_AWS_CREDENTIAL_DETAILS";
export const ADVERTISEMENT_DETAILS = "ADVERTISEMENT_DETAILS";
export const DRAWER_MENU_ACTIVE_ID_UPDATE = "DRAWER_MENU_ACTIVE_ID_UPDATE";

export const SUBCRIPTION_COURSE_VALIDITY = "SUBCRIPTION_COURSE_VALIDITY";

/* Secret Key */
export const SKEY = "crestestexam987654321";

/// Academic year

export const ACADEMIC_LOADING = "ACADEMIC_LOADING";
export const GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST = "GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST";
export const GET_ACADEMIC_SESSION_EXIT_FOR_EXAM = "GET_ACADEMIC_SESSION_EXIT_FOR_EXAM";

//Archive
export const ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS = "ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS";
export const ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_DATA = "ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_DATA";
export const ARCHIVE_SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS = "ARCHIVE_SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS";
export const ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS = "ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS";
export const ARCHIVE_SCHOLATIC_SET_TABLE_DATA = "ARCHIVE_SCHOLATIC_SET_TABLE_DATA";
export const ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_DATA = "ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_DATA";
export const ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA = "ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA";
export const ARCHIVE_COMPETITIVE_SETWISE_SCORE_SUCCESS = "ARCHIVE_COMPETITIVE_SETWISE_SCORE_SUCCESS";
export const ARCHIVE_GET_COMPETITIVE_SUBJECT_AVGSCORE = "ARCHIVE_GET_COMPETITIVE_SUBJECT_AVGSCORE";
export const ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS = "ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS";
export const ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE = "ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE";
export const ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE = "ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE";
export const ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE = "ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE";
export const ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT = "ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT";
export const ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT = "ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT";
export const ARCHIVE_COMPETITIVE_SUBJECTWISECOMPARISON = "ARCHIVE_COMPETITIVE_SUBJECTWISECOMPARISON";
export const ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON = "ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON";
export const ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE = "ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE";
export const ARCHIVE_ELIBRARY_SESSION_TIME = "ARCHIVE_ELIBRARY_SESSION_TIME";
export const ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS = "ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS";
export const ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS = "ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS";

export const GET_PROFILES_DETAILS = "GET_PROFILES_DETAILS";
export const GET_CLASS_STANDARD_LIST_AFTER_LOGIN = "GET_CLASS_STANDARD_LIST_AFTER_LOGIN";
export const GET_ARCHIVE_STANDARD_LIST = "GET_ARCHIVE_STANDARD_LIST";
export const ARCHIVE_CLASS = "ARCHIVE_CLASS";